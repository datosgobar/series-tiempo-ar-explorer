// tslint:disable-next-line:no-var-requires
export const ReactHighcharts = require('react-highcharts');

// tslint:disable-next-line:no-var-requires
export const ReactHighStock = require('react-highcharts/ReactHighstock');

// Highcharts more
// tslint:disable-next-line:no-var-requires
require('highcharts-more')(ReactHighcharts.Highcharts);

// Highcharts exporting
// tslint:disable-next-line:no-var-requires
require('highcharts-exporting')(ReactHighcharts.Highcharts);

// Highcharts export csv
// tslint:disable-next-line:no-var-requires
require('highcharts-export-csv')(ReactHighcharts.Highcharts);

export interface IHCSeries {
    data: number[][];
    name: string;
    type: string;
    color: string;
    lineWidth: number;
    dashStyle: string;
}

export interface IHConfig {
    type?: string;
    color?: string;
    lineWidth?: number;
    dashStyle?: string;
}
