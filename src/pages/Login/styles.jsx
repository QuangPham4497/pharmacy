import styled from "styled-components";

export const LoginWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("/background-pharmacy.png");
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

export const LoginContainer = styled.div`
  max-width: 500px;
  padding: 20px;
  border: #c9f0f7 solid 2px;
  border-radius: 20px;
  background-color: #c9f0f7;
  & h3 {
    text-align: center;
    margin: 10px 0px 20px;
  }
  & .register-yet {
    text-align: center;
    & i {
      color: blue;
    }
  }
`;
