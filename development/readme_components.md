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
  - cualquier opción válida para [Highcharts](https://api.highcharts.com/highcharts/).
- `navigator: boolean`
  - indica si está habilitada la funcionalidad de navegación de la serie
- `locale: string`
  - valores posibles: `"AR"` o `"US"` (pendientes nuevos valores). Representan qué _locale_ usar para formatear números, es decir, separadores de miles o de decimales.
- `zoom: boolean`
  - indica si tiene habilitada la funcionalidad de zoom
- `exportable: boolean`
  - indica si tiene habilitada la funcionalidad de exportar el gráfico
