import styled from "styled-components";
import {NavLink} from "react-router-dom";
import {Colors} from "../../../../../../styles/colors";

export const PageLinkStyled = styled(NavLink)`
    font-size: 18px;
    line-height: 40.85px;
    font-weight: 300;
    color: ${Colors.light};
  
    &.active {
        color: ${Colors.accent};
    }
`