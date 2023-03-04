import styled from "styled-components";
import {Colors} from "../../../styles/colors";
import {HEADER_HEIGHT} from "../../../constants/global.constants";

export const Wrapper = styled.header`
    background-color: ${Colors.backgroundAccent};
    height: ${HEADER_HEIGHT}px;
    position: sticky;
    width: 100%;
    display: grid;
    grid-template-areas: 'Logo Navigation';
    grid-template-columns: auto 1fr;
    align-items: center;
    padding: 20px;
`

export const LogoWrapper = styled.div`
    grid-area: Logo;
`;

export const NavigationWrapper = styled.div`
    grid-area: Navigation;
`;