import {createGlobalStyle} from "styled-components";
import {Colors} from './styles/colors'

export const GlobalStyle = createGlobalStyle`

  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700;1,800&display=swap');

  * {
    font-family: 'Open Sans', sans-serif;
  }
  
  body {
    background-color: ${Colors.background};
  }
  
  
  a {
    text-decoration: none !important;
  }
`