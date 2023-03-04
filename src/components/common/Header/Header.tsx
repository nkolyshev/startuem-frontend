import {Wrapper} from "./Header-styled";
import {Logo} from "./components/Logo/Logo";
import {Navigation} from "./components/Navigation/Navigation";

export const Header = () => {
    return (
        <Wrapper>
            <Logo/>
            <Navigation/>
        </Wrapper>
    )
}