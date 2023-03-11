import styled from "styled-components";
import {WRAPPERS_HEIGHT} from "../../constants/global.constants";

export const StyledWrapper = styled.div`
  min-height: calc(100vh - ${WRAPPERS_HEIGHT}px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`