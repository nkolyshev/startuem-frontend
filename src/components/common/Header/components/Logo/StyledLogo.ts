import styled from "styled-components";
import {Colors} from "../../../../../styles/colors";
import {NavLink} from "react-router-dom";

export const StyledLogoWrapper = styled(NavLink)`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const StyledLogo = styled.span`
    text-transform: uppercase;
    font-size: 30px;
    font-weight: 400;
    color: ${Colors.light};
`

export const StyledLogoRole = styled.span`
    text-transform: lowercase;
    font-size: 18px;
    font-weight: 400;
    color: ${Colors.gray};
`