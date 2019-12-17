# Componente: card

El componente `card` permite embeber tarjetas con información de la serie, y un gráfico incluído dentro de la misma, en sitios web.

<link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css" media="all" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.8.1/dist/css/components.css" type="text/css">
<script type='text/javascript' src='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.8.1/dist/js/components.js'></script>

<style>
    .row {
        width: 90%;
        margin: auto;
        display: flex;
        justify-content: space-around;
    }
</style>

<div class="row">
    <div id="ipc"></div>
    <div id="exportaciones"></div>
</div>

## Ejemplo base
Ver online: [https://jsfiddle.net/tj2b1fm6/](https://jsfiddle.net/tj2b1fm6/)

```html
<!-- importa íconos de FontAwesome -->
<link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css" media="all" />

<!-- importa librería JS -->
<script type='text/javascript' src='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.8.1/dist/js/components.js'></script>

<!-- importa hoja de estilos CSS -->
<link rel='stylesheet' type='text/css' href='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.8.1/dist/css/components.css'/>

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
        <td>full</td>
        <td>small</td>
    </tr>
    <tr>
        <td>color</td>
        <td>No</td>
        <td>Indica el color a usar para el número y el borde de la tarjeta. Los códigos de colores pueden ser tanto hexadecimales (ej. "#00CC44") como numeros que son mapeados a la paleta por defecto (del 0 al 8) Ver paleta por defecto más abajo.</td>
        <td>string</td>
        <td>#0072BB</td>
        <td>red</td>
    </tr>
    <tr>
        <td>hasChart</td>
        <td>No</td>
        <td>Indica el tipo de gráfico a usar dentro de la tarjeta.</td>
        <td>string</td>
        <td>small</td>
        <td>full</td>
    </tr>
    <!--
    <tr>
        <td>chartType</td>
        <td>No</td>
        <td>Indica el tipo de gráfico a usar dentro de la tarjeta. Sólo aplicable si `hasChart` es igual a `Full`.</td>
        <td>string</td>
        <td>Line</td>
        <td>Area</td>
    </tr>
    -->
    <tr>
        <td>explicitSign</td>
        <td>No</td>
        <td>Permite forzar la presencia de un signo antepuesto al valor mostrado; es decir, si dicho valor resultara positivo, será precedido por un signo de adición ('+'). Por defecto, se encuentra desactivado.</td>
        <td>booleano</td>
        <td>false</td>
        <td>true</td>
    </tr>
    <tr>
        <td>title</td>
        <td>No</td>
        <td>Especifica el título de la tarjeta. De no definirse, se considera el título por defecto de la serie; de definirse como '', se lo omite.</td>
        <td>string</td>
        <td>Ninguno</td>
        <td>Un título personalizado</td>
    </tr>
    <tr>
        <td>source</td>
        <td>No</td>
        <td>Especifica el texto al pie de la tarjeta, que refiere a la fuente de la información. De no definirse, se considera la fuente por defecto de la serie; de definirse como '', se la omite.</td>
        <td>string</td>
        <td>Ninguno</td>
        <td>Dirección de Estadística e Información en Salud (DEIS). Secretaría de Gobierno de Salud</td>
    </tr>
    <tr>
        <td>units</td>
        <td>No</td>
        <td>Especifica el texto al pie de la tarjeta, que refiere a las unidades en que se mide el valor mostrado. De no definirse, se consideran las unidades por defecto de la serie; de definirse como '', se las omite.</td>
        <td>string</td>
        <td>Ninguno</td>
        <td>Millones de pesos</td>
    </tr>
    <tr>
        <td>hasFrame</td>
        <td>No</td>
        <td>Permite forzar la presencia de un marco alrededor de la tarjeta y un fondo blanco para la misma. De no estar definido, la tarjeta tendrá marco si tiene al menos gráfico o enlaces.</td>
        <td>booleano</td>
        <td>Ninguno</td>
        <td>true</td>
    </tr>
    <tr>
        <td>hasColorBar</td>
        <td>No</td>
        <td>Permite forzar la presencia de la barra de color (el mismo que posee el número) en el borde superior de la tarjeta. De no estar definido, la barrá estará presente sólo si la tarjeta posee marco.</td>
        <td>booleano</td>
        <td>Ninguno</td>
        <td>false</td>
    </tr>
    <tr>
        <td>collapse</td>
        <td>No</td>
        <td>Permite cambiar la frecuencia en la que se muestra la serie. Mediante este parámetro se puede hacer, por ejemplo, un agregado anual para una serie que tiene una frecuencia diaria. Las limitaciones del campo son que la frecuencia elegida tiene que ser menor o igual a la frecuencia por defecto de la serie, si no lo es entonces el gráfico no se mostrará (Ej: si la serie tiene frecuencia semestral, 'collapse' puede ser solo o 'semester' o 'year').</td>
        <td>string</td>
        <td>Ninguno</td>
        <td>'day', 'month', 'quarter', 'semester', 'year'</td>
    </tr>
    <tr>
        <td>apiBaseUrl</td>
        <td>No</td>
        <td>Permite cambiar la URL de la API a la cual se le pedirá la serie representada en la tarjeta. A dicha url se le adjuntará el texto '/series/?ids=serieId' al final.</td>
        <td>string</td>
        <td>'http://apis.datos.gob.ar/series/api'</td>
        <td>'http://miurl.apis.com/datos'</td>
    </tr>
    <tr>
        <td>decimals</td>
        <td>No</td>
        <td>Permite elegir cuántos dígitos decimales mostrar en el valor de la tarjeta. Debe ser mayor o igual a 0. Redondea los valores en caso de ser menor a la cantidad de dígitos original del valor; completa con 0s en caso contrario.</td>
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
        <td>Cantidad de dígitos decimales a mostrar en aquellos números que son abreviados y divididos por un billón. Supeditará al valor del parámetro decimals.</td>
        <td>int</td>
        <td>2</td>
        <td>4</td>
    </tr>
    <tr>
        <td>decimalsMillion</td>
        <td>No</td>
        <td>Cantidad de dígitos decimales a mostrar en aquellos números que son abreviados y divididos por un millón. Supeditará al valor del parámetro decimals.</td>
        <td>boolean</td>
        <td>2</td>
        <td>0</td>
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
  <div id="card1"></div>
  <script>
    window.onload = function () {
      TSComponents.Card.render('card1', {
        serieId: '143.3_NO_PR_2004_A_21',
        hasChart: 'small',
        links: 'full',
        locale: 'AR',
        color: '#F9A822',
        explicitSign: true,
        title: 'Titulo personalizado',
        source: 'Fuente primaria: Mi Fuente',
        units: '',
        hasFrame: false,
        hasColorBar: true,
        collapse: 'year',
        apiBaseUrl: 'http://apis.datos.gob.ar/series/api'
    })
    }
  </script>
</body>
</html>
```

## Demo online
[https://jsfiddle.net/tj2b1fm6/](https://jsfiddle.net/tj2b1fm6/)

## Variantes de tarjetas

### Card: default

<div class="row">
    <div id='ipc-card'></div>
    <div id='exportaciones-card'> </div>
</div>

### Card: menos links

<div class="row">
    <div id='ipc-card-links2'></div>
    <div id='exportaciones-card-links2'></div>
</div>

### Card: sin links

<div class="row">
    <div id='ipc-card-med'></div>
    <div id='exportaciones-card-med'></div>
</div>

### Card: mínima

<div class="row">
    <div id='ipc-card-min'></div>
    <div id='exportaciones-card-min'></div>
</div>

### Card: mínima (eliminando elementos)

<div class="row">
    <div id='ipc-card-min-xtreme'></div>
    <div id='exportaciones-card-min-xtreme'></div>
</div>


<script>
    window.onload = function() {
        
        TSComponents.Card.render('ipc', {
            serieId: '148.3_INIVELNAL_DICI_M_26:percent_change',
            color: '#F9A822',
            hasChart: 'small',
            title: "Indice de Precios al Consumidor Nacional",
            links: "none"
        })

        TSComponents.Card.render('exportaciones', {
            serieId: '74.3_IET_0_M_16:percent_change_a_year_ago',
            explicitSign: true,
            hasChart: 'small',
            title: "Exportaciones",
            links: "none"
        })

        TSComponents.Card.render('ipc-card', {
            serieId: '148.3_INIVELNAL_DICI_M_26:percent_change',
            color: '#F9A822',
            hasChart: 'small',
            title: "Indice de Precios al Consumidor Nacional"
        })

        TSComponents.Card.render('exportaciones-card', {
            serieId: '74.3_IET_0_M_16:percent_change_a_year_ago',
            explicitSign: true,
            hasChart: 'small',
            title: "Exportaciones"
        })

        TSComponents.Card.render('ipc-card-links2', {
            serieId: '148.3_INIVELNAL_DICI_M_26:percent_change',
            color: '#F9A822',
            hasChart: 'small',
            links: "small",
            title: "Indice de Precios al Consumidor Nacional"
        })

        TSComponents.Card.render('exportaciones-card-links2', {
            serieId: '74.3_IET_0_M_16:percent_change_a_year_ago',
            explicitSign: true,
            hasChart: 'small',
            links: "small",
            title: "Exportaciones"
        })

        TSComponents.Card.render('ipc-card-med', {
            serieId: '148.3_INIVELNAL_DICI_M_26:percent_change',
            color: '#F9A822',
            hasChart: 'small',
            links: "none",
            title: "Indice de Precios al Consumidor Nacional"
        })

        TSComponents.Card.render('exportaciones-card-med', {
            serieId: '74.3_IET_0_M_16:percent_change_a_year_ago',
            explicitSign: true,
            hasChart: 'small',
            links: "none",
            title: "Exportaciones",
            hasFrame: false
        })

        TSComponents.Card.render('ipc-card-min', {
            serieId: '148.3_INIVELNAL_DICI_M_26:percent_change',
            color: '#F9A822',
            links: 'none',
            hasChart: "none",
            title: "Indice de Precios al Consumidor Nacional"
        })

        TSComponents.Card.render('exportaciones-card-min', {
            serieId: '74.3_IET_0_M_16:percent_change_a_year_ago',
            explicitSign: true,
            links: 'none',
            hasChart: "none",
            title: "Exportaciones",
            hasColorBar: true
        })

        TSComponents.Card.render('ipc-card-min-xtreme', {
            serieId: '148.3_INIVELNAL_DICI_M_26:percent_change',
            links: 'none',
            hasChart: "none",
            title: "",
            units: "",
            source: ""
        })

        TSComponents.Card.render('exportaciones-card-min-xtreme', {
            serieId: '74.3_IET_0_M_16:percent_change_a_year_ago',
            explicitSign: true,
            links: 'none',
            hasChart: "none",
            title: "",
            units: "",
            source: ""
        })
    }
</script>
