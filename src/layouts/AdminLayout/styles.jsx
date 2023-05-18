import styled, { css } from "styled-components";

export const MainWrapper = styled.div`
  flex: 1;

  /* margin-left: 250px; */
  width: calc(100% - 250px);
  background-color: #fff;

  margin-top: 150px;
  padding: 10px;
  transition: all 0.4s;

  ${(props) =>
    props.isFull &&
    css`
      /* margin-left: 50px; */
      width: calc(100% - 50px);
    `}
`;
