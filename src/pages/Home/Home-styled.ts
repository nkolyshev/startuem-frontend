import styled from "styled-components";
import {WRAPPERS_HEIGHT} from "../../constants/global.constants";
import {Typography} from "antd";

export const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: calc(100vh - ${WRAPPERS_HEIGHT}px);
`;


export const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
`;

export const StyledTitle = styled(Typography.Title)`
    &.css-dev-only-do-not-override-10ed4xt {
      margin: 0 !important;
    }
`