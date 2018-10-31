import * as React from 'react';

import {connect} from "react-redux";
import {Color, NaC} from '../style/Colors/Color';
import Tag from '../style/Tag/Tag';


export interface ISerieTag {
    id: string;
    title: string;
}

interface ISeriesTagsProps extends React.Props<any> {
    onTagClose: (event: React.MouseEvent<HTMLButtonElement>, serieId: string) => void;
    pegColorFor?: (serieId: string) => Color;
    serieTags: ISerieTag[];
}

function seriesTags(props: ISeriesTagsProps, state: any) {
    return (
        <span>
            {props.serieTags.map((serieTag: ISerieTag, index: number) =>
                <Tag key={index} pegColor={props.pegColorFor ? props.pegColorFor(serieTag.id) : NaC} onClose={getOnCloseFor(props.serieTags, serieTag.id, props.onTagClose)}>
                    {serieTag.title}
                </Tag>
            )}
        </span>
    )
}

function mapStateToProps(state: any, ownProps: any) {
    return {
        serieTags: state.serieTags,
    };
}

function getOnCloseFor(serieTags: ISerieTag[], serieId: string, onTagClose: (event: React.MouseEvent<HTMLButtonElement>, serieId: string) => void) {
    let fn;
    if (serieTags.length > 1) { // this is to prevent show a 'close btn' with just one serie tag
        fn = (event: React.MouseEvent<HTMLButtonElement>) => onTagClose(event, serieId)
    }

    return fn;
}

export default connect(mapStateToProps)(seriesTags);
