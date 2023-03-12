import {Wrapper} from "./Navigation-styled";
import {PageLink} from "./PageLink/PageLink";
import {PageName} from "../../../../../routing/page-name";
import {useAuthStore} from "../../../../../context/Auth.context";
import {RoleVariant} from "../../../../../models/AuthStore/AuthStore.types";

export const Navigation = () => {

    const authStore = useAuthStore();

    const role = authStore?.role;

    return (
        <Wrapper>
            {
                role === RoleVariant.Student && (
                    <PageLink pageName={PageName.Attendance} title={'Посещаемость'}/>
                )
            }
            <PageLink pageName={PageName.Profile} title={'Профиль'}/>
        </Wrapper>
    );
}