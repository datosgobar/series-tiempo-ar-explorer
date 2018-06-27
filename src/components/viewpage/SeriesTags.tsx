import * as React from 'react';

import Colors, { Color } from '../style/Colors/Color';
import Tag from '../style/Tag/Tag';
import TagContainer from '../style/Tag/TagContainer';

import { ISerie } from '../../api/Serie';


interface ISeriesTagsProps extends React.Props<any> {

    series: ISerie[];
    onTagClose: (event: React.MouseEvent<HTMLAnchorElement>, serieId: string) => void;
    pegColorFor?: (serie: ISerie) => Color;
}

export default (props: ISeriesTagsProps) =>

    <div className="col-sm-6">
        <TagContainer>
            {props.series.map(serie =>
                <Tag key={serie.id} pegColor={props.pegColorFor ? props.pegColorFor(serie) : Colors.Orange} onClose={closeHandler(serie.id, props.onTagClose)}>
                    {serie.title}
                </Tag>
            )}
        </TagContainer>
    </div>


function closeHandler(serieId: string, onTagClose: (event: React.MouseEvent<HTMLAnchorElement>, serieId: string) => void): React.MouseEventHandler<HTMLAnchorElement> {
    return (event: React.MouseEvent<HTMLAnchorElement>) => onTagClose(event, serieId)
}