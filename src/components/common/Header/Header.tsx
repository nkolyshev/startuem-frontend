import {StyledButtonExitWrapper, StyledUserRoleWrapper, Wrapper} from "./Header-styled";
import {Logo} from "./components/Logo/Logo";
import {Navigation} from "./components/Navigation/Navigation";
import {Button, Tag} from "antd";
import {useAuthStore} from "../../../context/Auth.context";
import {useCallback, useMemo} from "react";
import {observer} from "mobx-react-lite";
import {RoleNames} from "../../../models/AuthStore/AuthStore.constants";

export const Header = observer(() => {

    const authStore = useAuthStore();

    const handleLogoutUser = useCallback(() => {
        authStore?.logoutUser();
    }, [authStore?.logoutUser])

    return (
        <Wrapper>
            <Logo roleName={authStore?.role && RoleNames[authStore?.role]}/>
            {
                authStore?.isUserAuth && (
                    <Navigation/>
                )
            }
            {
                authStore?.isUserAuth && (
                    <StyledButtonExitWrapper onClick={handleLogoutUser}>
                        <Button size={'large'} danger={true} type={'primary'}>
                            Выйти
                        </Button>
                    </StyledButtonExitWrapper>
                )
            }
        </Wrapper>
    )
});