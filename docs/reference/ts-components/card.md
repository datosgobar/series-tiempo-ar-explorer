# Componente: card

El componente `card` permite embeber tarjetas con información de la serie, y un gráfico incluído dentro de la misma, en sitios web.

## Ejemplo base
Ver online: [https://jsfiddle.net/2tz8agdm/](https://jsfiddle.net/2tz8agdm/)

```html
<!-- importa librería JS -->
<script type='text/javascript' src='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.0.0/dist/js/components.js'></script>

<!-- importa hoja de estilos CSS -->
<link rel='stylesheet' type='text/css' href='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.0.0/dist/css/components.css'/>

<!-- código HTML donde ubicar un div con una tarjeta -->
<div id="tmi"></div>

<!-- JS que genera la tarjeta en el div -->
<script>
    window.onload = function() {
        TSComponents.Card.render('tmi', {
            // ID de la serie solicitada
            serieId: '143.3_NO_PR_2004_A_21'
        })
    }
</script>
```

## Tabla de parámetros

<table>
    <tr>
        <th>Nombre</th>
        <th>Requerido</th>
        <th>Descripción</th>
        <th>Tipo</th>
        <th>Default</th>
        <th>Ejemplos</th>
    </tr>
    <tr>
        <td>serieId</td>
        <td>Si</td>
        <td>ID de la serie a buscar.</td>
        <td>string</td>
        <td>Ninguno</td>
        <td>143.3_NO_PR_2004_A_21</td>
    </tr>
    <tr>
        <td>locale</td>
        <td>No</td>
        <td>Valores posibles: "AR" o "US" (pendientes nuevos valores). Representan qué _locale_ usar para formatear números, es decir, separadores de miles o de decimales.</td>
        <td>string</td>
        <td>AR</td>
        <td>AR o US</td>
    </tr>
    <tr>
        <td>links</td>
        <td>No</td>
        <td>Indica qué enlaces a mostrar bajo la tarjeta para descargar o compartir la misma.</td>
        <td>string</td>
        <td>Full</td>
        <td>Small</td>
    </tr>
    <tr>
        <td>color</td>
        <td>No</td>
        <td>Indica el color a usar para el número y el borde de la tarjeta.</td>
        <td>string</td>
        <td>#0072BB</td>
        <td>red</td>
    </tr>
    <tr>
        <td>hasChart</td>
        <td>No</td>
        <td>Indica el tipo de gráfico a usar dentro de la tarjeta.</td>
        <td>string</td>
        <td>Full</td>
        <td>Small</td>
    </tr>
    <tr>
        <td>chartType</td>
        <td>No</td>
        <td>Indica el tipo de gráfico a usar dentro de la tarjeta. Sólo aplicable si `hasChart` es igual a `Full`.</td>
        <td>string</td>
        <td>Line</td>
        <td>Area</td>
    </tr>
    <tr>
        <td>title</td>
        <td>No</td>
        <td>Especifica el título de la tarjeta.</td>
        <td>string</td>
        <td>Ninguno</td>
        <td>Un título personalizado</td>
    </tr>
    <tr>
        <td>source</td>
        <td>No</td>
        <td>Especifica el texto al pie de la tarjeta.</td>
        <td>string</td>
        <td>Ninguno</td>
        <td>Dirección de Estadística e Información en Salud (DEIS). Secretaría de Gobierno de Salud</td>
    </tr>
</table>

## Ejemplo completo

```html
<html>
<body>
  <script type='text/javascript' src='components.js'></script>
  <div id="root"></div>
  <script>
    window.onload = function () {
      TSComponents.Card.render('card1', {
        serieId: '143.3_NO_PR_2004_A_21',
        hasChart: 'small',
        links: 'full',
        color: 'red
    })
    }
  </script>
</body>
</html>
```

## Demo online
https://jsfiddle.net/2tz8agdm/
