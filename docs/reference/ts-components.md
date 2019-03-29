## TSComponents

El objeto exportado se llama `TSComponents` y contiene a su vez más componentes. El mismo está en el archivo llamado `components.js`.
Está alojado en el CDN por versiones: https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_1.0/dist/js/components.js

### Componentes independientes
- Graphic
  - Gráfico usado en el explorador de series de tiempo con todas sus funcionalidades

### Demo online
https://jsfiddle.net/qbe9ydm5/

### ¿Cómo los uso?
Para todos los componentes es igual.

- Importar el archivo principal:
  - `<script type='text/javascript' src='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_1.0/dist/js/components.js'></script>`
- Definir dónde se va a dibujar:
  - `<div id="graphic_01"></div>`
- Instanciar el componente que buscamos:
  - `TSComponents.Graphic.render(...)`

### Ejemplo de uso de Graphic:
```
<html>
<body>
  <script type='text/javascript' src='components.js'></script>
  <div id="root"></div>
  <script>
    window.onload = function () {
      TSComponents.Graphic.render('root', {
        graphicUrl: 'https://apis-stg.datos.gob.ar/series/api/series/?metadata=full&ids=11.3_VMASD_2004_M_23&limit=1000&start=0',
        chartOptions: {},
        navigator: false,
        locale: 'AR',
        zoom: true,
        exportable: true,
        colors: ['#cecece', '#8d6b22', '#62848d'],
        backgroundColor: '#cdcdcd',
        datePickerEnabled: true,
        legendField: 'title',
        chartTypes: {'103.1_I2N_2016_M_15': 'column'},
        title: 'Un título personalizado',
        source: 'Un pie de gráfico personalizado',
        displayUnits: true
      })
    }
  </script>
</body>
</html>
```

### Parámetros de `TSComponents.Graphic`
- `graphicUrl: string`
  - url completa del llamado a la API
- `chartOptions: {}`
  - cualquier opción válida para [Highcharts](https://api.highcharts.com/highcharts/)
- `navigator: boolean`
  - indica si está habilitada la funcionalidad de navegación de la serie
- `locale: string`
  - valores posibles: `"AR"` o `"US"` (pendientes nuevos valores). Representan qué _locale_ usar para formatear números, es decir, separadores de miles o de decimales.
- `zoom: boolean`
  - indica si tiene habilitada la funcionalidad de zoom
- `exportable: boolean`
  - indica si tiene habilitada la funcionalidad de exportar el gráfico
- `colors: string[]`
  - colores en formato hexadecimal. Ej: `"#000000"`
- `backgroundColor: string`
  - color de fondo del gráfico en formato hexadecimal
- `datePickerEnabled: boolean`
  - indica si el selector de fechas está habilitado
- `legendField: string`
  - indica el campo de la serie a usar para mostrar la leyenda
- `chartTypes: {<id de serie>: <tipo de gráfico>}`
  - especifica el tipo de gráfico a usar para cada serie
- `title: string`
  - especifica el título el gráfico
- `source: string`
  - especifica el texto al pie del gráfico
- `displayUnits: boolean`
  - indica si se muestran las unidades del gráfico

### Asignación dinámica de atributos

Para la mejor visualización del gráfico, varios componentes del mismo se muestran/ocultan dependiendo de su tamaño.
**Nota:** Son dinámicos sólo si no se especifica su valor de inicialización. Si un campo tiene como valor `true` va a ser mostrado siempre, si tiene `false` no va a ser mostrado nunca. Si no se especifica, corren las siguientes reglas:
- zoom: Se muestra si el ancho es mayor o igual a 620px
- navigator: Se muestra si el ancho es mayor o igual a 500px
- datePickerEnabled: Se muestra si el ancho es mayor o igual a 400px
- displayUnits: Se muestra si el ancho es mayor o igual a 450px
- leyenda: Este no es un campo que se pueda ocultar mediante la API de `TSComponents.Graphic`, pero los valores de la leyenda se muestran sólo si hay más de una serie aplicada.
