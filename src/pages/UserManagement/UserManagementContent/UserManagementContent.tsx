import {Button, Divider, Typography} from "antd";
import {FormWrapper} from "../../../components/common/common-styled";
import {UserManagementUidForm} from "../UserManagementUidForm/UserManagementUidForm";
import {useUserManagementStore} from "../../../context/UserManagement.context";
import {useUserManagementTitle} from "../hooks/useUserManagementTitle";
import {observer} from "mobx-react-lite";
import {ManagementMode} from "../../../models/UserManagmentStore/UserManagementStore.types";
import {UserManagementEditForm} from "../UserManagementEditForm/UserManagementEditForm";
import {LeftOutlined} from "@ant-design/icons";
import {useCallback} from "react";

export const UserManagementContent = observer(() => {

    const userManagementStore = useUserManagementStore();
    const title = useUserManagementTitle(userManagementStore?.managementMode);

    const handleBackCheckUID = useCallback(() => {
        userManagementStore?.clearAll();
    }, [userManagementStore?.clearAll]);

    return (
        <FormWrapper>
            <Typography.Title level={3}>
                {title}
            </Typography.Title>
            <Divider/>
            {
                userManagementStore?.managementMode !== ManagementMode.CheckUID && (
                    <>
                        <Button onClick={handleBackCheckUID} icon={<LeftOutlined />} type={'primary'} size={'middle'}>
                            Вернуться к введению UID пользователя
                        </Button>
                        <Divider/>
                    </>
                )
            }
            {
                userManagementStore?.managementMode === ManagementMode.CheckUID ? <UserManagementUidForm/> : <UserManagementEditForm/>
            }
        </FormWrapper>
    )

})