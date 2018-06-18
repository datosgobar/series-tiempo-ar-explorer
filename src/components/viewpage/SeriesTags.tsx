import * as React from 'react';

import Tag from '../style/Tag/Tag';
import TagContainer from '../style/Tag/TagContainer';

import { ISerie } from '../../api/Serie';


interface ISeriesTagsProps extends React.Props<any> {

    series: ISerie[];
    onTagClose: (event: React.MouseEvent<HTMLAnchorElement>, serieId: string) => void;
}

export default (props: ISeriesTagsProps) =>

    <div className="col-sm-6">
        <TagContainer>
            {props.series.map(serie => 
            <Tag key={serie.id} pegColor="#045C90" onClose={closeHandler(serie.id, props.onTagClose)}>
                {serie.title}
            </Tag>
            )}
        </TagContainer>
    </div>


function closeHandler(serieId: string, onTagClose: (event: React.MouseEvent<HTMLAnchorElement>, serieId: string) => void): React.MouseEventHandler<HTMLAnchorElement>{
    return (event: React.MouseEvent<HTMLAnchorElement>) => onTagClose(event, serieId)
}