import {Badge, Button, Card, Descriptions, Divider, Form, Input, Space, Table} from "antd"
import Column from "antd/es/table/Column";
import {useStudentsStore} from "../Students.context";
import {StudentFullInfo, StudentStatus} from "../../../models/StudentsStore/StudentsStore.types";
import {useCallback, useEffect, useMemo} from "react";
import {DeleteFilled, LeftOutlined, PlusCircleOutlined} from "@ant-design/icons";
import {observer} from "mobx-react-lite";
import {useEventsStore} from "../../../context/Events.context";
import {FormSubmitButtonWrapper, FormWrapper, FormWrapperContainer } from "./StudentsTable-styled";
import {useForm} from "antd/es/form/Form";

export const StudentsTable = observer(() => {

    const studentsStore = useStudentsStore();
    const eventsStore = useEventsStore();

    const [addStudentForm] = useForm();

    const handleDeleteStudentById = useCallback((id: string) => {
        studentsStore?.deleteStudentById(id);
    }, []);

    const handleAddStudent = useCallback((student: StudentFullInfo) => {
        studentsStore?.addStudentToLesson(student.uid);
        addStudentForm.resetFields();
    }, [studentsStore?.addStudentToLesson, addStudentForm]);

    const handleClearStudents = useCallback(() => {
        studentsStore?.clearStudents();
    }, [])

    const studentsTableData: Array<StudentFullInfo & { key: string }> = useMemo(() => {
        return studentsStore?.students ? studentsStore?.students?.map(student => (
            {
                ...student,
                key: student?.uid
            }
        )) : [];
    }, [studentsStore?.students]);

    useEffect(() => {
        studentsStore?.fetchStudentsByGroup(studentsStore?.lesson?.group?.id ?? '');
    }, [studentsStore?.fetchStudentsByGroup, studentsStore?.lesson]);

    useEffect(() => {
        eventsStore?.connectCardListener(studentsStore?.readerUID ?? '');
    }, [eventsStore?.connectCardListener, studentsStore?.readerUID]);

    useEffect(() => {
        eventsStore?.subscribeStudentUIDs((uid) => {
            studentsStore?.addStudentToLesson(uid);
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
                <Column title="UID" dataIndex="uid" key="uid"   />
                <Column title="ФИО" dataIndex="fio" key="fio" />
                <Column
                    key="status"
                    align="right"
                    render={(_, data: StudentFullInfo & { key: string }) => {
                        const isActive = data?.status === StudentStatus.Active;
                        return <Badge status={isActive ? 'success' : 'default'} text={isActive ? 'Присутствует' : 'Отсутствует'} />
                    }}
                />
                <Column
                    key="action"
                    align="right"
                    render={(_, data: StudentFullInfo & { key: string }) => {
                        if (data?.status === StudentStatus.Inactive) {
                            return null;
                        }
                        return (
                            <Space size="small">
                                <Button icon={<DeleteFilled/>} danger={true} type={'primary'} onClick={() => handleDeleteStudentById(data?.uid)}>Удалить студента</Button>
                            </Space>
                        )
                    }}
                />
            </Table>
            <Divider/>
            <FormWrapperContainer>
                <FormWrapper>
                    <Form onFinish={handleAddStudent} form={addStudentForm}>
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