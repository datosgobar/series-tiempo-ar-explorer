import * as React from 'react';


interface ISearchResultsSortingProps {
    onSortByPicked: (criteria: string) => void;
}

interface ISearchResultsSortingState {
    criteria: string;
}

export default class SearchResultsSorting extends React.Component<ISearchResultsSortingProps, ISearchResultsSortingState> {

    constructor(props: ISearchResultsSortingProps) {
        
        super(props);
        this.state = {
            criteria: "relevance"
        }
        this.handleChange = this.handleChange.bind(this);
        
    }

    public handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        
        const selectedCriteria = event.target.value;
        this.setState({criteria: selectedCriteria});
        this.props.onSortByPicked(selectedCriteria);

    }

    public render() {
        return (
            <div>
            <label htmlFor="sort-by-criteria" className="sort-by-label">Ordenar por:</label>
            <select name="sort-by" id="sort-by-criteria" value={this.state.criteria} onChange={this.handleChange}>
                <option value="relevance">Relevancia</option>
                <option value="hits_90_days-desc">Consultas últimos 90 días (↓)</option>
                <option value="hits_90_days-asc">Consultas últimos 90 días (↑)</option>
                <option value="frequency-desc">Frecuencia (mayor a menor)</option>
                <option value="frequency-asc">Frecuencia (menor a mayor)</option>
            </select>
        </div>
        )
    }

}
