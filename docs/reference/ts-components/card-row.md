# Componente: CardRow

El componente `CardRow` permite desplegar rápidamente numerosas `Card`s, disponiéndolas en filas de hasta 4 tarjetas y optimizando recursos al realizar una sola llamada a la API para obtener los datos de sus series.

<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.9.0/dist/css/components.css" type="text/css">
<script type='text/javascript' src='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.9.0/dist/js/components.js'></script>

<div id="fila"></div>

## Ejemplo base
Ver online: [https://jsfiddle.net/76mk3eqd/](https://jsfiddle.net/76mk3eqd/)

*Nota:* Para visualizarlo bien, expandir el recuadro inferior derecho (donde se dibujará el resultado) a mas de tres cuartos de la pantalla.

```html
<!-- importa librería JS -->
<script type='text/javascript' src='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.9.0/dist/js/components.js'></script>

<!-- importa hoja de estilos CSS -->
<link rel='stylesheet' type='text/css' href='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.9.0/dist/css/components.css'/>

<!-- código HTML donde ubicar un div con todo el despliegue de tarjetas -->
<div id="tiposCambio"></div>

<!-- JS que genera las filas de tarjetas en el div -->
<script>
    window.onload = function() {
        TSComponents.CardRow.render('tiposCambio', {
            // IDs de series solicitadas
            ids: [
                '116.2_TCRZE_0_T_26',
                '116.2_TCRB_0_T_23',
                '116.2_TCRU_0_T_24',
                '116.4_TCRZE_2015_D_31_73',
                '116.4_TCRZE_2015_D_23_99',
                '116.1_TCRCA_0_A_23',
                '116.1_TCRJ_0_A_22'
            ]
        })
    }
</script>
```

## Parámetros

### Parámetros obligatorios
El único parámetro obligatorio es `ids`, el cual debe ser un array de strings, refiriendo los IDs (puros o compuestos) de las series cuyas `Card` quieran representarse.

### Parámetros opcionales de valor singular
Algunos parámetros opcionales deben ser un valor singular, de cierto tipo, y afectan a todas las tarjetas rendereadas:

<table>
    <tr>
        <th>Nombre</th>
        <th>Descripción</th>
        <th>Tipo</th>
        <th>Default</th>
        <th>Ejemplos</th>
    </tr>
    <tr>
        <td>apiBaseUrl</td>
        <td>URL de la API de Series de Tiempo a la cual pedir los datos de la serie a representar. Debe poseer un endpoint '/series/'.</td>
        <td>string</td>
        <td>https://apis.datos.gob.ar/series/api</td>
        <td>https://miapi.org/api</td>
    </tr>
    <tr>
        <td>collapse</td>
        <td>Permite cambiar la frecuencia en la que se muestra la serie. Mediante este parámetro se puede hacer, por ejemplo, un agregado anual para una serie que tiene una frecuencia diaria. Las limitaciones del campo son que la frecuencia elegida tiene que ser menor o igual a la menor frecuencia entre las series involucradas, si no lo es entonces el componente no se mostrará (Ej: si menor frecuencia semestral, 'collapse' puede ser solo o 'semester' o 'year').</td>
        <td>string</td>
        <td>Ninguno</td>
        <td>'day', 'month', 'quarter', 'semester', 'year'</td>
    </tr>
    <tr>
        <td>hasColorBar</td>
        <td>Permite forzar la presencia de la barra de color (el mismo que posee el número) en el borde superior de las tarjetas. De no estar definido, la barrá estará presente sólo si las tarjetas poseen marco.</td>
        <td>booleano</td>
        <td>Ninguno</td>
        <td>false</td>
    </tr>
    <tr>
        <td>hasFrame</td>
        <td>Permite forzar la presencia de un marco alrededor de las tarjetas y un fondo blanco para las mismas. De no estar definido, las tarjetas tendrán marco si tienen al menos gráfico o enlaces.</td>
        <td>booleano</td>
        <td>Ninguno</td>
        <td>true</td>
    </tr>
    <tr>
        <td>isPercentage</td>
        <td>Flag que indica si los valores de las Cards deben ser tratados como porcentuales o no porcentuales. Si no se especifica valor, se respetará lo indicado por la API.</td>
        <td>boolean</td>
        <td>Ninguno</td>
        <td>true</td>
    </tr>
    <tr>
        <td>links</td>
        <td>Indica qué enlaces a mostrar bajo las tarjetas para descargar o compartir las mismas.</td>
        <td>string</td>
        <td>full</td>
        <td>small</td>
    </tr>
    <tr>
        <td>locale</td>
        <td>Valores posibles: "AR" o "US" (pendientes nuevos valores). Representan qué _locale_ usar para formatear números, es decir, separadores de miles o de decimales.</td>
        <td>string</td>
        <td>AR</td>
        <td>AR o US</td>
    </tr>
</table>

### Parámetros opcionales de valor singular o de array
Algunos parámetros opcionales pueden ser un valor singular, de cierto tipo, como un array de valores de ese tipo (para lo cual deben tener tantos elementos como el parámetro `ids`). En caso de ser un array, en lugar de configurar todas las tarjetas con un mismo valor, puede determinarse la configuración de dicho parámetro para la tarjeta de cada serie, apareando el índice de `ids` con el de dicho array de parámetro:

<table>
    <tr>
        <th>Nombre</th>
        <th>Descripción</th>
        <th>Tipo</th>
        <th>Default</th>
        <th>Ejemplos</th>
    </tr>
    <tr>
        <td>color</td>
        <td>Indica el color a usar para el número y el borde de una tarjeta. Los códigos de colores pueden ser tanto hexadecimales (ej. "#00CC44") como numeros que son mapeados a la paleta por defecto (del 0 al 8); ver paleta por defecto más abajo. Si se omite, se alternarán los valores de la paleta por defecto para cada tarjeta.</td>
        <td>string</td>
        <td>Ninguno, sigue la paleta por defecto</td>
        <td>'#83DB2C' ó ['#0072BB', '#FF826A', 5]</td>
    </tr>
    <tr>
        <td>decimals</td>
        <td>Permite elegir cuántos dígitos decimales mostrar en el valor de una tarjeta. Debe ser mayor o igual a 0. Redondea los valores en caso de ser menor a la cantidad de dígitos original del valor; completa con 0s en caso contrario.</td>
        <td>int</td>
        <td>2</td>
        <td>3 ó [1, 4, 0]</td>
    </tr>
    <tr>
        <td>decimalsBillion</td>
        <td>Cantidad de dígitos decimales a mostrar en aquellos números que son abreviados y divididos por un billón. Puede ser mayor al parámetro decimals.</td>
        <td>int</td>
        <td>2</td>
        <td>5 ó [3, 3, 2]</td>
    </tr>
    <tr>
        <td>decimalsMillion</td>
        <td>Cantidad de dígitos decimales a mostrar en aquellos números que son abreviados y divididos por un millón. Puede ser mayor al parámetro decimals.</td>
        <td>boolean</td>
        <td>2</td>
        <td>4 ó [6, 1, 6]</td>
    </tr>
    <tr>
        <td>explicitSign</td>
        <td>Permite forzar la presencia de un signo antepuesto al valor mostrado; es decir, si dicho valor resultara positivo, será precedido por un signo de adición ('+').</td>
        <td>booleano</td>
        <td>false</td>
        <td>true ó [true, false, true]</td>
    </tr>
    <tr>
        <td>numbersAbbreviate</td>
        <td>Flag que indica si se deben abreviar los números grandes y formatearlos con el sufijo pertinente; si está apagado, no se realizará abreviatura alguna. Ver la sección de "Abreviatura" para más detalle.</td>
        <td>boolean</td>
        <td>true</td>
        <td>false ó [false, false, true]</td>
    </tr>
    <tr>
        <td>source</td>
        <td>Especifica el texto al pie de una tarjeta, que refiere a la fuente de la información. De no definirse, se considera la fuente por defecto de la serie; de definirse como '', se la omite.</td>
        <td>string</td>
        <td>Ninguno</td>
        <td>'Mi Fuente' ó ['Fuente 1', '', 'Fuente3']</td>
    </tr>
    <tr>
        <td>title</td>
        <td>Especifica el título de una tarjeta. De no definirse, se considera el título por defecto de la serie; de definirse como '', se lo omite.</td>
        <td>string</td>
        <td>Ninguno</td>
        <td>'Tarjetas de la fila' ó ['Tarjeta 1', 'Tarjeta 2', '']</td>
    </tr>
    <tr>
        <td>units</td>
        <td>Especifica el texto al pie de una tarjeta, que refiere a las unidades en que se mide el valor mostrado. De no definirse, se consideran las unidades por defecto de la serie; de definirse como '', se las omite.</td>
        <td>string</td>
        <td>Ninguno</td>
        <td>'Hectolitros' ó ['', 'Unidad 2', 'Unidad 3']</td>
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
  <div id="row"></div>
  <script>
    window.onload = function () {
      TSComponents.CardRow.render('row', {
        ids: [
            'tn_86',
            'tn_02',
            'tn_94'
        ],
        apiBaseUrl: 'https://apis.datos.gob.ar/series/api',
        collapse: 'year',
        hasColorBar: true,
        hasFrame: false,
        isPercentage: true,
        links: 'none',
        locale: 'AR',
        color: [
            '#FF2200',
            '#44BB22',
            '#393900'
        ],
        decimals: 4,
        decimalsBillion: 5,
        decimalsMillion: 7,
        explicitSign: [
            true,
            true,
            false
        ],
        numbersAbbreviate: [
            false,
            true,
            false
        ],
        source: 'Mi propia fuente',
        title: 'Tarjetas de la fila',
        units: [
            'Unidad 1',
            'Unidad 2',
            'Unidad 3'
        ]
    })
    }
  </script>
</body>
</html>
```

<script>
    window.onload = function() {
        
        TSComponents.CardRow.render('fila', {
            ids: [
                '105.1_I2L_2016_M_16',
                '105.1_I2TR_2016_M_23',
                '105.1_I2CE_2016_M_16'
            ],
            color: [
                '#00FF00',
                '#FF0000',
                '#CCCCCC'
            ]
        })

    }
</script>