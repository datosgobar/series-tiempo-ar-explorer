import * as React from 'react';

import * as moment from "moment";
import DatePicker from 'react-datepicker';
import DatePickerContainer from "../../style/Graphic/DatePickerContainer";

export interface IDatePickerProps {
    date: string;
    onDateChange: (date: any) => void;
    labelText?: string;
}

export default (props: IDatePickerProps) =>
    <DatePickerContainer>
        {props.labelText ? <label className="col-sm-3 control-label">{props.labelText}</label> : ''}
        <div className="col-sm-9">
            <DatePicker selected={moment(props.date)}
                        onChange={props.onDateChange}
                        className="form-control datepicker"
                        todayButton="Hoy"
                        dateFormat="YYYY-MM-DD"
                        scrollableYearDropdown={true}
                        showYearDropdown={true} />
        </div>
    </DatePickerContainer>