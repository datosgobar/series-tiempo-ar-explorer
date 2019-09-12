import { IChartTypeProps, ILegendLabel, INumberPropsPerId, IPropsPerId, ISeriesAxisSides } from "../../components/viewpage/graphic/Graphic";

export class PropsAdjuster {

    private ids: string[];

    public constructor(ids: string[]) {
        this.ids = ids.sort();
    }

    public adjustAll(chartTypes: IChartTypeProps, legendLabel: ILegendLabel, seriesAxis: ISeriesAxisSides,
        decimalTooltips: INumberPropsPerId, chartType?: string, decimalTooltip?: number) {

        this.adjust(chartTypes);
        this.adjust(legendLabel);
        this.adjust(seriesAxis);
        this.adjust(decimalTooltips);

        if (chartType !== undefined) {
            this.applyDefaultPropValue(chartTypes, chartType);
        }
        if (decimalTooltip !== undefined) {
            this.applyDefaultPropValue(decimalTooltips, decimalTooltip);
        }

    }

    private isPureID(id: string) {
        return id.indexOf(':') <= -1;
    }

    private getRoot(id: string) {
        return id.split(':')[0]
    }

    private adjust(props: IPropsPerId) {

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

    private applyDefaultPropValue(perIdProp: IPropsPerId, generalProp: string | number) {

        for (const id of this.ids) {
            if(perIdProp[id] === undefined) {
                perIdProp[id] = generalProp;
            }
        }

    }

}