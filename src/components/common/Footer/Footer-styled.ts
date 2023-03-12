import styled from "styled-components";
import {Colors} from "../../../styles/colors";
import {FOOTER_HEIGHT} from "../../../constants/global.constants";
import {Typography} from "antd";

export const Wrapper = styled.footer`
    width: 100%;
    height: ${FOOTER_HEIGHT}px;
    position: fixed;
    bottom: 0;
    background-color: rgba(38, 41, 47, 0.9);
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const StyledInfo = styled(Typography)`
    color: ${Colors.gray} !important;
`;