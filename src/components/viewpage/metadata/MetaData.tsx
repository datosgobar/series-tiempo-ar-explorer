import * as React from 'react';
import { connect } from "react-redux";
import { ISerie } from '../../../api/Serie';
import { IStore } from '../../../store/initialState';
import RemoveAction from '../../style/Details/RemoveAction';
import SerieDetails from '../../style/Details/SerieDetails';


interface IMetaDataProps {
    series: ISerie[];
    onRemove: (serieId: string) => void;
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

    public shouldComponentUpdate(nextProps: IMetaDataProps) {
        return this.props.series.length === 0
    }

    public render() {
        return (
            <div className='MetaData'>
                {this.props.series.map((serie: ISerie, index: number) =>
                    <SerieDetails key={serie.id} serie={serie} series={this.props.series} actions={this.actionsListFor(serie.id)} />
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


function mapStateToProps(state: IStore) {
    return {
        series: state.viewSeries
    };
}

export default connect(mapStateToProps, {})(MetaData);
