# Web oficial de Luma

Sitio estático, sin dependencias ni compilación. Ejecuta desde este directorio:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
node --check app.js
```

## Organización del sitio

- `index.html`: presentación, funciones y descarga recomendada.
- `descargas.html`: descarga recomendada, formatos e historial de portables.
- `capturas.html`: galería del launcher y el juego.
- `ayuda.html`: instalación, requisitos, SmartScreen, SHA-256 y soporte.
- `apoyar.html`: formulario y botón oficial de Ko-fi.
- `aviso-legal.html`: reserva de derechos de la web, contenido de terceros y servicios externos.

Son páginas HTML estáticas con navegación y estilos compartidos; no requieren framework ni proceso de compilación. La cabecera y el pie se mantienen en cada archivo. Al modificar la navegación, actualizar las seis páginas. Los enlaces antiguos como `/#capturas` se redirigen a la página correspondiente.

`LICENSE` reserva los derechos sobre el contenido propio de la web. No concede una licencia abierta ni modifica la licencia del launcher o los derechos de terceros.

`app.js` consulta los releases públicos de `Fernanboom34/Launcher`: `/latest` selecciona el estable y el historial pagina en grupos de 100. El botón elige Setup en Windows x64 y el paquete tar.gz en Linux x64. Otras plataformas pueden consultar los archivos sin recibir una descarga incompatible. La detección del navegador es orientativa; los formatos siempre se pueden elegir manualmente.

El historial muestra portables estables y permite incluir preliminares. No lista manifiestos ni sumas como aplicaciones. Si GitHub falla o limita peticiones, quedan disponibles los enlaces oficiales. No se necesitan tokens; no se deben incluir credenciales en este sitio público.

## Ko-fi

`apoyar.html` integra el formulario y el widget oficial de botón de Ko-fi, con el texto aprobado por el autor. Los recursos de Ko-fi no se cargan en las otras páginas.

## Capturas

Las imágenes nuevas muestran la interfaz real de Luma 0.8.0 en Linux. Inicio, instancia vacía, contenido y creación de instancias se capturaron con los modos de vista previa del launcher y datos de demostración aislados. El contenido de ejemplo usa el generador de fixtures del repositorio Launcher; no es una partida ni una instalación de mods probada en juego.

`jugando.png` es una captura de escritorio real: Minecraft 1.7.10 iniciado por la CLI de Luma con el perfil local Jugador, y la interfaz de Luma al fondo. Los archivos del juego y Java se descargaron y verificaron con el propio launcher. No se distribuyen aquí archivos del juego ni datos de usuario.

## Validación realizada

Pruebas en Chromium con las respuestas de los releases reales como fixtures: descarga Windows/Linux, ausencia de descarga automática para macOS/Android, formatos disponibles, historial estable/preliminar y recuperación ante HTTP 403. Revisión de diseño móvil y recursos locales. Las peticiones a GitHub son públicas y están sujetas a sus límites.

La estructura de seis páginas se comprobó en Chromium a 390 y 1440 píxeles: navegación, enlaces y recursos internos, encabezados, archivos de descarga, historial, enlaces antiguos y recuperación ante HTTP 403 de GitHub. Ko-fi mostró el formulario y el botón; su script externo emitió una restricción de localStorage en el navegador de prueba, sin errores del JavaScript propio del sitio. No se realizaron pagos.

Los enlaces al CSS y JavaScript incluyen una versión basada en su SHA-256 para evitar mezclar HTML nuevo con recursos antiguos de la caché. Al modificar estos recursos, actualizar su parámetro `?v=` en todas las páginas con los primeros 12 caracteres del SHA-256 correspondiente. El botón principal usa Descargas como destino inicial y de respaldo, y se convierte en enlace directo al archivo compatible al recibir el release estable.
