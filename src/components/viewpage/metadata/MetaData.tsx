import * as React from 'react';

import RemoveAction from '../../style/Details/RemoveAction';
import SerieDetails from '../../style/Details/SerieDetails';

import { ISerie } from '../../../api/Serie';


interface IMetaDataProps {
    series: ISerie[];
    onRemove: (event: React.MouseEvent<HTMLAnchorElement>, serieId: string) => void;
    pegColorFor?: (serieId: string) => string;
}

export class MetaData extends React.Component<IMetaDataProps, any> {

    constructor(props: IMetaDataProps){
        super(props);

        this.handleRemove = this.handleRemove.bind(this);
    }

    public handleRemove(serieId: string){
        return ((event: React.MouseEvent<HTMLAnchorElement>) => {
            event.preventDefault();
            this.props.onRemove(event, serieId);
        });
    }

    public render() {
        return (
            <div className='MetaData'>
                {this.props.series.map((serie: ISerie, index: number) =>
                    <SerieDetails key={serie.id} serie={serie} 
                        pegColorFor={this.props.pegColorFor}
                    actions={[
                        <RemoveAction key={serie.id} onClick={this.handleRemove(serie.id)}/>
                    ]}/>
                )}
            </div>
        );
    }
}

export default MetaData;