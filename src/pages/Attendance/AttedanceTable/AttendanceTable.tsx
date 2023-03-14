import {FiltersFormWrapper, Wrapper} from "./Attendance-styled";
import {DatePicker, Divider, Form, Select, Table, Typography,} from "antd";
import Column from "antd/es/table/Column";
import {RangePickerProps} from "antd/es/date-picker";
import {observer} from "mobx-react-lite";
import {useAttendanceStore} from "../../../context/Attendance.context";
import {useCallback, useEffect, useMemo, useState} from "react";
import {useAuthStore} from "../../../context/Auth.context";

export const AttendanceTable = observer(() => {

    const attendanceStore = useAttendanceStore();
    const authStore = useAuthStore();

    const [dates, setDates] = useState<[string | null, string | null]>([null, null]);
    const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);

    const onDateRangeConfirmed = (value: RangePickerProps['value']) => {
        let [dateStart, dateEnd] = ['', ''];
        if (value?.[0]) {
            dateStart = value?.[0]?.toDate()?.toISOString();
        }
        if (value?.[1]) {
            dateEnd = value?.[1]?.toDate()?.toISOString();
        }
        setDates([dateStart, dateEnd]);
    };

    const lessonsTableData: Array<{ key: string; subject: string; teacher: string; date: string }> = useMemo(() => {
        return attendanceStore?.lessonsWithDate ? attendanceStore?.lessonsWithDate?.map(lesson => (
            {
                ...lesson,
                subject: lesson?.subject?.name ?? 'Неизвестно',
                teacher: lesson?.teacher?.fio ?? 'Неизвестно',
                key: lesson?.id
            }
        )) : [];
    }, [attendanceStore?.lessonsWithDate]);

    const subjectsSelectValues = useMemo(() => {
        if (!attendanceStore?.subjects) return [];
        return attendanceStore?.subjects?.map(subject => {
            return (
                <Select.Option key={subject.id} value={subject.id}>
                    {subject.name}
                </Select.Option>
            );
        })
    }, [attendanceStore?.subjects]);

    const handleSubjectSelect = useCallback((id: string) => {
        setSelectedSubjectId(id);
    }, [setSelectedSubjectId]);

    useEffect(() => {
        attendanceStore?.fetchSubjects(authStore?.group?.id ?? '');
    }, [attendanceStore?.getAllLessonsWithFilters]);

    useEffect(() => {
        attendanceStore?.getAllLessonsWithFilters({
            studentUID: authStore?.uid ?? '',
            ...(dates?.[0] ? {dateStart: dates?.[0]} : {}),
            ...(dates?.[1] ? {dateEnd: dates?.[1]} : {}),
            ...(selectedSubjectId ? {subjectId: selectedSubjectId} : {}),
        });
    }, [dates, selectedSubjectId]);

    return (
        <Wrapper>
            <Typography.Title level={3}>
                Посещенные занятия
            </Typography.Title>
            <Divider/>
            <FiltersFormWrapper>
                <DatePicker.RangePicker
                    showTime={{ format: 'HH:mm' }}
                    format="YYYY-MM-DD HH:mm"
                    placeholder={['Искать с...', 'По...']}
                    onOk={onDateRangeConfirmed}
                    size={'large'}
                    allowEmpty={[true, true]}
                />
                <Select size={'large'} placeholder={'Предмет...'} onSelect={handleSubjectSelect}>
                    {subjectsSelectValues}
                </Select>
            </FiltersFormWrapper>
            <Table pagination={false} dataSource={lessonsTableData}>
                <Column title="Предмет" dataIndex="subject" key="subject"   />
                <Column title="Преподаватель" dataIndex="teacher" key="teacher" />
                <Column title="Время" dataIndex="date" key="date" />
            </Table>
        </Wrapper>
    )
})