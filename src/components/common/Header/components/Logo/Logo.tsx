import {LogoStyled} from "./Logo-styled";
import {PagePath} from "../../../../../routing/page-path";

export const Logo = () => {
    return <LogoStyled to={PagePath.home}>Startuem!</LogoStyled>
}