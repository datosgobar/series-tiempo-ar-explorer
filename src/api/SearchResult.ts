import { IPublisher, ITSMeta } from "./ITSAPIResponse";
import { ISerie } from "./Serie";


export default class SearchResult implements ISerie {

    constructor(private searchResult: ITSMeta) {

    }

    public get id(): string {
        return this.searchResult.field.id;
    }

    public get title(): string {
        return this.searchResult.field.description;
    }

    public get publisher(): IPublisher {
        return this.searchResult.dataset.publisher;
    }

    public get description(): string {
        return this.searchResult.dataset.title;
    }

    public get data() {
        return [];
    }

    public get accuralPeriodicity() {
        return this.searchResult.field.accuralPeriodicity;
    }

    public get index() {
        return this.searchResult.field.index;
    }

    public get units() {
        return this.searchResult.field.units;
    }
}