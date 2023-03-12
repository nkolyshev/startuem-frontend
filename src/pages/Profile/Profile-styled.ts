import styled from "styled-components";
import {Colors} from "../../styles/colors";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    bottom: 60px;
`;

export const NameAvatar = styled.div`
    border-radius: 50%;
    width: 150px;
    height: 150px;
    background-color: ${Colors.grayAccent};
    position: relative;
    bottom: -90px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;


export const NameAvatarText = styled.span`
    font-size: 40px;
    font-weight: 700;
    display: block;
    margin-bottom: 7px;
    box-shadow: 0 0 40px rgba(0, 0, 0, .1);
`;

export const ProfileInfoWrapper = styled.div`
    background-color: rgb(255, 255, 255, .8);
    border-radius: 30px;
    min-width: 500px;
    box-shadow: 0 0 40px rgba(0, 0, 0, .1);
`;

export const ProfileInfoContent = styled.div`
    padding: 20px;
    margin-top: 100px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

