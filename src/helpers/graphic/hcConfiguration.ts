import { DECIMAL_SEPARATORS, THOUSAND_SEPARATORS } from "../common/LocaleValueFormatter";
import { ReactHighStock } from "../../components/viewpage/graphic/highcharts";

export const DEFAULT_HC_SERIES_CONFIG = {
    color: '#7CB5EC',
    dashStyle: 'Solid',
    lineWidth: 2,
    showInNavigator: true
}

export function setHighchartsGlobalConfig(locale: string) {
    
    const decimalPoint = DECIMAL_SEPARATORS[locale];
    const thousandsSep = THOUSAND_SEPARATORS[locale];

    ReactHighStock.Highcharts.setOptions({
        lang: {
            contextButtonTitle: 'Opciones',
            decimalPoint,
            downloadJPEG: 'Descargar JPEG',
            downloadPDF: 'Descargar PDF',
            downloadPNG: 'Descargar PNG',
            downloadSVG: 'Descargar SVG',
            months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
            printChart: 'Imprimir gráfico',
            rangeSelectorFrom: 'Desde',
            rangeSelectorTo: 'Hasta',
            rangeSelectorZoom: '',
            resetZoom: 'Reiniciar zoom',
            shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
            thousandsSep,
            weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
        }
    });
}