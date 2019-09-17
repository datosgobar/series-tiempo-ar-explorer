# TSExplorer

**Versión**: 2.4.10

El objeto `TSExplorer` contiene una _one page application_ con un explorador de series de tiempo, que permite buscar y visualizar series de un catálogo de datos abiertos.

Está en el archivo llamado `main.js` y se aloja versionado en el CDN: https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@2.4.10/dist/js/main.js

## ¿Cómo lo uso?

* Importar librería JS:

```html
<script type='text/javascript' src='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@2.4.10/dist/js/main.js'></script>
```

* Definir dónde se va a dibujar:

```html
<div id="explorer-container"></div>
```

* Instanciar el explorador:

```js
TSExplorer.render('explorer-container', {
...
})
```

## Ejemplo de uso

```html
<html>
<body>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@2.4.10/dist/js/main.js"></script>

  <div id="explorer-container"></div>

  <script>
    window.onload = function() {
        TSExplorer.render('explorer-container', {
            featured: [
                "103.1_I2N_2016_M_15",
                "168.1_T_CAMBIOR_D_0_0_26",
            ],
            seriesApiUri: "https://apis.datos.gob.ar/series/api",
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

## Tabla de parámetros

<table>
    <tr>
        <th>Nombre</th>
        <th>Requerido</th>
        <th style="min-width: 20em;">Descripción</th>
        <th>Tipo</th>
        <th>Default</th>
        <th>Ejemplos</th>
    </tr>
    <tr>
        <td>seriesApiUri</td>
        <td>Si</td>
        <td>URI a la API donde buscamos los datos.</td>
        <td>string</td>
        <td>Ninguno</td>
        <td>https://apis.datos.gob.ar/series/api</td>
    </tr>
    <tr>
        <td>featured</td>
        <td>No</td>
        <td>Indica los IDs de las series destacadas</td>
        <td>string[]</td>
        <td>[]</td>
        <td>["103.1_I2N_2016_M_15", "168.1_T_CAMBIOR_D_0_0_26"]</td>
    </tr>
    <tr>
        <td>catalogId</td>
        <td>No</td>
        <td>Representa el id del catálogo de donde busca las series</td>
        <td>string</td>
        <td>Ninguno</td>
        <td>datosgobar</td>
    </tr>
    <tr>
        <td>formatChartUnits</td>
        <td>No</td>
        <td>Indica si debe formatear a porcentaje los valores entre -1 y 1.</td>
        <td>boolean</td>
        <td>true</td>
        <td>true / false</td>
    </tr>
    <tr>
        <td>laps</td>
        <td>No</td>
        <td>Información para traer los últimos _n_ valores de la serie, con _n_ igual al valor por frecuencia.
        <br>
        <br>
        {Diaria: number, Mensual: number, Trimestral: number, Semestral: number, Anual: number}
        </td>
        <td>object</td>
        <td>true</td>
        <td>true / false</td>
    </tr>
    <tr>
        <td>locale</td>
        <td>No</td>
        <td>Valores posibles: `"AR"` o `"US"` (pendientes nuevos valores). Representan qué _locale_ usar para formatear números, es decir, separadores de miles o de decimales.</td>
        <td>string</td>
        <td>"AR"</td>
        <td>"AR" / "US"</td>
    </tr>
</table>

## Demo online
https://jsfiddle.net/sv6ua42q/1/
