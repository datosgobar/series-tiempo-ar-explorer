# TSExplorer

**Versión**: 2.7.0

El objeto `TSExplorer` contiene una _one page application_ con un explorador de series de tiempo, que permite buscar y visualizar series de un catálogo de datos abiertos.

Está en el archivo llamado `main.js` y se aloja versionado en el CDN: https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@2.7.0/dist/js/main.js

## ¿Cómo lo uso?

* Importar librería JS:

```html
<script type='text/javascript' src='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@2.7.0/dist/js/main.js'></script>
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
  <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@2.7.0/dist/js/main.js"></script>

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
    <tr>
        <td>maxDecimals</td>
        <td>No</td>
        <td>Cantidad máxima de cifras decimales a mostrar para los valores de las series, tanto en sus tarjetas destacadas, como resultados de búsqueda y notas (tooltips) de los gráficos.</td>
        <td>int</td>
        <td>2</td>
        <td>0/4/1</td>
    </tr>
    <tr>
        <td>heroImageUrl</td>
        <td>No</td>
        <td>URL de la imagen a mostrar de fondo en el banner del encabezado.</td>
        <td>string</td>
        <td>https://datos.gob.ar/images/hero_bg.svg</td>
        <td>https://upload.wikimedia.org/wikipedia/commons/1/1a/Flag_of_Argentina.svg</td>
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
</table>

## Abreviatura

Si se habilita la abreviatura y formateo de números grandes, encendiendo el flag `numbersAbbreviate` (la única manera de apagarlo es seteándole explícitamente un valor `false` por medio del parámetro del componente), se procederá a formatearlos de la siguiente manera:

* Los valores porcentuales (distinguidos así por los metadatos de la serie que representan) no son abreviados.
* Todo número mayor o igual a un billón (**1.000.000.000.000**) o menor a un billón negativo (**-1.000.000.000.000**) será dividido por un billón, y se le agregará como sufijo la letra **B**.
* Todo número mayor o igual a diez millones (**10.000.000**) y menor a un billón, o bien menor o igual a diez millones negativos (**-10.000.000**) y mayor a un billón negativo (**-1.000.000.000.000**), será dividido por un millón (**1.000.000**), y se le agregará como sufijo la letra **M**.
* Todo número mayor a un diez millones negativos y menor a diez millones será conservado como tal, sin aplicársele sufijo alguno.
* En caso de abreviar, la cantidad de decimales que son tenidos en cuenta del cociente obtenido al dividir el valor original de la serie por el divisor apropiado depende de los valores (por defecto o especificados) de las cantidades de los parámetros `decimalsBillion` y `decimalsMillion` (según corresponda).
 
## Demo online
[https://jsfiddle.net/w6xLte5q/](https://jsfiddle.net/w6xLte5q/)
