import {StyledLogoRole, StyledLogo, StyledLogoWrapper} from "./StyledLogo";
import {PagePath} from "../../../../../routing/page-path";
import {RoleVariant} from "../../../../../models/AuthStore/AuthStore.types";
import React from "react";

interface LogoProps {
    roleName?: string | null;
}

export const Logo: React.FC<LogoProps> = ({roleName}) => {
    return (
        <StyledLogoWrapper to={PagePath.home}>
            <StyledLogo>Cтартуем!</StyledLogo>
            {
                roleName && (
                    <StyledLogoRole>
                        {roleName}
                    </StyledLogoRole>
                )
            }
        </StyledLogoWrapper>
    )
}