# Web oficial de Luma

Sitio estático, sin dependencias ni compilación. Ejecuta desde este directorio:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
node --check app.js
```

`app.js` consulta los releases públicos de `Fernanboom34/Launcher`: `/latest` selecciona el estable y el historial pagina en grupos de 100. El botón elige Setup en Windows x64 y el paquete tar.gz en Linux x64. Otras plataformas pueden consultar los archivos sin recibir una descarga incompatible. La detección del navegador es orientativa; los formatos siempre se pueden elegir manualmente.

El historial muestra portables estables y permite incluir preliminares. No lista manifiestos ni sumas como aplicaciones. Si GitHub falla o limita peticiones, quedan disponibles los enlaces oficiales. No se necesitan tokens; no se deben incluir credenciales en este sitio público.

## Ko-fi

La sección de apoyo enlaza a https://ko-fi.com/fernanboom34 con el texto aprobado por el autor.

## Capturas

Las imágenes nuevas muestran la interfaz real de Luma 0.8.0 en Linux. Inicio, instancia vacía, contenido y creación de instancias se capturaron con los modos de vista previa del launcher y datos de demostración aislados. El contenido de ejemplo usa el generador de fixtures del repositorio Launcher; no es una partida ni una instalación de mods probada en juego.

`jugando.png` es una captura de escritorio real: Minecraft 1.7.10 iniciado por la CLI de Luma con el perfil local Jugador, y la interfaz de Luma al fondo. Los archivos del juego y Java se descargaron y verificaron con el propio launcher. No se distribuyen aquí archivos del juego ni datos de usuario.

## Validación realizada

Pruebas en Chromium con las respuestas de los releases reales como fixtures: descarga Windows/Linux, ausencia de descarga automática para macOS/Android, formatos disponibles, historial estable/preliminar y recuperación ante HTTP 403. Revisión de diseño móvil y recursos locales. Las peticiones a GitHub son públicas y están sujetas a sus límites.
