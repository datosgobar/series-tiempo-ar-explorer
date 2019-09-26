# Componente: card

El componente `card` permite embeber tarjetas con información de la serie, y un gráfico incluído dentro de la misma, en sitios web.

<link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css" media="all" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.6.2/dist/css/components.css" type="text/css">
<script type='text/javascript' src='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.6.2/dist/js/components.js'></script>

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
Ver online: [https://jsfiddle.net/oz9ch2br/](https://jsfiddle.net/oz9ch2br/)

```html
<!-- importa íconos de FontAwesome -->
<link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css" media="all" />

<!-- importa librería JS -->
<script type='text/javascript' src='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.6.2/dist/js/components.js'></script>

<!-- importa hoja de estilos CSS -->
<link rel='stylesheet' type='text/css' href='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.6.2/dist/css/components.css'/>

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
        <td>Indica el color a usar para el número y el borde de la tarjeta.</td>
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
</table>

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
https://jsfiddle.net/oz9ch2br/

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
