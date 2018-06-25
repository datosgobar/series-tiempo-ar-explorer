export default interface ISelectorProps<T> {

    selected: T;
    items: T[];
    onChange: (item: T | null) => void;
    renderItem: (item: T) => JSX.Element | string;
}
