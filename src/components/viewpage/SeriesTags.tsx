import * as React from 'react';

import {connect} from "react-redux";
import {ISerie} from '../../api/Serie';
import {Color, NaC} from '../style/Colors/Color';
import Tag from '../style/Tag/Tag';
import TagContainer from '../style/Tag/TagContainer';
import {valuesFromObject} from "./graphic/Graphic";


interface ISeriesTagsProps extends React.Props<any> {

    series: ISerie[];
    onTagClose: (event: React.MouseEvent<HTMLButtonElement>, serieId: string) => void;
    pegColorFor?: (serie: ISerie) => Color;
    tagNames: string[];
}

class SeriesTags extends React.Component<ISeriesTagsProps, any> {
    public constructor(props: ISeriesTagsProps) {
        super(props)
    }

    public render() {
        return (
            <div className="col-xs-8 col-sm-10">
                <TagContainer>
                    {valuesFromObject(this.props.tagNames).map((tagName:string, index:number) =>
                        <Tag key={index}
                             pegColor={NaC}
                             onClose={getOnCloseFor(this.props.series, tagName, this.props.onTagClose)}>
                            {tagName}
                        </Tag>
                    )}
                </TagContainer>
            </div>
        )
    }
}

function mapStateToProps(state: any, ownProps: any) {
    return {
        tagNames: state.tagNames,
    };
}

export default connect(mapStateToProps)(SeriesTags as any);


function closeHandler(serieId: string, onTagClose: (event: React.MouseEvent<HTMLButtonElement>, serieId: string) => void): React.MouseEventHandler<HTMLButtonElement> {
    return (event: React.MouseEvent<HTMLButtonElement>) => onTagClose(event, serieId)
}

function getOnCloseFor(series: ISerie[], serieId: string, onTanClose: (event: React.MouseEvent<HTMLButtonElement>, serieId: string) => void) {
    let fn;
    if (series.length > 1) {
        fn = closeHandler(serieId, onTanClose);
    }

    return fn;
}