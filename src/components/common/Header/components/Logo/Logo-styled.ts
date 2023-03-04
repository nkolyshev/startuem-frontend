import styled from "styled-components";
import {Colors} from "../../../../../styles/colors";
import {NavLink} from "react-router-dom";

export const LogoStyled = styled(NavLink)`
    text-transform: uppercase;
    font-size: 30px;
    font-weight: 400;
    color: ${Colors.light};
`