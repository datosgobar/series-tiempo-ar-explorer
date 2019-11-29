import * as React from 'react';
import {Link} from "react-router-dom";

import {ISerieCardProps} from "./SerieCard";
import SerieCardWithChart from "./SerieCardWithChart";


export default (props: ISerieCardProps) =>

    <Link to={`/series/?ids=${props.serie.id}`}>
        <SerieCardWithChart {...props}
                            connectedChart={true}/>
    </Link>
