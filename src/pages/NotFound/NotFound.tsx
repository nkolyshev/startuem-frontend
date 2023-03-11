import { StyledWrapper } from "./NotFound-styled"
import React, {useCallback} from "react";
import {Button, Result} from "antd";
import {useNavigate} from "react-router-dom";
import {PagePath} from "../../routing/page-path";

export const NotFound = () => {

    const navigate = useNavigate();

    const handleNavigateHome = useCallback(() => {
        navigate(PagePath.home);
    }, [navigate]);

    return (
        <StyledWrapper>
            <Result
                status="404"
                title="404"
                subTitle="Простите, такой страницы не существует"
                extra={<Button type="primary" onClick={handleNavigateHome}>К начальному экрану</Button>}
            />
        </StyledWrapper>
    )

}