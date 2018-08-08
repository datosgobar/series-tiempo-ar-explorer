import * as React from "react";
import {ISerie} from "../../api/Serie";
import ShareContainer from "../style/Share/ShareContainer";
import SocialNetworkShareContainer from "../style/Share/SocialNetworkShareContainer";
import ShareDropdown from "./share/ShareDropdown";
import {TwitterShare} from "./share/TwitterShare";

export interface IShareProps {
    url: string;
    series: ISerie[]
}

export class Share extends React.Component<IShareProps, any> {

    public render() {
        return (
            <ShareContainer>
                <ShareDropdown url={this.props.url} />
                <SocialNetworkShareContainer>
                    <TwitterShare series={this.props.series} />
                    {/*<FacebookShare />*/}
                </SocialNetworkShareContainer>
            </ShareContainer>
        )
    }

}