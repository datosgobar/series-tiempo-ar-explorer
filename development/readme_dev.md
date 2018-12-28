## Documentación de desarrollo

El objeto exportado se llama `TSExplorer`, y el mismo está en el archivo `main.js`.
Está alojado en el CDN por versiones: https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@1.1.0/dist/js/main.js

### ¿Cómo lo uso?
- Importar el archivo:
  - `<script type='text/javascript' src='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@1.1.0/dist/js/main.js'></script>`
- Definir dónde se va a dibujar:
  - `<div id="explorer-container"></div>`
- Instanciarlo:
  - `TSExplorer.render(...)`

### Demo online
https://jsfiddle.net/sv6ua42q/1/

### Ejemplo de uso:
```
<html>
<body>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@1.1.0/dist/js/main.js"></script>

  <div id="root"></div>
  <script>
    window.onload = function() {
        TSExplorer.render('root', {
            featured: [
                "103.1_I2N_2016_M_15",
                "168.1_T_CAMBIOR_D_0_0_26",
            ],
            seriesApiUri: "https://apis-stg.datos.gob.ar/series/api",
            catalogId: 'datosgobar',
            formatChartUnits: true,
            laps: {
                Diaria: 90,
                Mensual: 24,
                Trimestral: 20,
                Semestral: 10,
                Anual: 10,
            },
            locale: 'AR'
        })
    }
  </script>
</body>
</html>
```

### Parámetros de `TSExplorer`
- `featured: string[]`
  - indica los IDs de las series destacadas
- `seriesApiUri: string`
  - uri a la API donde buscamos los datos
- `catalogId: string`
  - representa el id del catálogo de donde busca las series
- `formatChartUnits: boolean`
  - indica si debe formatear a porcentaje los valores entre -1 y 1
- `laps: { Diaria: number, Mensual: number, Trimestral: number, Semestral: number, Anual: number }`
  - información para traer los últimos _n_ valores de la serie, con _n_ igual al valor por frecuencia
- `locale: string`
  - valores posibles: `"AR"` o `"US"` (pendientes nuevos valores). Representan qué _locale_ usar para formatear números, es decir, separadores de miles o de decimales.
