import * as React from 'react';

export default function Hero(props: React.Props<{}>) {

    return (

        <div id="hero">
            <div className="hero-caption">
                <div className="container">
                    {props.children}
                </div>
            </div>
        </div>
    );
}
