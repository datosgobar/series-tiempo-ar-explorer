# Componente: graphic

El componente `graphic` permite embeber gráficos de líneas, áreas o barras en experiencias web. Permite elegir distintos elementos de filtro de fechas, personalizar los textos, etc.

## Ejemplo base
Ver online: [https://jsfiddle.net/pwanyheL/9/](https://jsfiddle.net/pwanyheL/9/)

<script type='text/javascript' src='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.1.0/dist/js/components.js'></script>
<link rel='stylesheet' type='text/css' href='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.1.0/dist/css/components.css'/>

<div id="tmi"></div>

<script>
    window.onload = function() {
        TSComponents.Graphic.render('tmi', {
            graphicUrl: 'https://apis.datos.gob.ar/series/api/series/?ids=tmi_arg',
            title: 'Tasa de Mortalidad Infantil de Argentina',
            source: 'Dirección de Estadística e Información en Salud (DEIS). Secretaría de Gobierno de Salud'
        })
    }
</script>

<br>
<br>
Este gráfico se genera a partir del siguiente código:
<br>

```html
<!-- importa librería JS -->
<script type='text/javascript' src='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.1.0/dist/js/components.js'></script>

<!-- importa hoja de estilos CSS -->
<link rel='stylesheet' type='text/css' href='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.1.0/dist/css/components.css'/>

<!-- código HTML donde ubicar un div con un gráfico -->
<div id="tmi"></div>

<!-- JS que genera el gráfico en el div -->
<script>
    window.onload = function() {
        TSComponents.Graphic.render('tmi', {
            // Llamada a la API de Series de Tiempo
            graphicUrl: 'https://apis.datos.gob.ar/series/api/series/?ids=tmi_arg',
            title: 'Tasa de Mortalidad Infantil de Argentina',
            source: 'Dirección de Estadística e Información en Salud (DEIS). Secretaría de Gobierno de Salud'
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
        <td>graphicUrl</td>
        <td>Si</td>
        <td>URL completa del llamado a la API.</td>
        <td>string</td>
        <td>Ninguno</td>
        <td>https://apis.datos.gob.ar/series/api/series/?ids=tmi_arg</td>
    </tr>
    <tr>
        <td>chartOptions</td>
        <td>No</td>
        <td>Cualquier opción válida para [Highcharts](https://api.highcharts.com/highcharts/)</td>
        <td>object</td>
        <td>{}</td>
        <td></td>
    </tr>
    <tr>
        <td>navigator</td>
        <td>No</td>
        <td>Indica si está habilitada la funcionalidad de navegación de la serie</td>
        <td>boolean</td>
        <td>Dinámico</td>
        <td>true / false</td>
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
        <td>zoom</td>
        <td>No</td>
        <td>Indica si tiene habilitada la funcionalidad de zoom</td>
        <td>boolean</td>
        <td>Dinámico</td>
        <td>true / false</td>
    </tr>
    <tr>
        <td>exportable</td>
        <td>No</td>
        <td>Indica si tiene habilitada la funcionalidad de exportar el gráfico</td>
        <td>boolean</td>
        <td>Dinámico</td>
        <td>true / false</td>
    </tr>
    <tr>
        <td>colors</td>
        <td>No</td>
        <td>Colores en formato hexadecimal. Ej: "#000000"</td>
        <td>list</td>
        <td>["#2E7D33", "#C62828", "#F9A822", "#6A1B99", "#EC407A", "#C2185B", "#6A1B99", "#039BE5", "#6EA100", "#0072BB"]</td>
        <td>["#2E7D33", "#C62828", "#F9A822"]</td>
    </tr>
    <tr>
        <td>backgroundColor</td>
        <td>No</td>
        <td>Color de fondo del gráfico en formato hexadecimal</td>
        <td>string</td>
        <td>#cdcdcd</td>
        <td>#cdcdcd</td>
    </tr>
    <tr>
        <td>datePickerEnabled</td>
        <td>No</td>
        <td>Indica si el selector de fechas está habilitado</td>
        <td>boolean</td>
        <td>Dinámica</td>
        <td>true / false</td>
    </tr>
    <tr>
        <td>legendField</td>
        <td>No</td>
        <td>Indica el campo de la serie a usar para mostrar la leyenda</td>
        <td>string</td>
        <td>title</td>
        <td>"title", "description" o "id"</td>
    </tr>
    <tr>
        <td>chartTypes</td>
        <td>No</td>
        <td>Especifica el tipo de gráfico a usar para cada serie</td>
        <td>object</td>
        <td>'line' para todas las series</td>
        <td>{'tmi_arg': 'column', 'tmi_02': 'line', 'tmi_06': 'area'}</td>
    </tr>
    <tr>
        <td>title</td>
        <td>No</td>
        <td>Especifica el título el gráfico</td>
        <td>string</td>
        <td>Ninguno</td>
        <td>Tasa de Mortalidad Infantil de Argentina</td>
    </tr>
    <tr>
        <td>source</td>
        <td>No</td>
        <td>Especifica el texto al pie del gráfico</td>
        <td>string</td>
        <td>Ninguno</td>
        <td>Dirección de Estadística e Información en Salud (DEIS). Secretaría de Gobierno de Salud</td>
    </tr>
    <tr>
        <td>displayUnits</td>
        <td>No</td>
        <td>Indica si se muestran las unidades del gráfico</td>
        <td>boolean</td>
        <td>Dinámico</td>
        <td>true / false</td>
    </tr>
    <tr>
        <td>legendLabel</td>
        <td>No</td>
        <td>Especifica el texto a mostrar como leyenda por cada serie</td>
        <td>object</td>
        <td>{}</td>
        <td>{'serie01': 'leyenda custom'}</td>
    </tr>
</table>

## Asignación dinámica de atributos

Varios componentes del gráfico se muestran/ocultan dinámicamente dependiendo de su tamaño. Los componentes son dinámicos, en tanto no se especifique su valor de inicialización:

* Si un parámetro se especifica con valor `true` se muestra siempre.
* Si el parámetro es `false` no se muestra nunca.
* Si no se especifica, corren las siguientes reglas:
    - `zoom`: Se muestra si el ancho es mayor o igual a 620px
    - `navigator`: Se muestra si el ancho es mayor o igual a 500px
    - `datePickerEnabled`: Se muestra si el ancho es mayor o igual a 400px
    - `displayUnits`: Se muestra si el ancho es mayor o igual a 450px
    - `leyenda`: Este no es un campo que se pueda ocultar mediante la API de `TSComponents.Graphic`, pero los valores de la leyenda se muestran sólo si hay más de una serie aplicada.

## Ejemplo completo

```html
<html>
<body>
  <script type='text/javascript' src='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.1.0/dist/js/components.js'></script>
  <link rel='stylesheet' type='text/css' href='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.1.0/dist/css/components.css'/>
  <div id="root"></div>
  <script>
    window.onload = function () {
      TSComponents.Graphic.render('root', {
        graphicUrl: 'https://apis.datos.gob.ar/series/api/series/?ids=tmi_arg',
        title: 'Tasa de Mortalidad Infantil de Argentina',
        source: 'Dirección de Estadística e Información en Salud (DEIS). Secretaría de Gobierno de Salud',
        legendField: 'title',
        chartTypes: {'tmi_arg': 'column'},
        zoom: true,
        datePickerEnabled: true,
        displayUnits: true
        exportable: true,
        navigator: false,
        backgroundColor: '#cdcdcd',
        colors: ['#cecece', '#8d6b22', '#62848d'],
        locale: 'AR',
        chartOptions: {},
        legendLabel: {'tmi_arg': 'Tasa de mortalidad nacional'},
      })
    }
  </script>
</body>
</html>
```



