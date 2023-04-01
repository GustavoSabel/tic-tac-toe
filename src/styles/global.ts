import { createGlobalStyle } from "styled-components"
import { styleColors } from "./styleColors"

export default createGlobalStyle`
  *{
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    font-family: 'Open Sans', sans-serif; 
  }
  body, html {
    height: 100%;
  }
  #root {
    height: 100%;
    height: 100vh;
    margin:0 auto;
    background-color: ${styleColors.background};
  }
`