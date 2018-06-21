import * as React from 'react';

import Select from '../../style/Common/Select';

import ISelectorProps from './SelectorProps';


type T = string;

export default (props: ISelectorProps<T>) =>

    <Select>
        <option value="">Selecciona una opción</option>
        {props.items.map(item =>
            <option key={item.toString()} onClick={handleClick(props.onItemSelected, item)}>
                {props.renderItem(item)}
            </option>
        )}
    </Select>

function handleClick(onItemSelected: any, item: T){
    return (event: React.SyntheticEvent<HTMLElement>) => {
        onItemSelected(
            event,
            item
        );
    };
}