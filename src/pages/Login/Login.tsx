import {LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import {Button, Input, Typography} from "antd";
import {
    FormStyled,
    StyledContent,
    StyledDivider,
    StyledFormContent,
    StyledFormItem, StyledFormSubmitButton,
    StyledTitleWrapper,
    StyledWrapper
} from "./Login-styled";
import {useAuthStore} from "../../context/Auth.context";
import {LoginPayload} from "../../models/AuthStore/AuthStore.types";
import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import {PagePath} from "../../routing/page-path";
import {useNavigate} from "react-router-dom";

export const Login = observer(() => {

    const authStore = useAuthStore();
    const navigate = useNavigate();

    const [form] = FormStyled.useForm<LoginPayload>();
    const handleFormSubmit = (values: any) => {
        console.log('Received values of form: ', values);
        authStore?.loginUser(values);
    };

    useEffect(() => {
        if (authStore?.isUserAuth) {
            navigate(PagePath.home);
        }
    }, [authStore?.isUserAuth, navigate]);

    return (
        <StyledWrapper>
            <StyledContent>
                <StyledTitleWrapper>
                    <Typography.Title level={3}>
                        Вход
                    </Typography.Title>
                </StyledTitleWrapper>
                <StyledDivider/>
                <FormStyled
                    onFinish={handleFormSubmit}
                    form={form}
                >
                    <StyledFormContent>
                        <StyledFormItem
                            name="email"
                            rules={[{ required: true, message: 'Пожалуйста, введите email!' }]}
                        >
                            <Input size={'large'} prefix={<MailOutlined />} type="email" placeholder="Email" />
                        </StyledFormItem>
                        <StyledFormItem
                            name="password"
                            rules={[{ required: true, message: 'Пожалуйста, введите пароль!' }]}
                        >
                            <Input
                                size={'large'}
                                prefix={<LockOutlined />}
                                type="password"
                                placeholder="Пароль"
                            />
                        </StyledFormItem>
                        <StyledFormSubmitButton>
                            <Button size={'large'} type="primary" htmlType="submit">
                                Войти
                            </Button>
                        </StyledFormSubmitButton>
                    </StyledFormContent>
                </FormStyled>
            </StyledContent>
        </StyledWrapper>
    )
})