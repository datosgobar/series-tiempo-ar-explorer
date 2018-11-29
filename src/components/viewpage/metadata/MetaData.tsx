import * as React from 'react';

import {Color} from '../../style/Colors/Color';
import RemoveAction from '../../style/Details/RemoveAction';
import SerieDetails from '../../style/Details/SerieDetails';

import {ISerie} from '../../../api/Serie';


interface IMetaDataProps {
    series: ISerie[];
    onRemove: (serieId: string) => void;
    pegColorFor?: (serieId: string) => Color;
}

export class MetaData extends React.Component<IMetaDataProps, any> {

    constructor(props: IMetaDataProps) {
        super(props);

        this.handleRemove = this.handleRemove.bind(this);
    }

    public handleRemove(serieId: string) {
        return ((event: React.MouseEvent<HTMLButtonElement>) => {
            event.preventDefault();
            this.props.onRemove(serieId);
        });
    }

    public render() {
        return (
            <div className='MetaData'>
                {this.props.series.map((serie: ISerie, index: number) =>
                    <SerieDetails key={serie.id} serie={serie}
                                  pegColorFor={this.props.pegColorFor}
                                  actions={this.actionsListFor(serie.id)} />
                )}
            </div>
        );
    }

    private actionsListFor(serieId: string) {
        const result = [];
        if (this.props.series.length > 1) {
            result.push(<RemoveAction key={serieId} onClick={this.handleRemove(serieId)} />);
        }

        return result;
    }
}

export default MetaData;