<link type="text/css" rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.8.2/css/all.min.css" media="all" />
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.6.8/dist/css/components.css" type="text/css">
<script type='text/javascript' src='https://cdn.jsdelivr.net/gh/datosgobar/series-tiempo-ar-explorer@ts_components_2.6.8/dist/js/components.js'></script>

<style>
.btn-primary {
    color: #ffffff;
    background-color: #0072bb;
}
</style>

# Layout de componentes:

La hoja de estilos `components.css` incluye también selectores de clases aplicables a elementos HTML, 
inherentes al layout del dashboard o página donde se inserten los componentes.


### Fila para componentes:
Selector cuyos elementos internos serán equiespaciados y dispuestos horizontalmente.
#### Ejemplo:
<div class="ts-components-row">
    <div id="card-en-row-1"></div>
    <div id="card-en-row-2"></div>
    <div id="card-en-row-3"></div>
</div>


#### Código:

```html
<div class="ts-components-row">
    <div id="card-en-row-1"></div>
    <div id="card-en-row-2"></div>
    <div id="card-en-row-3"></div>
</div>

<script>
window.onload = function () {

        TSComponents.Card.render('card-en-row-1', {
            serieId: '46.2_ECTSTG_0_T_40',
            color: '#0072BB',
            hasChart: 'none',
            title: "Tasa Subocupación GBA",
            links: "none",
            hasFrame: true,
            source: "Fuente: SSPM"
        }) 
        TSComponents.Card.render('card-en-row-2', {
            serieId: '46.2_ECTSTSL_0_T_45',
            color: '#6B8E23',
            hasChart: 'none',
            title: "Tasa Subocupación San Luis",
            links: "none",
            hasFrame: true,
            source: "Fuente: SSPM"
        })
        TSComponents.Card.render('card-en-row-3', {
            serieId: '46.2_ECTSTC_0_T_47',
            color: '#FFA500',
            hasChart: 'none',
            title: "Tasa Subocupación Corrientes",
            links: "none",
            hasFrame: true,
            source: "Fuente: SSPM"
        })

}
</script>
```

### Contenedor de Card:
Selector para `div` de una Card, con un pequeño margen abajo y óptimo para diversos viewports.
#### Ejemplo:
<div class="card-wrapper" id="card-superior"></div>
<div class="card-wrapper" id="card-inferior"></div>


#### Código:

```html
<div class="card-wrapper" id="card-superior"></div>
<div class="card-wrapper" id="card-inferior"></div>

<script>
window.onload = function () {

        TSComponents.Card.render('card-superior', {
            serieId: '105.1_I2L_2016_M_16',
            hasChart: 'none',
            color:'#5ED613',
            title: "IPC Lechuga",
            links: "none",
            hasFrame: true,
            source: "Fuente: SSPM"
        })
        TSComponents.Card.render('card-inferior', {
            serieId: '105.1_I2BAT_2016_M_15',
            hasChart: 'none',
            color:'#969009',
            title: "IPC Batata",
            links: "none",
            hasFrame: true,
            source: "Fuente: SSPM"
        })

}
</script>
```

<script>
    window.onload = function() {

        TSComponents.Card.render('card-en-row-1', {
            serieId: '46.2_ECTSTG_0_T_40',
            color: '#0072BB',
            hasChart: 'none',
            title: "Tasa Subocupación GBA",
            links: "none",
            hasFrame: true,
            source: "Fuente: SSPM"
        })  
        TSComponents.Card.render('card-en-row-2', {
            serieId: '46.2_ECTSTSL_0_T_45',
            color: '#6B8E23',
            hasChart: 'none',
            title: "Tasa Subocupación San Luis",
            links: "none",
            hasFrame: true,
            source: "Fuente: SSPM"
        })
        TSComponents.Card.render('card-en-row-3', {
            serieId: '46.2_ECTSTC_0_T_47',
            color: '#FFA500',
            hasChart: 'none',
            title: "Tasa Subocupación Corrientes",
            links: "none",
            hasFrame: true,
            source: "Fuente: SSPM"
        })

        TSComponents.Card.render('card-superior', {
            serieId: '105.1_I2L_2016_M_16',
            hasChart: 'none',
            color:'#5ED613',
            title: "IPC Lechuga",
            links: "none",
            hasFrame: true,
            source: "Fuente: SSPM"
        })
        TSComponents.Card.render('card-inferior', {
            serieId: '105.1_I2BAT_2016_M_15',
            hasChart: 'none',
            color:'#969009',
            title: "IPC Batata",
            links: "none",
            hasFrame: true,
            source: "Fuente: SSPM"
        })
        
}
</script>
