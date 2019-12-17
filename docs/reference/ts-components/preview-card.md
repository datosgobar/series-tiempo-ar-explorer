# Componente: PreviewCard

El componente `PreviewCard` permite embeber tarjetas con metadatos de la serie, y un gráfico incluido dentro de la misma, pudiendo ajustar su ancho al insertarlas en un documento HTML.

<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.8.0/dist/css/components.css" type="text/css">
<script type='text/javascript' src='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.8.0/dist/js/components.js'></script>

<style>
    .row {
        width: 90%;
        margin: auto;
        display: flex;
        justify-content: center;
    }
</style>

<div class="row">
    <div id="preview"></div>
</div>

## Ejemplo base
Ver online: [https://jsfiddle.net/18gykLxp/](https://jsfiddle.net/18gykLxp/)

```html
<!-- importa librería JS -->
<script type='text/javascript' src='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.8.0/dist/js/components.js'></script>

<!-- importa hoja de estilos CSS -->
<link rel='stylesheet' type='text/css' href='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.8.0/dist/css/components.css'/>

<!-- código HTML donde ubicar un div con una tarjeta -->
<div id="emae"></div>

<!-- JS que genera la tarjeta en el div -->
<script>
    window.onload = function() {
        TSComponents.Preview.render('emae', {
            // ID de la serie solicitada
            serieId: '11.1_CMMR_2004_A_10'
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
        <td>bcra_5</td>
    </tr>
    <tr>
        <td>explorerUrl</td>
        <td>No</td>
        <td>URL de la instancia del componente Explorer donde mostrar todos los detalles de la serie representada al clickear la tarjeta.</td>
        <td>string</td>
        <td>https://datos.gob.ar/series/api/series</td>
        <td>https://miexplorer.org/series</td>
    </tr>
    <tr>
        <td>apiBaseUrl</td>
        <td>No</td>
        <td>URL de la API de Series de Tiempo a la cual pedir los datos de la serie a representar. Debe poseer un endpoint '/series/'.</td>
        <td>string</td>
        <td>https://apis.datos.gob.ar/series/api</td>
        <td>https://miapi.org/api</td>
    </tr>
    <tr>
        <td>maxDecimals</td>
        <td>No</td>
        <td>Cantidad máxima de cifras decimales a mostrar para los valores de las series representadas.</td>
        <td>int</td>
        <td>2</td>
        <td>5</td>
    </tr>
    <tr>
        <td>numbersAbbreviate</td>
        <td>No</td>
        <td>Flag que indica si se deben abreviar los números grandes y formatearlos con el sufijo pertinente; si está apagado, no se realizará abreviatura alguna. Ver la sección de "Abreviatura" para más detalle.</td>
        <td>boolean</td>
        <td>true</td>
        <td>false</td>
    </tr>
    <tr>
        <td>decimalsBillion</td>
        <td>No</td>
        <td>Cantidad de dígitos decimales a mostrar en aquellos números que son abreviados y divididos por un billón. Puede ser mayor al parámetro maxDecimals.</td>
        <td>int</td>
        <td>2</td>
        <td>4</td>
    </tr>
    <tr>
        <td>decimalsMillion</td>
        <td>No</td>
        <td>Cantidad de dígitos decimales a mostrar en aquellos números que son abreviados y divididos por un millón. Puede ser mayor al parámetro maxDecimals.</td>
        <td>boolean</td>
        <td>2</td>
        <td>0</td>
    </tr>
    <tr>
        <td>width</td>
        <td>No</td>
        <td>Ancho del componente. Puede ser un porcentaje (el porcentaje del ancho del div que lo contendrá), o bien una cantidad de pixeles (con el sufijo 'px'; representa un ancho absoluto, independiente del div contenedor).</td>
        <td>string</td>
        <td>'100%'</td>
        <td>'50%', '560px'</td>
    </tr>
</table>

## Clickeabilidad

El componente es 100% clickeable, en toda su superficie, y hacerlo abrirá otra pestaña en el navegador donde se esté visualizando la tarjeta. El sitio de la nueva pestaña permitirá visualizar más detalles de la serie involucrada, en distintos hosts según los valores de los parámetros del componente:

* Si el parámetro `explorerUrl` está presente, la nueva pestaña irá a la sección de *Detalle* de la serie involucrada en la instancia del `Explorer` ubicada en su URL-
* Si el parámetro `explorerUrl` no está presente, pero `apiBaseUrl` si lo está, la nueva pestaña irá a la versión JSON de la respuesta brindada por la API especificada en el parámetro, en su endpoint de `/series/`, pidiendo los últimos 5000 valores (si los hubiese) y con todos los metadatos posibles de la serie.
* Si ninguno de los dos parámetros está presente, la nueva pestaña irá a la sección de *Detalle* involucrada en el Explorador de Series de Tiempo de [datos.gob.ar](datos.gob.ar).

## Abreviatura

Si se habilita la abreviatura y formateo de números grandes, encendiendo el flag `numbersAbbreviate` (la única manera de apagarlo es seteándole explícitamente un valor `false` por medio del parámetro del componente), se procederá a formatearlos de la siguiente manera:

* Los valores porcentuales (distinguidos así por los metadatos de la serie que representan) no son abreviados.
* Todo número mayor o igual a un billón (**1.000.000.000.000**) o menor a un billón negativo (**-1.000.000.000.000**) será dividido por un billón, y se le agregará como sufijo la letra **B**.
* Todo número mayor o igual a diez millones (**10.000.000**) y menor a un billón, o bien menor o igual a diez millones negativos (**-10.000.000**) y mayor a un billón negativo (**-1.000.000.000.000**), será dividido por un millón (**1.000.000**), y se le agregará como sufijo la letra **M**.
* Todo número mayor a un diez millones negativos y menor a diez millones será conservado como tal, sin aplicársele sufijo alguno.
* En caso de abreviar, la cantidad de decimales que son tenidos en cuenta del cociente obtenido al dividir el valor original de la serie por el divisor apropiado depende de los valores (por defecto o especificados) de las cantidades de los parámetros `decimalsBillion` y `decimalsMillion` (según corresponda).

## Ejemplo completo

```html
<html>
<body>
  <script type='text/javascript' src='components.js'></script>
  <div id="preview"></div>
  <script>
    window.onload = function () {
      TSComponents.PreviewCard.render('preview', {
        serieId: '143.3_NO_PR_2004_A_21',
        explorerUrl: 'https://datos.gob.ar/series/api/series',
        apiBaseUrl: 'https://apis.datos.gob.ar/series/api',
        maxDecimals: 4,
        numbersAbbreviate: true,
        decimalsMillion: 3,
        decimalsBillion: 4,
        width: '500px'
    })
    }
  </script>
</body>
</html>
```

<script>
    window.onload = function() {
        
        TSComponents.PreviewCard.render('preview', {
            serieId: '143.3_NO_PR_2004_A_21',
            maxDecimals: 4,
            width: '600px'
        })

    }
</script>