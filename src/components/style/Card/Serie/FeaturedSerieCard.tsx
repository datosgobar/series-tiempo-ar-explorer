import * as React from 'react';

import LinkedSerieCard from "./LinkedSerieCard";
import { ISerieCardProps } from "./SerieCard";

export default (props: ISerieCardProps) =>

    <div className="col-sm-6 col-md-4">
        <LinkedSerieCard {...props} />
    </div>