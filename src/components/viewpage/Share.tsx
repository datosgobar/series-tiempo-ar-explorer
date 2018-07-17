import * as React from "react";
import {ISerie} from "../../api/Serie";
import ShareContainer from "../style/Share/ShareContainer";
import SocialNetworkShareContainer from "../style/Share/SocialNetworkShareContainer";
import {LinkShare} from "./share/LinkShare";
import {TwitterShare} from "./share/TwitterShare";

export interface IShareProps {
    url: string;
    series: ISerie[]
}

export class Share extends React.Component<IShareProps, any> {

    public render() {
        return (
            <ShareContainer>
                <SocialNetworkShareContainer>
                    <TwitterShare series={this.props.series} />&nbsp;
                    {/*<FacebookShare />*/}
                </SocialNetworkShareContainer>
                <LinkShare url={window.location.href} />
            </ShareContainer>
        )
    }

}