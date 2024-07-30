import styled from "styled-components";

export const FooterWrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 80px 0 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #e5e5e5;

  & .footer-top {
    max-width: 1400px;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    padding: 10px 0;
    border-bottom: #b4a7a7 solid 2px;
    & .about-pharma {
      max-width: 30%;
      gap: 10px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      & button {
        border-radius: 10px;
        border: #999595 2px solid;
      }
    }

    & .benefit-link {
      & li {
        margin: 10px 0;
      }
    }
    & .follow-us {
      display: flex;
      flex-direction: column;

      & a {
        text-decoration: none;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        gap: 10px;
        font-size: large;
        margin: 10px 0;
        & h5 {
          color: black;
        }
      }
    }
  }

  & .footer-bottom {
    max-width: 1400px;
    margin: 10px 0;
    text-align: center;
    & h3 {
      margin: 10px;
      font-size: 15px;
    }
  }
`;
