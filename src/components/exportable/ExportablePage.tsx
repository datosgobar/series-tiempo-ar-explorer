import * as React from "react";
import {connect} from "react-redux";
import CardExportable from "./CardExportable";
import SerieApi from "../../api/SerieApi";
import { ApiClient } from "../../api/ApiClient";
import { withRouter } from "react-router";
import { IStore } from "../../store/initialState";

export class ExportablePage extends React.Component {
    

    public render() {
        const seriesApi = new SerieApi(new ApiClient('http://apis.datos.gob.ar/series/api/'));
        return (<div>
            <CardExportable seriesApi={seriesApi}
                            serieId={'AGRO_0201'}
                            locale={'AR'}
                            links={'full'}
                            color={'#0072BB'}
                            hasChart={'small'}
                            source={'source'}
                            title={'title'}
                            units={'units'}
                            chartType={'full'}
                            hasFrame={true}
                            hasColorBar={true}
                            explicitSign={false}
                            />
        </div>);
    }
}

function mapStateToProps(state: IStore) {
    return {
        formatChartUnits: state.formatChartUnits,
        seriesApi: state.seriesApi,
    };
}

export default withRouter<any>(connect(mapStateToProps)(ExportablePage as any));
