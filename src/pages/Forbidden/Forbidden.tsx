import { StyledWrapper } from "./Forbidden-styled";
import React, {useCallback} from "react";
import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";
import {PagePath} from "../../routing/page-path";

export const Forbidden = () => {

    const navigate = useNavigate();

    const handleNavigateHome = useCallback(() => {
        navigate(PagePath.home);
    }, [navigate]);

    return (
        <StyledWrapper>
            <Result
                status="403"
                title="403"
                subTitle="Простите, у Вас нет доступа к этой странице"
                extra={<Button type="primary" onClick={handleNavigateHome}>К начальному экрану</Button>}
            />
        </StyledWrapper>
    )

}