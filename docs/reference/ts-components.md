# TSComponents

**Versión**: 2.6.1

El objeto `TSComponents` contiene distintos componentes exportables que se pueden utilizar dentro de una experiencia web.

Está en el archivo llamado `components.js` y se aloja versionado en el CDN: https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.6.0/dist/js/components.js

## Componentes

* **[`graphic`](./ts-components/graphic.md)**: gráfico de líneas, barras o área usado en el explorador de series de tiempo con todas sus funcionalidades.

* **[`card`](./ts-components/card.md)**: tarjeta con información de la serie y un gráfico incluído con sus datos.

## ¿Cómo los uso?

Todos los componentes se usan de la misma manera.

* Importar librería JS:

```html
<script type='text/javascript' src='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.6.0/dist/js/components.js'></script>
```

* Importar hoja de estilos CSS:

```html
<link rel='stylesheet' type='text/css' href='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.6.0/dist/css/components.css'/>
```

* Definir dónde se va a dibujar:

```html
<div id="graphic_01"></div>
<div id="card_01"></div>
```

* Instanciar el componente que buscamos:

```js
TSComponents.Graphic.render('graphic_01', {
  ...
})
```

```js
TSComponents.Card.render('card_01', {
  ...
})
```
