import * as React from 'react';

import * as moment from "moment";
import DatePicker from 'react-datepicker';

export interface IDatePickerProps {
    date: string;
    onDateChange: (date: any) => void;
    labelText?: string;
}

export default (props: IDatePickerProps) =>
    <span>
        {props.labelText ? <span>{props.labelText}</span> : ''}
        <DatePicker selected={moment(props.date)}
                    onChange={props.onDateChange}
                    className="form-control datepicker"
                    todayButton="Hoy"
                    dateFormat="YYYY-MM-DD"
                    scrollableYearDropdown={true}
                    showYearDropdown={true} />
    </span>
