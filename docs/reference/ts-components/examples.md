<link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css" media="all" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.7.0/dist/css/components.css" type="text/css">
<script type='text/javascript' src='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.7.0/dist/js/components.js'></script>

<style>
.row {
    width: 90%;
    margin: auto;
    display: flex;
    justify-content: space-around;
}
.btn-primary {
    color: #ffffff;
    background-color: #0072bb;
}
</style>

# Ejemplos:

El propósito de este documento es mostrar ejemplos recomendados de implementar los componentes exportables (Card, Graphic).
Para conocer la forma de implementar correctamente cada componente, referirse a la documentación propia del mismo.


## Ejemplos Card:
### Indicadores destacados (mínimo):
#### Ejemplo:
<div class="container">
    <div class="row panels-row">
        <div class="center-block" id="indicador-min"></div>
    </div>
</div>


#### Código:

```html
<div class="container">
    <div class="row panels-row">
        <div class="center-block" id="indicador-min"></div>
    </div>
</div>

<script>
window.onload = function () {

    TSComponents.Card.render('indicador-min', {
        serieId: 'tcrse_QpvjK1:percent_change_a_year_ago',
        color: '#0072BB',
        hasChart: 'none',
        title: "TCRSE. Otros Cultivos.",
        links: "none",
        hasFrame: false,
        explicitSign: true,
        source: "Fuente: Secretaría de la Transformación Productiva"
    })

}
</script>
```

### Indicadores destacados (con mini-gráfico):
#### Ejemplo:
<div class="container">
    <div class="row panels-row">
        <div class="center-block" id="indicador-graph"></div>
    </div>
</div>


#### Código:

```html
<div class="container">
    <div class="row panels-row">
        <div class="center-block" id="indicador-graph"></div>
    </div>
</div>

<script>
window.onload = function () {

    TSComponents.Card.render('indicador-graph', {
        serieId: 'tmi_arg',
        color: '#2E7D33',
        hasChart: 'small',
        links: "none",
        hasFrame: false
    })

}
</script>
```

### Indicadores destacados (con tarjeta clickeable):
#### Ejemplo:
<div class="container">
    <div class="row panels-row">
        <div class="center-block" id="indicador-click"></div>
    </div>
</div>


#### Código:

```html
<div class="container">
    <div class="row panels-row">
        <div class="center-block" id="indicador-click"></div>
    </div>
</div>

<script>
window.onload = function () {

    TSComponents.Card.render('indicador-click', {
        serieId: 'defensa_FAA_0006',
        color: '#C62828',
        hasChart: 'small',
        title: "Personal Femenino en la Fuerza Aérea",
        links: "none",
    })

}
</script>
```

### Indicadores destacados (con enlaces de descarga):
#### Ejemplo:
<div class="container">
    <div class="row panels-row">
        <div class="center-block" id="indicador-link"></div>
    </div>
</div>


#### Código:

```html
<div class="container">
    <div class="row panels-row">
        <div class="center-block" id="indicador-link"></div>
    </div>
</div>

<script>
window.onload = function () {

    TSComponents.Card.render('indicador-min', {
        serieId: '77.3_IEB_0_A_24',
        color: '#F9A822',
        hasChart: 'small',
        title: "Exportaciones FOB a Brasil",
        units: "Millones de USD",
    })

}
</script>
```


## Ejemplos Graph:
### Graph destacado simple:
#### Ejemplo:
<div class="container">
    <div class="row">
        <div class="col-sm-12" id="graph-simple"></div>
    </div>
</div>


#### Código:

```html
<div class="container">
    <div class="row">
        <div class="col-sm-12" id="graph-simple"></div>
    </div>
</div>

<script>
window.onload = function () {

TSComponents.Graphic.render('graph-simple', {
    graphicUrl: 'https://apis.datos.gob.ar/series/api/series/?ids=143.3_NO_PR_2004_A_21:percent_change_a_year_ago,116.4_TCRZE_2015_D_36_4',
    zoom: false,
    chartTypes: {'143.3_NO_PR_2004_A_21:percent_change_a_year_ago': 'column'},
    title: 'Nivel de Actividad y Tipo de Cambio Real Multilateral',
    source: 'Fuente: Instituto Nacional de Estadística y Censos (INDEC), Banco Central de la República Argentina (BCRA)',
    navigator: false
})

}
</script>
```

