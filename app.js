// Lee el último release ESTABLE de GitHub (los prereleases no cuentan) y
// actualiza la versión y el enlace. Si falla, el botón sigue funcionando
// porque ya apunta a releases/latest/download/Luma-Setup.exe.
const REPO = 'Fernanboom34/Launcher';
const boton = document.getElementById('descargar');
const version = document.getElementById('version');

fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
  headers: { Accept: 'application/vnd.github+json' }
})
  .then(r => (r.ok ? r.json() : Promise.reject(r.status)))
  .then(release => {
    const instalador = release.assets.find(a => a.name === 'Luma-Setup.exe');
    if (instalador) boton.href = instalador.browser_download_url;
    const fecha = new Date(release.published_at).toLocaleDateString('es-MX', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
    version.textContent = `Versión ${release.tag_name.replace(/^v/, '')}, publicada el ${fecha}`;
  })
  .catch(() => { version.textContent = 'Última versión estable'; });
