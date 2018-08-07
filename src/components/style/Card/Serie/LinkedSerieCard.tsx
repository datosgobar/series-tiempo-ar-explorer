import * as React from 'react';
import { Link } from "react-router-dom";

import SerieCard, { ISerieCardProps } from "./SerieCard";


export default (props: ISerieCardProps) =>

    <Link to={`/series/?ids=${props.serie.id}`}>
        <SerieCard {...props} />
    </Link>
