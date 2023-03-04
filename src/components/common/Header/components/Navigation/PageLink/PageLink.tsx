import {PageName} from "../../../../../../routing/page-name";
import {PageLinkStyled} from "./PageLink-styled";
import {PagePath} from "../../../../../../routing/page-path";

interface PageLinkProps {
    pageName: PageName;
    title: string;
}

export const PageLink = ({pageName, title}: PageLinkProps) => {
    return (
        <PageLinkStyled to={PagePath[pageName]}>
            {title}
        </PageLinkStyled>
    )
}
