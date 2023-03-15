import styled from "styled-components";
import {WRAPPERS_HEIGHT} from "../../constants/global.constants";

export const SpinnerWrapper = styled.div`
  min-height: calc(100vh - ${WRAPPERS_HEIGHT}px);
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`