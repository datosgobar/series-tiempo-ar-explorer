export default interface ISelectorProps<T> {

    selected: T;
    items: T[];
    onItemSelected: (event: React.SyntheticEvent<HTMLElement>, item: T | null) => void;
    renderItem: (item: T) => JSX.Element | string;
}
