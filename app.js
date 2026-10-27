'use strict';
const API = 'https://api.github.com/repos/Fernanboom34/Launcher/releases';
const RELEASES = 'https://github.com/Fernanboom34/Launcher/releases';
const button = document.getElementById('descargar');
const version = document.getElementById('version');
const status = document.getElementById('estado-descargas');
const system = /android|iphone|ipad|ipod/i.test(navigator.userAgent) ? 'other' : /win/i.test(navigator.userAgentData?.platform || navigator.platform) ? 'windows' : /linux/i.test(navigator.userAgentData?.platform || navigator.platform) ? 'linux' : 'other';
const arm = /arm|aarch64/i.test(navigator.userAgent);
const compatible = system !== 'other' && !arm;
let history = [];
function kind(asset) {
  const name = asset.name;
  if (/^Luma-Setup\.exe$/i.test(name)) return { os: 'windows', label: 'Windows x64 · Instalador', portable: false };
  if (/^(Luma-.+|luma-launcher)\.exe$/i.test(name)) return { os: 'windows', label: 'Windows x64 · Portable', portable: true };
  if (/^luma-launcher_.+_amd64\.deb$/i.test(name)) return { os: 'linux', label: 'Linux x64 · Debian / Ubuntu (.deb)', portable: false };
  if (/^Luma-.+-linux-x64\.tar\.gz$/i.test(name)) return { os: 'linux', label: 'Linux x64 · Paquete por usuario (.tar.gz)', portable: true };
  if (/^Luma-.+-linux-x64$/i.test(name)) return { os: 'linux', label: 'Linux x64 · Ejecutable portable', portable: true };
  return null;
}
function assetLink(asset, info) {
  const url = new URL(asset.browser_download_url);
  if (url.origin !== 'https://github.com' || !url.pathname.startsWith('/Fernanboom34/Launcher/releases/download/')) throw new Error('Archivo fuera del repositorio oficial');
  const a = document.createElement('a');
  a.href = url.href;
  a.textContent = info.label;
  a.className = 'download-link';
  return a;
}
async function request(url) {
  const response = await fetch(url, { headers: { Accept: 'application/vnd.github+json' }, signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error(`GitHub ${response.status}`);
  return response.json();
}
function renderHistory() {
  const container = document.getElementById('historial');
  container.replaceChildren();
  for (const release of history.filter(r => !r.draft && (!r.prerelease || document.getElementById('incluir-previas').checked))) {
    const assets = release.assets.filter(a => kind(a)?.portable);
    if (!assets.length) continue;
    const article = document.createElement('article');
    const title = document.createElement('h3');
    title.textContent = `${release.tag_name}${release.prerelease ? ' · Preliminar' : ' · Estable'}`;
    article.append(title);
    for (const asset of assets) article.append(assetLink(asset, kind(asset)));
    container.append(article);
  }
  if (!container.children.length) container.textContent = 'No hay versiones portables disponibles.';
}
document.getElementById('incluir-previas').addEventListener('change', renderHistory);
async function loadLatest() {
  try {
    const release = await request(`${API}/latest`);
    if (release.draft || release.prerelease) throw new Error('No es una versión estable');
    const assets = release.assets.filter(a => kind(a));
    const container = document.getElementById('descargas-estables');
    container.replaceChildren(...assets.map(a => assetLink(a, kind(a))));
    if (!assets.length) container.textContent = 'Consulta los archivos de esta versión en GitHub.';
    const preferred = compatible && (assets.find(a => kind(a).os === system && (system === 'windows' ? /Setup/i.test(a.name) : /\.tar\.gz$/i.test(a.name))) || assets.find(a => kind(a).os === system));
    if (preferred) {
      button.href = assetLink(preferred, kind(preferred)).href;
      button.textContent = `Descargar para ${system === 'windows' ? 'Windows' : 'Linux'} x64`;
    } else {
      button.href = '#descargas';
      button.textContent = 'Ver descargas disponibles';
    }
    document.getElementById('compatibilidad').textContent = preferred ? `${kind(preferred).label}. Puedes elegir otro formato en Otras descargas.` : 'Disponible para Windows x64 y Linux x64. Si usas macOS, móvil o ARM, no hay un paquete compatible publicado.';
    version.textContent = `Versión estable ${release.tag_name.replace(/^v/, '')}`;
  } catch {
    version.textContent = 'Consulta la última versión estable en GitHub';
    document.getElementById('descargas-estables').textContent = 'No se pudieron consultar los archivos. Usa el enlace a los releases oficiales.';
  }
}
async function loadHistory() {
  try {
    for (let page = 1; ; page++) {
      const batch = await request(`${API}?per_page=100&page=${page}`);
      if (!Array.isArray(batch)) throw new Error('Respuesta inválida');
      history.push(...batch);
      if (batch.length < 100) break;
    }
    renderHistory();
  } catch {
    document.getElementById('historial').textContent = 'No se pudo cargar el historial completo. Puedes consultar todas las versiones en GitHub.';
    status.textContent = 'GitHub no está disponible temporalmente o alcanzó su límite de consultas. Los enlaces oficiales siguen disponibles.';
  }
}
loadLatest();
loadHistory();
