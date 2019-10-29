import * as React from 'react';
import SearchResultsSortingOption, { SORTING_VALUES } from './SearchResultsSortingOption';


interface ISearchResultsSortingProps {
    sorting: string;
    onSortingPicked: (criterion: string) => void;
}

interface ISearchResultsSortingState {
    criterion: string;
}

export default class SearchResultsSorting extends React.Component<ISearchResultsSortingProps, ISearchResultsSortingState> {

    constructor(props: ISearchResultsSortingProps) {
        
        super(props);
        this.handleChange = this.handleChange.bind(this);
        
    }

    public handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        
        const selectedCriterion = event.target.value;
        this.props.onSortingPicked(selectedCriterion);

    }

    public render() {

        const selectedSorting = this.props.sorting === "" ? "relevance" : this.props.sorting;
        if (!(Object as any).values(SORTING_VALUES).includes(selectedSorting)) {
            throw new Error("El valor del query param 'sorting' no es válido");
        }

        return (
            <div>
                <label htmlFor="sort-by-criterion" className="sort-by-label">Ordenar por:</label>
                <select name="sort-by" id="sort-by-criterion" value={selectedSorting} onChange={this.handleChange}>
                    <SearchResultsSortingOption value={SORTING_VALUES.RELEVANCE}
                                                text={"Relevancia"}/>
                    <SearchResultsSortingOption value={SORTING_VALUES.HITS_90_DAYS_DESC}
                                                text={"Consultas últimos 90 días (↓)"}/>
                    <SearchResultsSortingOption value={SORTING_VALUES.HITS_90_DAYS_ASC}
                                                text={"Consultas últimos 90 días (↑)"}/>
                    <SearchResultsSortingOption value={SORTING_VALUES.FREQUENCY_DESC}
                                                text={"Frecuencia (mayor a menor)"}/>
                    <SearchResultsSortingOption value={SORTING_VALUES.FREQUENCY_ASC}
                                                text={"Frecuencia (menor a mayor)"}/>
                </select>
            </div>
        )
    }

}
