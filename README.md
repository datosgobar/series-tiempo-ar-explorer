# Explorador de Series de Tiempo AR

Aplicación javascript para la búsqueda de series de tiempo, usando la API series-tiempo-ar-api

Demo: https://datosgobar.github.io/series-tiempo-ar-explorer/#/

## Desarrollo
Documentación de desarrollo [aqui](development/readme_dev.md)

## Staging

[series-tiempo-ar-explorer-demo](https://github.com/datosgobar/series-tiempo-ar-explorer-demo)

## Deploy

Tenemos 2 formas de deploy: Generación de github pages y generación de release para subir al [CDN](https://www.jsdelivr.com/).

#### Github pages

El deploy se puede realizar de dos maneras. Ambas son iguales

- `npm run build-docs`
- `make build`

Y finalmente subir todo al branch default:
- `git add .`
- `git commit -m "Deploy a github pages"`
- `git push`

#### Release para CDN

Crear un branch desde la versión que queremos salir:
- `git checkout -b <nombre>`

Generar los archivos para distribuir. Tenemos dos maneras, ambas son iguales:
- `npm run release`
- `make release`

Agregar los archivos:
- `git add dist` (basta con agregar sólo la carpeta a distribuir)
- `git commit -m "Actualizo carpeta dist"`
- `git push origin <nombre del branch>`

Crear un tag:
- `git tag <nombreDeTag>`
- `git push --tags`

Con el nombre del tag ya podemos acceder a los archivos que necesitemos:

https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@nombreDelTag/dist/js/main.js


## Contacto
Te invitamos a [crearnos un issue](https://github.com/datosgobar/series-tiempo-ar-explorer/issues/new?title=Encontre-un-bug-en-api-gateway)
en caso de que encuentres algún bug o tengas comentarios de alguna parte de `series-tiempo-ar-explorer`. Para todo lo demás, podés mandarnos tu sugerencia o consulta a [datos@modernización.gob.ar](mailto:datos@modernización.gob.ar).
