import styled from "styled-components";
import {FOOTER_HEIGHT, WRAPPERS_HEIGHT} from "../../../constants/global.constants";

export const Wrapper = styled.div`
    padding: 30px 30px ${30 + FOOTER_HEIGHT}px 30px;
    min-height: calc(100vh - ${WRAPPERS_HEIGHT}px);
`;

export const FiltersFormWrapper = styled.div`
    margin-bottom: 20px;
    display: flex;
    gap: 20px;
`