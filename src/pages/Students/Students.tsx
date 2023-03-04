import React from "react";
import {Wrapper} from "./Students-styled";
import {StudentsFormCreateContainer} from "./StudentsFormCreate/StudentsFormCreateContainer";

export const Students: React.FC = () => {
    return (
        <Wrapper>
            <StudentsFormCreateContainer/>
        </Wrapper>
    )
}