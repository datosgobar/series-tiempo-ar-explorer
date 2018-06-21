import * as React from 'react';

import { ISerieApi } from '../../../api/SerieApi';
import { ISelectorProps } from '../selector/Selector';


export default interface IFilterProps extends React.Props<{}> {

    seriesApi: ISerieApi;
    picked: string;
    selector: React.ComponentClass<ISelectorProps<string>>;
    labelWraper: any;
}