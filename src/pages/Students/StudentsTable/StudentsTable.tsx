import {Button, Card, Descriptions, Divider, Form, Input, Space, Table} from "antd"
import Column from "antd/es/table/Column";
import {useStudentsStore} from "../Students.context";
import {Student} from "../../../models/StudentsStore.types";
import {useCallback, useMemo} from "react";
import {FormSubmitButtonWrapper, FormWrapper, FormWrapperContainer} from "./StudentsTable-styled";
import {DeleteFilled, LeftOutlined, PlusCircleOutlined} from "@ant-design/icons";

export const StudentsTable = () => {

    const store = useStudentsStore();

    const handleDeleteStudentById = useCallback((id: string) => {
        store?.deleteStudentById(id);
    }, []);

    const handleAddStudent = useCallback((student: Student) => {
        store?.addStudent(student);
    }, []);

    const handleClearStudents = useCallback(() => {
        store?.clearStudents();
    }, [])

    const studentsTableData: Array<Student & { key: string }> = useMemo(() => {
        return store?.students ? store?.students?.map(student => (
            {
                ...student,
                key: student?.id
            }
        )) : [];
    }, [store?.students])

    return (
        <div>
            <Button onClick={handleClearStudents} icon={<LeftOutlined />} type={'primary'} size={'middle'}>
                Ввести другие данные студентов
            </Button>
            <Divider/>
            <Card>
                <Descriptions title="Информация о студентах">
                    <Descriptions.Item label="Курс">{store?.studentsFormValues?.course}</Descriptions.Item>
                    <Descriptions.Item label="Группа">{store?.studentsFormValues?.group}</Descriptions.Item>
                    <Descriptions.Item label="Предмет">{store?.studentsFormValues?.subject}</Descriptions.Item>
                </Descriptions>
            </Card>
            <Divider/>
            <Table dataSource={studentsTableData} pagination={false}>
                <Column title="ID" dataIndex="id" key="id"  />
                <Column title="ФИО" dataIndex="fullName" key="fio" />
                <Column
                    key="action"
                    align="right"
                    render={(_, data: Student & { key: string }) => (
                        <Space size="small">
                            <Button icon={<DeleteFilled/>} danger={true} type={'primary'} onClick={() => handleDeleteStudentById(data?.id)}>Удалить студента</Button>
                        </Space>
                    )}
                />
            </Table>
            <Divider/>
            <FormWrapperContainer>
                <FormWrapper>
                    <Form onFinish={handleAddStudent}>
                        <Form.Item
                            label='ID'
                            name='id'
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
                            name='fullName'
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
}