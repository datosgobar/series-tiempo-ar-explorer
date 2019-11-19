import * as React from 'react';
import { connect } from "react-redux";
import { ISerie } from '../../api/Serie';
import Tag from '../style/Tag/Tag';
import { getSerieColor } from '../style/Colors/Color';
import { getFullSerieId } from "../../helpers/common/fullSerieID";


export interface ISerieTag {
    id: string;
    title: string;
    representationMode: string;
}

interface ISeriesTagsProps extends React.Props<any> {
    onTagClose: (serieId: string) => void;
    serieTags: ISerieTag[];
    series: ISerie[];
}

function seriesTags(props: ISeriesTagsProps, state: any) {
    return (
        <span>
            {props.serieTags.map((serieTag: ISerieTag, index: number) => {
                const fullSerieID = getFullSerieId(serieTag);
                return(
                <Tag key={index} 
                     pegColor={getSerieColor(props.series, fullSerieID)} 
                     onClose={getOnCloseFor(props.serieTags, fullSerieID, props.onTagClose)}>
                    {serieTag.title}
                </Tag>
                );
            }
            )}
        </span>
    )
}

function mapStateToProps(state: any) {
    return {
        serieTags: state.serieTags,
        series: state.viewSeries
    };
}

function getOnCloseFor(serieTags: ISerieTag[], serieId: string, onTagClose: (serieId: string) => void) {
    let fn;
    if (serieTags.length > 1) { // this is to prevent show a 'close btn' with only one serie tag
        fn = () => onTagClose(serieId)
    }

    return fn;
}

export default connect(mapStateToProps)(seriesTags);
