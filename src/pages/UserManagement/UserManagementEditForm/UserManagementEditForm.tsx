import {Button, Divider, Form, Input, Select} from "antd";
import {PASSWORD_VALIDATE_ERROR} from "../UserManagement.constants";
import {PasswordInput} from "antd-password-input-strength";
import {useForm} from "antd/es/form/Form";
import {useCallback, useEffect, useMemo, useState} from "react";
import {RoleVariant} from "../../../models/AuthStore/AuthStore.types";
import {RoleNames} from "../../../models/AuthStore/AuthStore.constants";
import {observer} from "mobx-react-lite";
import {useUserManagementStore} from "../../../context/UserManagement.context";
import {useEditUserFormSubmitText} from "../hooks/useEditUserFormSubmitText";
import {ManagementMode} from "../../../models/UserManagmentStore/UserManagementStore.types";
import {EditUserPayload} from "../../../api/services/UsersService/UsersService.types";

export const UserManagementEditForm = observer(() => {

    const userManagementStore = useUserManagementStore();

    const [passwordLevel, setPasswordLevel] = useState(0)

    const [form] = useForm();

    const roleFormValue: string = Form.useWatch('role', form);

    const onFinish = useCallback((values: EditUserPayload) => {
        userManagementStore?.editUser(values);
    }, [userManagementStore?.editUser]);

    const submitButtonText = useEditUserFormSubmitText(userManagementStore?.managementMode);

    const courseId: string = Form.useWatch('courseId', form);

    useEffect(() => {
        userManagementStore?.fetchCourses();
    }, [userManagementStore]);

    const isGroupsSelectDisabled = useMemo(() => {
        return !userManagementStore?.courses || userManagementStore?.courses?.length === 0 || !courseId;
    }, [userManagementStore?.courses, courseId]);

    useEffect(() => {
        if (!isGroupsSelectDisabled) {
            userManagementStore?.fetchGroups(courseId);
        }
    }, [userManagementStore, isGroupsSelectDisabled, courseId]);

    const coursesSelectValues = useMemo(() => {
        if (!userManagementStore?.courses) return [];
        return userManagementStore?.courses?.map(course => {
            return (
                <Select.Option key={course.id} value={course.id}>
                    {course.name}
                </Select.Option>
            );
        })
    }, [userManagementStore?.courses]);

    const groupsSelectValues = useMemo(() => {
        if (!userManagementStore?.groups) return [];
        return userManagementStore?.groups?.map(group => {
            return (
                <Select.Option key={group.id} value={group.id}>
                    {group.name}
                </Select.Option>
            );
        })
    }, [userManagementStore?.groups]);

    const formInitialValues: EditUserPayload = useMemo(() => {
        return {
            uid: userManagementStore?.userUID ?? null,
            fio: userManagementStore?.userInfo?.fio ?? null,
            email: userManagementStore?.userInfo?.email ?? null,
            role: userManagementStore?.userInfo?.role ?? null,
            password: null,
            courseId: userManagementStore?.userInfo?.course?.id ?? null,
            groupId: userManagementStore?.userInfo?.group?.id ?? null,
        }
    }, [userManagementStore?.userInfo, userManagementStore?.userUID]);

    return (
        <Form onFinish={onFinish} form={form} initialValues={formInitialValues}>
            <Form.Item
                label='UID'
                name='uid'
                rules={[
                    {
                        required: userManagementStore?.managementMode === ManagementMode.CreateUser,
                        message: 'Введите uid!'
                    }
                ]}
            >
                <Input defaultValue={userManagementStore?.userUID ?? ''} size={'large'} />
            </Form.Item>
            <Form.Item
                label='ФИО'
                name='fio'
                rules={[
                    {
                        required: userManagementStore?.managementMode === ManagementMode.CreateUser,
                        message: 'Введите ФИО!'
                    }
                ]}
            >
                <Input defaultValue={userManagementStore?.userInfo?.fio ?? ''} size={'large'} />
            </Form.Item>
            <Form.Item
                label='Email'
                name='email'
                rules={[
                    {
                        required: userManagementStore?.managementMode === ManagementMode.CreateUser,
                        message: 'Введите Email!'
                    }
                ]}
            >
                <Input defaultValue={userManagementStore?.userInfo?.email ?? ''} size={'large'} />
            </Form.Item>
            <Form.Item
                label='Пароль'
                name='password'
                rules={[
                    {
                        required: userManagementStore?.managementMode === ManagementMode.CreateUser,
                        message: 'Введите пароль!'
                    },
                    {
                        validator: async (_, value) => {
                            return passwordLevel >= 1 || !value ? Promise.resolve() : Promise.reject(PASSWORD_VALIDATE_ERROR);
                        },
                        message: PASSWORD_VALIDATE_ERROR
                    }
                ]}
            >
                <PasswordInput size={'large'} onLevelChange={setPasswordLevel} autoComplete={'new-password'}/>
            </Form.Item>
            <Form.Item
                label='Роль'
                name='role'
                rules={[
                    {
                        required: userManagementStore?.managementMode === ManagementMode.CreateUser,
                        message: 'Введите роль!'
                    }
                ]}
            >
                <Select size={'large'}>
                    <Select.Option value={RoleVariant.Student}>
                        {RoleNames[RoleVariant.Student]}
                    </Select.Option>
                    <Select.Option value={RoleVariant.Teacher}>
                        {RoleNames[RoleVariant.Teacher]}
                    </Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
                label='Курс'
                name='courseId'
                rules={[
                    {
                        required: userManagementStore?.managementMode === ManagementMode.CreateUser,
                        message: 'Введите курс!'
                    }
                ]}
            >
                <Select size={'large'} disabled={roleFormValue === RoleVariant.Teacher}>
                    {coursesSelectValues}
                </Select>
            </Form.Item>
            <Form.Item
                label='Группа'
                name='groupId'
                rules={[
                    {
                        required: userManagementStore?.managementMode === ManagementMode.CreateUser,
                        message: 'Введите группу!'
                    }
                ]}
            >
                <Select disabled={isGroupsSelectDisabled || roleFormValue === RoleVariant.Teacher} size={'large'}>
                    {groupsSelectValues}
                </Select>
            </Form.Item>
            <Divider/>
            <Form.Item>
                <Button type="primary" htmlType="submit" size={'large'}>
                    {submitButtonText}
                </Button>
            </Form.Item>
        </Form>
    )

})