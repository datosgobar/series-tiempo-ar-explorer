import { Location } from 'history';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import './SearchPage.css';

import { ISerieApi } from '../../api/SerieApi';
import { IStore } from '../../store/initialState';
import Filters from './filters/Filters';
import Searcher from './searcher/Searcher';


interface ISearchPageProps extends RouteComponentProps<any> {
    seriesApi: ISerieApi;
}

interface ISearchPageState {
    q: string;
    offset: number;
    limit: number;
}

class SearchPage extends React.Component<ISearchPageProps, ISearchPageState> {

    private unListen: () => void;

    constructor(props: any, context: any) {
        super(props, context);

        this.readUriParams = this.readUriParams.bind(this);
        this.updateQueryParams = this.updateQueryParams.bind(this);

        this.state = this.readUriParams(this.props.location) || { q: "", offset: 0, limit: 10 };
    }

    public componentDidMount() {
        this.unListen = this.props.history.listen(location => {
            const newState = this.readUriParams(location);

            if (!newState) {
                return;
            }

            this.setState(newState);
        });
    }

    public componentWillUnmount() {
        this.unListen();
    }

    public readUriParams(location: Location) {
        const search: string = location.search; // could be '?foo=bar'
        const params: URLSearchParams = new URLSearchParams(search);
        const q: string | null = params.get('q');

        if (!q) {
            return;
        }

        let offset: number | string | null = params.get('offset');
        let limit: number | string | null = params.get('limit');

        offset = offset ? parseInt(offset, 10) : 0;
        limit = limit ? parseInt(limit, 10) : 10;

        return { q, offset, limit }
    }

    public updateQueryParams(q: string, offset: number, limit: number) {
        const urlSearchParams = new URLSearchParams();
        urlSearchParams.append('q', q);
        urlSearchParams.append('offset', offset.toString());
        urlSearchParams.append('limit', limit.toString());

        this.props.history.push('/search/?' + urlSearchParams);
    }

    public render() {
        return (
            <div className='SearchPage'>
                <h1>Resultados Busqueda</h1>
                <Filters seriesApi={this.props.seriesApi}/>
                <Searcher
                    limit={this.state.limit}
                    offset={this.state.offset}
                    q={this.state.q}
                    seriesApi={this.props.seriesApi}
                    onWillSearch={this.updateQueryParams} />
            </div>
        );
    }
}

function mapStateToProps(state: IStore, ownProps: ISearchPageProps) {
    return {
        seriesApi: state.seriesApi,
    };
}

export default withRouter<ISearchPageProps>(connect(mapStateToProps)(SearchPage));
