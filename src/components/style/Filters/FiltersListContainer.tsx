import * as React from 'react';
import Container from '../Common/Container';
import Row from '../Common/Row';


export default (props: any) =>
    <div id="listado-list">
        <Container>
            <Row {...props} />
        </Container>
    </div>
