import React, {useCallback} from "react";
import {ContentWrapper, StyledTitle, Wrapper} from "./Home-styled";
import {Button} from "antd";
import {useNavigate} from "react-router-dom";
import {PagePath} from "../../routing/page-path";
import {useAuthStore} from "../../context/Auth.context";
import {RoleNames} from "../../models/AuthStore/AuthStore.constants";
import {RoleVariant} from "../../models/AuthStore/AuthStore.types";

export const Home: React.FC = () => {

    const navigate = useNavigate();
    const authStore = useAuthStore();

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
                    Здравствуйте, {authStore?.fio ? authStore.fio : authStore?.role ? RoleNames[authStore?.role].toLowerCase() : 'Пользователь'}!
                </StyledTitle>
                {
                    authStore?.role === RoleVariant.Teacher && (
                        <Button size={'large'} type={'primary'} onClick={handleOpenForm}>
                            Новая форма занятия
                        </Button>
                    )
                }
            </ContentWrapper>
        </Wrapper>
    )
}