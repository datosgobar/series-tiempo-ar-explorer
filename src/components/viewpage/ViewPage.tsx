import * as React from 'react';
import { connect } from 'react-redux';

import './ViewPage.css';

import { ISerie } from '../../api/Serie';
import SearchBox from '../common/searchbox/SearchBox'

interface IViewPageProps {
    series: ISerie[]
}

export class ViewPage extends React.Component<IViewPageProps, any> {
    public render() {
        return (
            <div className='ViewPage'>
                <h1>ViewPage</h1>
                <SearchBox />


            </div>
        );
    }
}

export default connect()(ViewPage);