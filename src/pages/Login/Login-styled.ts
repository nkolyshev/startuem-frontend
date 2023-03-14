import styled from "styled-components";
import {WRAPPERS_HEIGHT} from "../../constants/global.constants";
import FormItem from "antd/es/form/FormItem";
import {Divider, Form} from "antd";
import {screenSize} from "../../constants/screen-size";
import {screenNavigation} from "../../constants/screen-navigation";

export const StyledWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: calc(100vh - ${WRAPPERS_HEIGHT}px);
`

export const StyledContent = styled.div`
    background-color: rgba(255, 255, 255, .06);
    box-shadow: 0 0 40px rgba(0, 0, 0, .1);
    border-radius: 20px;
    padding: 30px 30px 10px 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 400px;
  
    ${screenNavigation.mobile} {
      border-radius: 0;
      box-shadow: none;
      background: none;
      min-width: 0;
      width: 100%;
    }
`
export const FormStyled = styled(Form)`
    width: 100%;
`

export const StyledFormContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
`

export const StyledFormItem = styled(FormItem)`
    padding-bottom: 15px;
    &:last-child {
      padding-bottom: 0;
    }
    width: 100%;
`

export const StyledFormSubmitButton = styled(StyledFormItem)`
    display: flex;
    justify-content: center;
`

export const StyledTitleWrapper = styled.div`
    & > h3 {
      margin: 0 !important;
    }
`

export const StyledDivider = styled(Divider)`
    margin: 15px 15px 30px 15px !important;
`