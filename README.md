# Explorador de Series de Tiempo AR

Aplicación javascript para la búsqueda de series de tiempo, usando la API series-tiempo-ar-api

Demo: https://datosgobar.github.io/series-tiempo-ar-explorer/#/

## Desarrollo
Documentación de desarrollo [aqui](development/readme_dev.md)

## Generación de github pages (deploy)

El deploy se puede realizar de dos maneras. Ambas son iguales

- `npm run build-docs` 
- `make build`

Y finalmente subir todo al branch default.

## Generar build para el CDN

Para una facil distribución de la aplicación, no alcanza con el paso anterior, ya que el distribuible final suele tener asociado un valor autogenerado, por ejemplo `main.31cd1498.js`.

Para poder distribuir facilmente la aplicación usaremos como proveedor de CDN https://cdn.jsdelivr.net.

Este proveedor sirve los archivos desde github.
Para que sirva nuestros archivos, debemos generar un `tag` de git.

Por ejemplo, si quisieramos que sirva nuestro archivo en `docs/stable/js/main.js`, deberiamos copiar el ultimo *build* de la aplicación a ese lugar en el repositorio y luego generar un `tag`.

Si generaramos el `tag` con nombre `0.1`, nuestro archivo seria accesible desde https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@0.1/docs/stable/js/main.js.


## Contacto
Te invitamos a [crearnos un issue](https://github.com/datosgobar/series-tiempo-ar-explorer/issues/new?title=Encontre-un-bug-en-api-gateway)
en caso de que encuentres algún bug o tengas comentarios de alguna parte de `series-tiempo-ar-explorer`. Para todo lo demás, podés mandarnos tu sugerencia o consulta a [datos@modernización.gob.ar](mailto:datos@modernización.gob.ar).

cd
