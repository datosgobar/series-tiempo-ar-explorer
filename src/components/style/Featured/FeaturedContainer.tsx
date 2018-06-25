import * as React from 'react';

import Container from '../Common/Container';

export default (props: React.Props<{}>) =>

    <div id="series-destacadas" className="pd-v-xlg">
        <Container>
            {props.children}
        </Container>
    </div>