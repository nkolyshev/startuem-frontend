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

export const Root = observer(() => {

    const authStore = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        console.group('Login data');
        console.log('uid', authStore?.uid);
        console.log('role', authStore?.role);
        console.log('token', authStore?.accessToken);
        console.log('isUserAuth', authStore?.isUserAuth);
        console.log('fio', authStore?.fio);
        console.groupEnd();
    }, [authStore?.isUserAuth, authStore?.uid, authStore?.accessToken, authStore?.isUserAuth, authStore?.role, authStore?.isUserAuth, authStore?.fio]);

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
                <RootRouter/>
            </main>
            <Footer/>
        </div>
    )
})