import * as React from 'react';

import { ISerie } from '../../../api/Serie';
import Card from '../../common/card/Card';
import Serie from '../../common/serie/Serie';
import './MetaData.css';


interface IMetaDataProps {
    series: ISerie[];
}

export class MetaData extends React.Component<IMetaDataProps, any> {

    public render() {
        return (
            <div className='MetaData'>
                {this.props.series.map((serie: ISerie, index: number) =>
                    <Card key={index} about={<Serie key={index} serie={serie} />}/>
                )}
            </div>
        );
    }
}

export default MetaData;