import styled from "styled-components";
import {WRAPPERS_HEIGHT} from "../../constants/global.constants";

export const Wrapper = styled.div`
    padding: 30px;
    height: calc(100vh - ${WRAPPERS_HEIGHT}px);
`;