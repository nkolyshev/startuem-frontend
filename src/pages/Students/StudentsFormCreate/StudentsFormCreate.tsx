import {Button, Divider, Form, Input, Select} from "antd";
import {useCallback, useEffect, useMemo} from "react";
import {observer} from "mobx-react-lite";
import {useStudentsStore} from "../Students.context";
import {StudentsFormValues} from "../../../models/StudentsStore/StudentsStore";
import {useAuthStore} from "../../../context/Auth.context";

export const StudentsFormCreate = observer(() => {

    const studentsStore = useStudentsStore();
    const authStore = useAuthStore();


    const onFinish = useCallback((values: StudentsFormValues) => {
        studentsStore?.createLesson({
            teacherUID: authStore?.uid ?? '',
            groupId: values.group,
            courseId: values.course,
            subjectId: values.subject,
            readerUID: values.readerUID,
        });
    }, [authStore?.uid]);

    const [form] = Form.useForm();

    const courseId: string = Form.useWatch('course', form);
    const groupId: string = Form.useWatch('group', form);

    useEffect(() => {
        studentsStore?.fetchCourses();
    }, [studentsStore]);

    const isGroupsSelectDisabled = useMemo(() => {
        return !studentsStore?.courses || studentsStore?.courses?.length === 0 || !courseId;
    }, [studentsStore?.courses, courseId]);

    const isSubjectsSelectDisabled = useMemo(() => {
        return !studentsStore?.groups || studentsStore?.groups?.length === 0 || !courseId;
    }, [studentsStore?.groups, courseId]);

    useEffect(() => {
        if (!isGroupsSelectDisabled) {
            studentsStore?.fetchGroups(courseId);
        }
    }, [studentsStore, isGroupsSelectDisabled, courseId]);

    useEffect(() => {
        if (!isSubjectsSelectDisabled) {
            studentsStore?.fetchSubjects(groupId);
        }
    }, [studentsStore, groupId, isSubjectsSelectDisabled]);

    const coursesSelectValues = useMemo(() => {
        if (!studentsStore?.courses) return [];
        return studentsStore?.courses?.map(course => {
            return (
                <Select.Option key={course.id} value={course.id}>
                    {course.name}
                </Select.Option>
            );
        })
    }, [studentsStore?.courses]);

    const groupsSelectValues = useMemo(() => {
        if (!studentsStore?.groups) return [];
        return studentsStore?.groups?.map(group => {
            return (
                <Select.Option key={group.id} value={group.id}>
                    {group.name}
                </Select.Option>
            );
        })
    }, [studentsStore?.groups]);

    const subjectsSelectValues = useMemo(() => {
        if (!studentsStore?.subjects) return [];
        return studentsStore?.subjects?.map(subject => {
            return (
                <Select.Option key={subject.id} value={subject.id}>
                    {subject.name}
                </Select.Option>
            );
        })
    }, [studentsStore?.subjects]);

    useEffect(() => {
        if (courseId) {
            form.resetFields(['group', 'subject']);
        }
    }, [courseId]);

    useEffect(() => {
        if (groupId) {
            form.resetFields(['subject']);
        }
    }, [groupId]);
    return (
        <Form onFinish={onFinish} form={form}>
            <Form.Item
                label='UID считывателя'
                name='readerUID'
                rules={[
                    {
                        required: true,
                        message: 'Введите UID считывателя!'
                    }
                ]}
            >
                <Input size={'large'}/>
            </Form.Item>
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
                <Select size={'large'}>
                    {coursesSelectValues}
                </Select>
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
                <Select disabled={isGroupsSelectDisabled} size={'large'}>
                    {groupsSelectValues}
                </Select>
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
                <Select disabled={isSubjectsSelectDisabled} size={'large'}>
                    {subjectsSelectValues}
                </Select>
            </Form.Item>
            <Divider/>
            <Form.Item>
                <Button type="primary" htmlType="submit" size={'large'}>
                    Показать студентов
                </Button>
            </Form.Item>
        </Form>
    )
})