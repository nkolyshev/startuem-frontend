import styled from "styled-components";
import {Colors} from "../../../styles/colors";
import Column from "antd/es/table/Column";

export const FormWrapperContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
`

export const FormWrapper = styled.div`
    width: 400px;
`

export const FormSubmitButtonWrapper = styled.div`
    display: flex;
    justify-content: flex-end;
`

export const DescriptionWrapper = styled.div`
    background-color: ${Colors.light};
    padding: 10px;
    border-radius: 10px;
`;


export const StyledTableColumn = styled(Column)`
    background-color: red !important;
`