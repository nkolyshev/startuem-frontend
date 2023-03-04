import React, {useCallback} from "react";
import {Wrapper, ContentWrapper, StyledTitle} from "./Home-styled";
import {Button} from "antd";
import {useNavigate} from "react-router-dom";
import {PagePath} from "../../routing/page-path";

export const Home: React.FC = () => {

    const navigate = useNavigate();

    const handleOpenForm = useCallback(() => {
        navigate(PagePath.students);
    }, [navigate])

    return (
        <Wrapper>
            <ContentWrapper>
                <StyledTitle level={3}>
                    Ваш журнал
                </StyledTitle>
                <StyledTitle level={2}>
                    Здравствуйте, преподаватель!
                </StyledTitle>
                <Button size={'large'} type={'primary'} onClick={handleOpenForm}>
                    Новая форма
                </Button>
            </ContentWrapper>
        </Wrapper>
    )
}