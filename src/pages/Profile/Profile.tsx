import React from "react";
import {NameAvatar, NameAvatarText, ProfileInfoContent, ProfileInfoWrapper, Wrapper} from "./Profile-styled";
import {Card, Statistic} from "antd";
import {
    IdcardOutlined,
    MailOutlined,
    SolutionOutlined,
    TeamOutlined,
    UsergroupAddOutlined,
    UserOutlined
} from "@ant-design/icons";
import {useAuthStore} from "../../context/Auth.context";
import {observer} from "mobx-react-lite";
import {RoleNames} from "../../models/AuthStore/AuthStore.constants";
import {useAvatarName} from "./hooks/useAvatarName";
import {RoleVariant} from "../../models/AuthStore/AuthStore.types";

export const Profile: React.FC = observer(() => {

    const authStore = useAuthStore();

    const avatarName = useAvatarName(authStore?.fio);

    return (
        <Wrapper>
            <NameAvatar>
                <NameAvatarText>
                    {avatarName}
                </NameAvatarText>
            </NameAvatar>
            <ProfileInfoWrapper>
                <ProfileInfoContent>
                    {
                        authStore?.uid && (
                            <Card bordered={false} size={'small'}>
                                <Statistic
                                    title="UID"
                                    valueRender={() => <span>{authStore?.uid}</span>}
                                    prefix={<IdcardOutlined />}
                                />
                            </Card>
                        )
                    }
                    {
                        authStore?.fio && (
                            <Card bordered={false} size={'small'}>
                                <Statistic
                                    title="ФИО"
                                    valueRender={() => <span>{authStore?.fio}</span>}
                                    prefix={<UserOutlined />}
                                />
                            </Card>
                        )
                    }
                    {
                        authStore?.email && (
                            <Card bordered={false} size={'small'}>
                                <Statistic
                                    title="Email"
                                    valueRender={() => <span>{authStore?.email}</span>}
                                    prefix={<MailOutlined />}
                                />
                            </Card>
                        )
                    }
                    {
                        authStore?.role && (
                            <Card bordered={false} size={'small'}>
                                <Statistic
                                    title="Роль"
                                    valueRender={() => <span>{RoleNames[authStore?.role as RoleVariant]}</span>}
                                    prefix={<SolutionOutlined />}
                                />
                            </Card>
                        )
                    }
                    {
                        authStore?.course && (
                            <Card bordered={false} size={'small'}>
                                <Statistic
                                    title="Курс"
                                    valueRender={() => <span>{authStore?.course?.name}</span>}
                                    prefix={<UsergroupAddOutlined />}
                                />
                            </Card>
                        )
                    }
                    {
                        authStore?.group && (
                            <Card bordered={false} size={'small'}>
                                <Statistic
                                    title="Группа"
                                    valueRender={() => <span>{authStore?.group?.name}</span>}
                                    prefix={<TeamOutlined />}
                                />
                            </Card>
                        )
                    }
                </ProfileInfoContent>
            </ProfileInfoWrapper>
        </Wrapper>
    )
})