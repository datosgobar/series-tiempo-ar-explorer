import * as React from 'react';
import Select, { OnChangeHandler } from 'react-select';
import FormDropdown from '../../style/Common/FormDropdown';


interface IDropdownSelectorProps {
    selected: any;
    items: any[];
    onChange: (item: any | null) => void;
    renderItem: (item: any) => JSX.Element | string;
}

export default (props: IDropdownSelectorProps) =>
    <Select noResultsText=""
            placeholder={""}
            inputRenderer={inputRenderer}
            closeOnSelect={true}
            onBlurResetsInput={false}
            onSelectResetsInput={false}
            options={props.items.map((item: any) => ({ value: item, label: item }))}
            simpleValue={true}
            clearable={true}
            value={props.selected}
            onChange={handleChange(props.onChange)}
            rtl={true}
            searchable={true} />

function inputRenderer(props: any) {
    return <FormDropdown placeholder="Selecciona una opción" {...props}/>
}

function handleChange(onChange: (item: any | null) => void): OnChangeHandler<any> {
    return (option: any) => { onChange(option) }
}