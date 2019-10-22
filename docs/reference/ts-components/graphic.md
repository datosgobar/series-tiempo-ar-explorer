# Componente: graphic

El componente `graphic` permite embeber gráficos de líneas, áreas o barras en experiencias web. Permite elegir distintos elementos de filtro de fechas, personalizar los textos, etc.

## Ejemplo base
Ver online: [https://jsfiddle.net/bj1n8tum/](https://jsfiddle.net/bj1n8tum/)

<script type='text/javascript' src='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.6.8/dist/js/components.js'></script>
<link rel='stylesheet' type='text/css' href='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.6.8/dist/css/components.css'/>

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
<script type='text/javascript' src='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.6.8/dist/js/components.js'></script>

<!-- importa hoja de estilos CSS -->
<link rel='stylesheet' type='text/css' href='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.6.8/dist/css/components.css'/>

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
        <td>Cualquier opción válida para [Highcharts](https://api.highcharts.com/highcharts/).</td>
        <td>object</td>
        <td>{}</td>
        <td></td>
    </tr>
    <tr>
        <td>navigator</td>
        <td>No</td>
        <td>Indica si está habilitada la funcionalidad de navegación de la serie.</td>
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
        <td>Indica si tiene habilitada la funcionalidad de zoom.</td>
        <td>boolean</td>
        <td>Dinámico</td>
        <td>true / false</td>
    </tr>
    <tr>
        <td>exportable</td>
        <td>No</td>
        <td>Indica si tiene habilitada la funcionalidad de exportar el gráfico.</td>
        <td>boolean</td>
        <td>Dinámico</td>
        <td>true / false</td>
    </tr>
    <tr>
        <td>colors</td>
        <td>No</td>
        <td>Paleta de colores alternativa a la default. Los códigos de colores pueden ser tanto hexadecimales (ej. "#00CC44") como numeros que son mapeados a la paleta por defecto (del 0 al 8) Ver paleta por defecto más abajo.</td>
        <td>list</td>
        <td>["#0072BB", "#2E7D33", "#C62828", "#F9A822", "#6A1B99", "#EC407A", "#C2185B", "#039BE5", "#6EA100"] [0, 1, 2, 3, 4, 5, 6, 7, 8]</td>
        <td>["#2E7D33", 2, "#F9A822"]</td>
    </tr>
    <tr>
        <td>backgroundColor</td>
        <td>No</td>
        <td>Color de fondo del gráfico en formato hexadecimal.</td>
        <td>string</td>
        <td>#cdcdcd</td>
        <td>#cdcdcd</td>
    </tr>
    <tr>
        <td>datePickerEnabled</td>
        <td>No</td>
        <td>Indica si el selector de fechas está habilitado.</td>
        <td>boolean</td>
        <td>Dinámica</td>
        <td>true / false</td>
    </tr>
    <tr>
        <td>legendField</td>
        <td>No</td>
        <td>Indica el campo de la serie a usar para mostrar la leyenda.</td>
        <td>string</td>
        <td>'title'</td>
        <td>"title", "description" o "id"</td>
    </tr>
    <tr>
        <td>chartTypes</td>
        <td>No</td>
        <td>Especifica el tipo de gráfico a usar para cada serie<./td>
        <td>object</td>
        <td>'line' para todas las series</td>
        <td>{'tmi_arg': 'column', 'tmi_02': 'line', 'tmi_06': 'area'}</td>
    </tr>
    <tr>
        <td>title</td>
        <td>No</td>
        <td>Especifica el título el gráfico.</td>
        <td>string</td>
        <td>Ninguno</td>
        <td>Tasa de Mortalidad Infantil de Argentina</td>
    </tr>
    <tr>
        <td>source</td>
        <td>No</td>
        <td>Especifica el texto al pie del gráfico.</td>
        <td>string</td>
        <td>Ninguno</td>
        <td>Dirección de Estadística e Información en Salud (DEIS). Secretaría de Gobierno de Salud</td>
    </tr>
    <tr>
        <td>displayUnits</td>
        <td>No</td>
        <td>Indica si se muestran las unidades del gráfico.</td>
        <td>boolean</td>
        <td>Dinámico</td>
        <td>true / false</td>
    </tr>
    <tr>
        <td>legendLabel</td>
        <td>No</td>
        <td>Especifica el texto a mostrar como leyenda por cada serie.</td>
        <td>object</td>
        <td>{}</td>
        <td>{'serie01': 'leyenda custom'}</td>
    </tr>
    <tr>
        <td>seriesAxis</td>
        <td>No</td>
        <td>Especifica de qué lado del gráfico mostrar las ordenadas y unidades de cada serie representada. Puede haber más de una serie en un mismo lado. Si hay una sola serie, debe ir obligatoriamente del lado izquierdo.</td>
        <td>object</td>
        <td>{}</td>
        <td>{'serie01': 'right',
             'serie02': 'left'}</td>
    </tr>
    <tr>
        <td>chartType</td>
        <td>No</td>
        <td>Especifica un tipo de gráfico para aplicar a todas las series como default. En caso de estar especificado un tipo para una serie en chartTypes, este último será priorizado para la misma.</td>
        <td>string</td>
        <td>'line'</td>
        <td>'line', 'area' o 'column'</td>
    </tr>
    </tr>
        <tr>
        <td>decimalLeftAxis</td>
        <td>No</td>
        <td>Especifica cuántos dígitos decimales tendrán los valores de las ordenadas del eje izquierdo (principal) del gráfico.</td>
        <td>int</td>
        <td>Ninguno</td>
        <td>6</td>
    </tr>
    </tr>
        <tr>
        <td>decimalRightAxis</td>
        <td>No</td>
        <td>Especifica cuántos dígitos decimales tendrán los valores de las ordenadas del eje derecho (auxiliar) del gráfico.</td>
        <td>int</td>
        <td>Ninguno</td>
        <td>0</td>
    </tr>
    <tr>
        <td>decimalTooltips</td>
        <td>No</td>
        <td>Especifica cuántos dígitos decimales mostrará el texto en el tooltip para cada serie, mapeando ids de series con cantidades de decimales.</td>
        <td>object</td>
        <td>Ninguno</td>
        <td>{'serie01': 4,
             'serie02': 1}</td>
    </tr>
    </tr>
        <tr>
        <td>decimalTooltip</td>
        <td>No</td>
        <td>Especifica la cantidad de dígitos decimales a mostrar en el texto del tooltip para toda serie que no lo haya definido en el parámetro decimalTooltips.</td>
        <td>int</td>
        <td>Ninguno</td>
        <td>3</td>
    </tr>
</table>

## Paleta de colores por defecto

Por defecto, la paleta de colores en los que se grafican las series del componente. Cada uno puede ser identificado con un hexadecimal o un entero decimal:

* **#0072BB** o **0**, para azul
* **#2E7D33** o **1**, para verde oscuro
* **#C62828** o **2**, para rojo
* **#F9A822** o **3**, para naranja
* **#6A1B99** o **4**, para violeta
* **#EC407A** o **5**, para rosa
* **#C2185B** o **6**, para fucsia
* **#039BE5** o **7**, para celeste
* **#6EA100** o **8**, para verde claro

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
  <script type='text/javascript' src='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.6.8/dist/js/components.js'></script>
  <link rel='stylesheet' type='text/css' href='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.6.8/dist/css/components.css'/>
  <div id="root"></div>
  <script>
    window.onload = function () {
      TSComponents.Graphic.render('root', {
        graphicUrl: 'https://apis.datos.gob.ar/series/api/series/?ids=tmi_arg',
        title: 'Tasa de Mortalidad Infantil de Argentina',
        source: 'Dirección de Estadística e Información en Salud (DEIS). Secretaría de Gobierno de Salud',
        legendField: 'title',
        chartType: 'area',
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
        seriesAxis: {'tmi_arg': 'left'}
      })
    }
  </script>
</body>
</html>
```



