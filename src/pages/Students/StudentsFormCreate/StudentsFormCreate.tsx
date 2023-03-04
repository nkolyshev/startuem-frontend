import {Button, Form, Select} from "antd";
import {useEffect, useMemo} from "react";
import {observer} from "mobx-react-lite";
import {useStore} from "./StudentsFormCreate.context";
import {toJS} from "mobx";
import {Course} from "../../../models/StudentsStore.types";
import {StudentsFormValues} from "../../../models/StudentsStore";

export const StudentsFormCreate = observer(() => {

    const store = useStore();

    const onFinish = (values: StudentsFormValues) => {
        store?.submitStudentsForm(values);
    }

    const [form] = Form.useForm();

    const course: Course = Form.useWatch('course', form);
    const group: Course = Form.useWatch('group', form);


    useEffect(() => {
        console.log('Курсы', toJS(store?.courses));
        console.log('Группы', toJS(store?.groups));
    }, [store?.courses, store?.groups]);

    useEffect(() => {
        store?.fetchCourses();
    }, [store]);


    useEffect(() => {
        store?.fetchCourses();
    }, [store]);

    const isGroupsSelectDisabled = useMemo(() => {
        return !store?.courses || store?.courses?.length === 0 || !course;
    }, [store?.courses, course]);

    const isSubjectsSelectDisabled = useMemo(() => {
        return !store?.groups || store?.groups?.length === 0 || !group;
    }, [store?.groups, group]);

    useEffect(() => {
        if (!isGroupsSelectDisabled) store?.fetchGroups(course.id);
    }, [store, isGroupsSelectDisabled, course]);

    useEffect(() => {
        if (!isSubjectsSelectDisabled) store?.fetchSubjects(group.id);
    }, [store, group, isSubjectsSelectDisabled]);

    return (
        <Form onFinish={onFinish} form={form}>
            <Form.Item
                label='Курс'
                name='course'
                rules={[
                    {
                        required: true,
                        message: 'Введите курс!'
                    }
                ]}
            >
                <Select options={store?.courses ?? []}/>
            </Form.Item>
            <Form.Item
                label='Группа'
                name='group'
                rules={[
                    {
                        required: true,
                        message: 'Введите группу!'
                    }
                ]}
            >
                <Select options={store?.groups ?? []} disabled={isGroupsSelectDisabled}/>
            </Form.Item>
            <Form.Item
                label='Предмет'
                name='subject'
                rules={[
                    {
                        required: true,
                        message: 'Введите предмет!'
                    }
                ]}
            >
                <Select options={store?.subjects ?? []} disabled={isSubjectsSelectDisabled}/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
            </Form.Item>
        </Form>
    )
})