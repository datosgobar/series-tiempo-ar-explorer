import * as React from 'react';

import { ISerieApi } from '../../../api/SerieApi';


export default interface IFilterProps extends React.Props<{}> {

    seriesApi: ISerieApi;
    picked: string;
    selector: any;
}