### Graph destacado con zoom:
#### Ejemplo:
<div class="container">
    <div class="row panels-row">
        <div class="center-block" id="graph-zoom"></div>
    </div>
</div>


#### Código:

```html
<div class="container">
    <div class="row panels-row">
        <div class="center-block" id="graph-zoom"></div>
    </div>
</div>

<script>
window.onload = function () {

    TSComponents.Graphic.render('graph-zoom', {
        graphicUrl: 'https://apis.datos.gob.ar/series/api/series/?ids=33.2_ISAC_SIN_EDAD_0_M_23_56:percent_change_a_year_ago&last=12',
        title: 'Indicador sintético de la actividad de la construcción (ISAC)',
        source: 'Var % interanual. Fuente: Instituto Nacional de Estadística y Censos (INDEC)',
        chartTypes: { "33.2_ISAC_SIN_EDAD_0_M_23_56": "column" },
        zoom: false,
        navigator: true,
    })

}
</script>
```

### Graph destacado con navegador y zoom:
#### Ejemplo:
<div class="container">
    <div class="row panels-row">
        <div class="center-block" id="graph-nav-zoom"></div>
    </div>
</div>


#### Código:

```html
<div class="container">
    <div class="row panels-row">
        <div class="center-block" id="graph-nav-zoom"></div>
    </div>
</div>

<script>
window.onload = function () {
    
    TSComponents.Graphic.render('graph-nav-zoom', {
        graphicUrl: 'https://apis.datos.gob.ar/series/api/series/?ids=151.1_TL_SIN_TAC_2012_M_15,151.1_TL_ESTADAD_2012_M_20&last=12',
        title: 'Cantidad de trabajadores registrados',
        source: 'Cantidades. Fuente: Ministerio de Trabajo, Empleo y Seguridad Social',
        legendField: 'description',
        zoom: true,
        navigator: true
    })

}
</script>
```


## Ejemplos Card + Graph:
### Indicador con Graph inferior asociado:
#### Ejemplo:
<div class="container">
    <div class="row">
        <div class="text-center" id="graph-indicador1"></div>
    </div>
    <div class="row">
        <div id="indicator-graph1"></div>
    </div>
</div>


#### Código:

```html
<div class="container">
    <div class="row">
        <div class="text-center" id="graph-indicador1"></div>
    </div>
    <div class="row">
        <div id="indicator-graph1"></div>
    </div>
</div>

<script>
window.onload = function () {

    TSComponents.Card.render('graph-indicador1', {
        serieId: 'defensa_FAA_0006',
        color: '#C62828',
        hasChart: 'none',
        title: "",
        links: "none",
        hasFrame: false,
        source: ""
    })


    TSComponents.Graphic.render('indicator-graph1', {
        graphicUrl: 'https://apis.datos.gob.ar/series/api/series/?ids=defensa_FAA_0006',
        title: "Personal Femenino en la Fuerza Aérea",
        source: "Fuente: Ministerio de Defensa",
        colors: ['#C62828']
    })
}
</script>
```

### Indicador con Graph lateral asociado:
#### Ejemplo:
<div class="container row panels-row">
    <div id='graph-indicator2'> </div>
    <div style="width: 500px; height: 350px;" id='indicator-graph2'></div>
</div>



#### Código:

```html
<div class="container row panels-row">
    <div id='graph-indicator2'> </div>
    <div style="width: 500px; height: 350px;" id='indicator-graph2'></div>
</div>


<script>
window.onload = function () {

    TSComponents.Card.render('graph-indicator2', {
        serieId: '148.3_INIVELNAL_DICI_M_26:percent_change_a_year_ago',
        hasChart: "small",
        title: "Indicador IPC interanual"
    })

    TSComponents.Graphic.render('indicator-graph2', {
        graphicUrl: "https://apis.datos.gob.ar/series/api/series?ids=148.3_INIVELNAL_DICI_M_26:percent_change_a_year_ago",
        datePickerEnabled: false,
        zoom: false,
        title: "Gráfico IPC interanual",
        navigator: false,
        legendLabel: {
            "148.3_INIVELNAL_DICI_M_26:percent_change_a_year_ago": "IPC (% interanual)"
        }
    })
}
</script>
```

