import {Button, Card, Descriptions, Divider, Form, Input, Space, Table} from "antd"
import Column from "antd/es/table/Column";
import {useStudentsStore} from "../Students.context";
import {Student} from "../../../models/StudentsStore/StudentsStore.types";
import {useCallback, useEffect, useMemo} from "react";
import {FormSubmitButtonWrapper, FormWrapper, FormWrapperContainer} from "./StudentsTable-styled";
import {DeleteFilled, LeftOutlined, PlusCircleOutlined} from "@ant-design/icons";
import {observer} from "mobx-react-lite";
import {useEventsStore} from "../../../context/Events.context";

export const StudentsTable = observer(() => {

    const studentsStore = useStudentsStore();
    const eventsStore = useEventsStore();

    const handleDeleteStudentById = useCallback((id: string) => {
        studentsStore?.deleteStudentById(id);
    }, []);

    const handleAddStudent = useCallback((student: Student) => {
        studentsStore?.addStudent(student);
    }, []);

    const handleClearStudents = useCallback(() => {
        studentsStore?.clearStudents();
    }, [])

    const studentsTableData: Array<Student & { key: string }> = useMemo(() => {
        return studentsStore?.students ? studentsStore?.students?.map(student => (
            {
                ...student,
                key: student?.uid
            }
        )) : [];
    }, [studentsStore?.students]);

    useEffect(() => {
        console.log('[studentsTableData]', studentsTableData);
    }, [studentsTableData])


    useEffect(() => {
        studentsStore?.fetchStudentsByGroup(studentsStore?.lesson?.group?.id ?? '');
    }, [studentsStore?.fetchStudentsByGroup, studentsStore?.lesson]);

    useEffect(() => {
        eventsStore?.connectCardListener();
    }, [eventsStore?.connectCardListener]);

    useEffect(() => {
        eventsStore?.subscribeStudentUIDs((uid) => {
            console.warn('[UID]', uid);
        })
    }, [eventsStore?.subscribeStudentUIDs])

    return (
        <div>
            <Button onClick={handleClearStudents} icon={<LeftOutlined />} type={'primary'} size={'middle'}>
                Ввести другие данные студентов
            </Button>
            <Divider/>
            <Card>
                <Descriptions title="Информация о студентах">
                    <Descriptions.Item label="Курс">{studentsStore?.lesson?.course?.name}</Descriptions.Item>
                    <Descriptions.Item label="Группа">{studentsStore?.lesson?.group?.name}</Descriptions.Item>
                    <Descriptions.Item label="Предмет">{studentsStore?.lesson?.subject?.name}</Descriptions.Item>
                </Descriptions>
            </Card>
            <Divider/>
            <Table dataSource={studentsTableData} pagination={false}>
                <Column title="UID" dataIndex="uid" key="uid"  />
                <Column title="ФИО" dataIndex="fio" key="fio" />
                <Column
                    key="action"
                    align="right"
                    render={(_, data: Student & { key: string }) => (
                        <Space size="small">
                            <Button icon={<DeleteFilled/>} danger={true} type={'primary'} onClick={() => handleDeleteStudentById(data?.uid)}>Удалить студента</Button>
                        </Space>
                    )}
                />
            </Table>
            <Divider/>
            <FormWrapperContainer>
                <FormWrapper>
                    <Form onFinish={handleAddStudent}>
                        <Form.Item
                            label='UID'
                            name='uid'
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите ID студента!'
                                }
                            ]}
                        >
                            <Input size={'large'}/>
                        </Form.Item>
                        <Form.Item
                            label='ФИО'
                            name='fio'
                            rules={[
                                {
                                    required: true,
                                    message: 'Введите ФИО студента!'
                                }
                            ]}
                        >
                            <Input size={'large'}/>
                        </Form.Item>
                        <Form.Item>
                            <FormSubmitButtonWrapper>
                                <Button type="primary" htmlType="submit" icon={<PlusCircleOutlined />} size={'large'}>
                                    Добавить студента в список
                                </Button>
                            </FormSubmitButtonWrapper>
                        </Form.Item>
                    </Form>
                </FormWrapper>
            </FormWrapperContainer>
        </div>
    )
});