# series-tiempo-ar-explorer

Aplicación javascript para la búsqueda de series de tiempo, usando la API series-tiempo-ar-api

Demo: https://datosgobar.github.io/series-tiempo-ar-explorer/#/

## Desarrollo
documentacion de desarrollo [aqui](./docs/react.md)

## Generación de github pages

Para actualizar la documentación de github pages es necesario correr los siguientes comandos:

```
npm run build
rm docs/* -r
cp build/* docs/ -r
```

Y finalmente subir todo al branch default.

## Contacto
Te invitamos a [crearnos un issue](https://github.com/datosgobar/series-tiempo-ar-explorer/issues/new?title=Encontre-un-bug-en-api-gateway)
en caso de que encuentres algún bug o tengas comentarios de alguna parte de `series-tiempo-ar-explorer`. Para todo lo demás, podés mandarnos tu sugerencia o consulta a [datos@modernizacion.gob.ar](mailto:datos@modernizacion.gob.ar).


## Problemas comunes
* `npm start`: Error al iniciar el server. [Solución](https://github.com/react-community/create-react-native-app/issues/533#issuecomment-362445585)