<script>
    window.onload = function() {

        TSComponents.Card.render('indicador-min', {
            serieId: 'tcrse_QpvjK1:percent_change_a_year_ago',
            color: '#0072BB',
            hasChart: 'none',
            title: "TCRSE. Otros Cultivos.",
            links: "none",
            hasFrame: false,
            explicitSign: true,
            source: "Fuente: Secretaría de la Transformación Productiva"
        })

        TSComponents.Card.render('indicador-graph', {
            serieId: 'tmi_arg',
            color: '#2E7D33',
            hasChart: 'small',
            links: "none",
            hasFrame: false
        })

        TSComponents.Card.render('indicador-click', {
            serieId: 'defensa_FAA_0006',
            color: '#C62828',
            hasChart: 'small',
            title: "Personal Femenino en la Fuerza Aérea",
            links: "none",
        })

        TSComponents.Card.render('indicador-link', {
            serieId: '77.3_IEB_0_A_24',
            color: '#F9A822',
            hasChart: 'small',
            title: "Exportaciones FOB a Brasil",
            units: "Millones de USD",
        })

        TSComponents.Graphic.render('graph-simple', {
    graphicUrl: 'https://apis.datos.gob.ar/series/api/series/?ids=143.3_NO_PR_2004_A_21:percent_change_a_year_ago,116.4_TCRZE_2015_D_36_4',
    zoom: false,
    chartTypes: {'143.3_NO_PR_2004_A_21:percent_change_a_year_ago': 'column'},
    title: 'Nivel de Actividad y Tipo de Cambio Real Multilateral',
    source: 'Fuente: Instituto Nacional de Estadística y Censos (INDEC), Banco Central de la República Argentina (BCRA)',
    navigator: false
        })

    TSComponents.Graphic.render('graph-zoom', {
        graphicUrl: 'https://apis.datos.gob.ar/series/api/series/?ids=33.2_ISAC_SIN_EDAD_0_M_23_56:percent_change_a_year_ago&last=12',
        title: 'Indicador sintético de la actividad de la construcción (ISAC)',
        source: 'Var % interanual. Fuente: Instituto Nacional de Estadística y Censos (INDEC)',
        chartTypes: { "33.2_ISAC_SIN_EDAD_0_M_23_56": "column" },
        zoom: false,
        navigator: true,
    })
    
    TSComponents.Graphic.render('graph-nav-zoom', {
        graphicUrl: 'https://apis.datos.gob.ar/series/api/series/?ids=151.1_TL_SIN_TAC_2012_M_15,151.1_TL_ESTADAD_2012_M_20&last=12',
        title: 'Cantidad de trabajadores registrados',
        source: 'Cantidades. Fuente: Ministerio de Trabajo, Empleo y Seguridad Social',
        legendField: 'description',
        zoom: true,
        navigator: true
    })

    TSComponents.Card.render('graph-indicador1', {
        serieId: 'defensa_FAA_0006',
        color: '#C62828',
        hasChart: 'none',
        title: "",
        links: "none",
        hasFrame: false,
        source: ""
    })

    TSComponents.Graphic.render('indicator-graph1', {
        graphicUrl: 'https://apis.datos.gob.ar/series/api/series/?ids=defensa_FAA_0006',
        title: "Personal Femenino en la Fuerza Aérea",
        source: "Fuente: Ministerio de Defensa",
        colors: ['#C62828']
    })

    TSComponents.Card.render('graph-indicator2', {
        serieId: '148.3_INIVELNAL_DICI_M_26:percent_change_a_year_ago',
        hasChart: "small",
        title: "Indicador IPC interanual"
    })

    TSComponents.Graphic.render('indicator-graph2', {
        graphicUrl: "https://apis.datos.gob.ar/series/api/series?ids=148.3_INIVELNAL_DICI_M_26:percent_change_a_year_ago",
        datePickerEnabled: false,
        zoom: false,
        title: "Gráfico IPC interanual",
        navigator: false,
        legendLabel: {
            "148.3_INIVELNAL_DICI_M_26:percent_change_a_year_ago": "IPC (% interanual)"
        }
    })
    
}
</script>
