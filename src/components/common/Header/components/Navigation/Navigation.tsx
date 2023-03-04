import {Wrapper} from "./Navigation-styled";
import {PageLink} from "./PageLink/PageLink";
import {PageName} from "../../../../../routing/page-name";

export const Navigation = () => {
    return (
        <Wrapper>
            <PageLink pageName={PageName.Profile} title={'Профиль'}/>
            <PageLink pageName={PageName.Schedule} title={'Расписание'}/>
        </Wrapper>
    );
}