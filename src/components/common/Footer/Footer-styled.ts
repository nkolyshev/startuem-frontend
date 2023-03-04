import styled from "styled-components";
import {Colors} from "../../../styles/colors";
import {FOOTER_HEIGHT} from "../../../constants/global.constants";

export const Wrapper = styled.footer`
    width: 100%;
    height: ${FOOTER_HEIGHT}px;
    position: fixed;
    bottom: 0;
    background-color: ${Colors.backgroundAccent};
    left: 0;
    right: 0;
`;