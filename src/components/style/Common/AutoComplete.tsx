import * as AutoComplete from 'react-autocomplete';

import * as React from 'react';

const handleFocus = (event: React.FocusEvent<HTMLInputElement>) => {
    event.preventDefault();
};

export default (props: AutoComplete.Props) =>

    <AutoComplete inputProps={{ className: "form-control",
                                onFocus: (handleFocus) }}
                  wrapperStyle={{}}
                  {...props} />
