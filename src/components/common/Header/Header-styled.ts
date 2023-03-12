import styled from "styled-components";
import {Colors} from "../../../styles/colors";
import {HEADER_HEIGHT} from "../../../constants/global.constants";

export const Wrapper = styled.header`
    background-color: ${Colors.backgroundAccent};
    min-height: ${HEADER_HEIGHT}px;
    position: sticky;
    top: 0;
    z-index: 10000000;
    width: 100%;
    display: grid;
    grid-template-areas: 'Logo Navigation UserRole ButtonExit';
    grid-template-columns: auto 1fr auto;
    align-items: center;
    padding: 20px;
`

export const LogoWrapper = styled.div`
    grid-area: Logo;
`;

export const NavigationWrapper = styled.div`
    grid-area: Navigation;
`;

export const StyledUserRoleWrapper = styled.div`
    margin-left: 20px;
    grid-area: UserRole;
`;

export const StyledButtonExitWrapper = styled.div`
    margin-left: 20px;
    grid-area: ButtonExit;
`;
