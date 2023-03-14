import {Button, Divider, Form, Input} from "antd";
import {useForm} from "antd/es/form/Form";
import {FormEvent, useCallback, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";
import {useUserManagementStore} from "../../../../context/UserManagement.context";

export const UserManagementUserUidForm = observer(() => {

    const userManagementStore = useUserManagementStore();
    const [currentUserUid, setCurrentUserUid] = useState<string | undefined>(undefined);

    const [userUidForm] = useForm<{ userUID: string }>();

    const onFinish = useCallback((values: {userUID: string}) => {
        userManagementStore?.checkUserUID({
            userUID: values.userUID,
        })
    }, [userManagementStore?.checkUserUID]);

    const handleChangeCurrentUserUid = useCallback((event: FormEvent<HTMLInputElement>) => {
        setCurrentUserUid(event.currentTarget.value);
    }, [setCurrentUserUid]);

    useEffect(() => {
        setCurrentUserUid(userManagementStore?.currentUserUID ?? currentUserUid);
    }, [userManagementStore?.currentUserUID, setCurrentUserUid]);

    useEffect(() => {
        userUidForm.setFieldValue('userUID', currentUserUid);
    }, [currentUserUid, userUidForm]);

    return (
        <Form onFinish={onFinish} form={userUidForm}>
            <Form.Item
                label='UID пользователя'
                name='userUID'
                rules={[
                    {
                        required: true,
                        message: 'Введите UID пользователя!'
                    }
                ]}
            >
                <Input size={'large'} value={currentUserUid} onChange={handleChangeCurrentUserUid}/>
            </Form.Item>
            <Divider/>
            <Form.Item>
                <Button type="primary" htmlType="submit" size={'large'}>
                    Редактировать пользователя
                </Button>
            </Form.Item>
        </Form>
    )

})