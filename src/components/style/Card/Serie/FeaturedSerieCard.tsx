import * as React from 'react';
import LinkedSerieCardWithChart from "./LinkedSerieCardWithChart";
import {ISerieCardProps} from "./SerieCard";

export default (props: ISerieCardProps) =>

    <div className="col-sm-6">
        <LinkedSerieCardWithChart {...props} />
    </div>