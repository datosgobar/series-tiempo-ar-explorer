import { buildLocale } from "../../components/common/locale/buildLocale";
import { ReactHighStock } from "../../components/viewpage/graphic/highcharts";

export const DEFAULT_HC_SERIES_CONFIG = {
    color: '#7CB5EC',
    dashStyle: 'Solid',
    lineWidth: 2,
    showInNavigator: true
}

export function setHighchartsGlobalConfig(locale: string) {
    
    const localeObj = buildLocale(locale);

    ReactHighStock.Highcharts.setOptions({
        lang: {
            contextButtonTitle: 'Opciones',
            decimalPoint: localeObj.decimalSeparator(),
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
            thousandsSep: localeObj.thousandSeparator(),
            weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
        }
    });
}