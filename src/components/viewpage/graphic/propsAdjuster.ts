import { IPropsPerId, IChartTypeProps, ILegendLabel, ISeriesAxisSides } from "./Graphic";

export class PropsAdjuster {

    private ids: string[];

    public constructor(ids: string[]) {
        this.ids = ids.sort();
    }

    public adjustAll(chartTypes?: IChartTypeProps, legendLabel?: ILegendLabel, seriesAxis?: ISeriesAxisSides, chartType?: string) {

        this.adjust(chartTypes);
        this.adjust(legendLabel);
        this.adjust(seriesAxis);
        this.applyDefaultChartType(chartTypes, chartType);

    }

    private isPureID(id: string) {
        return id.indexOf(':') <= -1;
    }

    private getRoot(id: string) {
        return id.split(':')[0]
    }

    private adjust(props?: IPropsPerId) {

        if (props === undefined) {
            return;
        }

        const oldProps = Object.assign({}, props);

        const orderedIDs = Object.keys(oldProps);
        orderedIDs.sort();
        for (const propId of orderedIDs) {
            if(this.isPureID(propId)) {
                for (const currentId of this.ids) {
                    if (this.getRoot(currentId) === propId) {
                        props[currentId] = oldProps[propId];
                    }
                }
            }
            else {
                props[propId] = oldProps[propId]; 
            }
        }

    }

    private applyDefaultChartType(chartTypes?: IChartTypeProps, chartType?: string) {

        if (chartTypes === undefined || chartType === undefined) {
            return;
        }

        for (const id of this.ids) {
            if(chartTypes[id] === undefined) {
                chartTypes[id] = chartType;
            }
        }

    }

}