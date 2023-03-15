import {Header} from "../common/Header/Header";
import {RootRouter} from "../../routing/RootRouter";
import {Footer} from "../common/Footer/Footer";
import React, {useEffect} from "react";
import {useAuthStore} from "../../context/Auth.context";
import {observer} from "mobx-react-lite";
import {useNavigate} from "react-router-dom";
import {PagePath} from "../../routing/page-path";
import fetchIntercept from 'fetch-intercept';
import {HttpStatusCode} from "axios";
import {Spin} from "antd";
import {SpinnerWrapper} from "./Root-styled";

export const Root = observer(() => {

    const authStore = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (!authStore?.isUserAuth && authStore?.isAccessTokenChecked && authStore?.isRefreshTokenChecked) {
            navigate(PagePath.login);
        }
        else if (!authStore?.isUserAuth && !authStore?.isAccessTokenChecked && !authStore?.isRefreshTokenChecked) {
            authStore?.validateAccessToken();
        }
        else if (!authStore?.isUserAuth && authStore?.isAccessTokenChecked && !authStore?.isRefreshTokenChecked) {
            authStore?.validateRefreshToken();
        }
    }, [authStore?.isUserAuth, authStore?.isAccessTokenChecked, authStore?.isRefreshTokenChecked, navigate]);

    useEffect(() => {
        return fetchIntercept.register({
            response(interceptedResponse) {
                if (interceptedResponse.status === HttpStatusCode.Unauthorized) {
                    authStore?.setIsUserAuth(false);
                }
                if (interceptedResponse.status === HttpStatusCode.Forbidden) {
                    navigate(PagePath.forbidden);
                }
                return interceptedResponse;
            },
        });
    }, [authStore?.setIsUserAuth, fetchIntercept]);

    return (
        <div>
            <Header/>
            <main>
                {
                    (authStore?.isAccessTokenLoading || authStore?.isRefreshTokenLoading) ? (
                        <SpinnerWrapper>
                            <Spin tip="Загрузка" size="large"/>
                        </SpinnerWrapper>
                    ) : <RootRouter/>
                }
            </main>
            <Footer/>
        </div>
    )
})