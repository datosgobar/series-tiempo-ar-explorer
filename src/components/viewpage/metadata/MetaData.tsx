import * as React from 'react';

import './MetaData.css';

import { ISerie } from '../../../api/Serie';


interface IMetaDataProps {
    series: ISerie[];
    onRemove: (event: React.MouseEvent<HTMLAnchorElement>, serieId: string) => void;
}

export class MetaData extends React.Component<IMetaDataProps, any> {

    constructor(props: IMetaDataProps){
        super(props);

        this.handleRemove = this.handleRemove.bind(this);
    }

    public handleRemove(serieId: string){
        return ((event: React.MouseEvent<HTMLAnchorElement>) => {
            this.props.onRemove(event, serieId);
        });
    }

    public render() {
        return (
            <div className='MetaData'>
                {this.props.series.map((serie: ISerie, index: number) =>
                    <div key={serie.id} className='Card'>
                        <a onClick={this.handleRemove(serie.id)}>remover</a>
                        <h5>{serie.title}</h5>
                        <h6>{serie.publisher.name}</h6>
                        <p>{serie.description}</p>
                    </div>
                )}
            </div>
        );
    }
}

export default MetaData;