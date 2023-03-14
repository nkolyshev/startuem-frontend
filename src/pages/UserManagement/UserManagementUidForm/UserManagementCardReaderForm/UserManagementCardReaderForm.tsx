import {Button, Form, Input} from "antd";
import {useForm} from "antd/es/form/Form";
import {useCallback, useEffect, useState} from "react";
import { CardReaderFormContentWrapper } from "../UserManagementUidForm-styled";
import {observer} from "mobx-react-lite";
import {useUserManagementStore} from "../../../../context/UserManagement.context";
import {useEventsStore} from "../../../../context/Events.context";

export const UserManagementCardReaderForm = observer(() => {

    const [cardReaderForm] = useForm();

    const userManagementStore = useUserManagementStore();
    const eventsStore = useEventsStore();

    const onFinish = useCallback((values: {cardReaderUID: string}) => {
        eventsStore?.connectCardListener(values.cardReaderUID);
        eventsStore?.subscribeStudentUIDs(uid => {
            userManagementStore?.setCurrentUserUID(uid);
        });
    }, [eventsStore?.connectCardListener]);

    return (
        <Form onFinish={onFinish} form={cardReaderForm}>
            <CardReaderFormContentWrapper>
                <Form.Item
                    label='UID считывателя'
                    name='cardReaderUID'
                    rules={[
                        {
                            required: true,
                            message: 'Введите UID считывателя!'
                        }
                    ]}
                >
                    <Input size={'large'} />
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" size={'large'} >
                        Подсоединиться к считывателю
                    </Button>
                </Form.Item>
            </CardReaderFormContentWrapper>
        </Form>
    )

})