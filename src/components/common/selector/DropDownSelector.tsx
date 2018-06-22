import * as React from 'react';
import Select, { OnChangeHandler } from 'react-select';

import FormDropdown from '../../style/Common/FormDropdown';

import ISelectorProps from './SelectorProps';


type T = string;

export default (props: ISelectorProps<T>) =>
    <Select
        noResultsText=""
        placeholder={""}
        inputRenderer={input}
        closeOnSelect={true}
        onBlurResetsInput={false}
        onSelectResetsInput={false}
        options={props.items.map((item: T) => ({ value: item, label: item }))}
        simpleValue={true}
        clearable={true}
        value={props.selected}
        onChange={handleChange(props.onChange)}
        rtl={true}
        searchable={true}
    />

function input(props: any) {
    return <FormDropdown placeholder="Selecciona una opción" {...props}/>
}

function handleChange(onChange: (item: T | null) => void): OnChangeHandler<T> {
    return (option: any) => {
        onChange(option)
    }
}