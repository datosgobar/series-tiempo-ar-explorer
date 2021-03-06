import * as React from 'react';

import TrashCanIcon from '../../style/Common/TrashCanIcon';
import Action from './Action';

export default (props: React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>) =>

    <Action {...props}>
        <TrashCanIcon />
        Eliminar serie
    </Action>
