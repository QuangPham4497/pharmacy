import styled, { css } from "styled-components";

export const SidebarWrapper = styled.div`
  width: 250px;
  height: 100vh;
  margin-top: 150px;
  background-color: #14bbbb;
  /* position: absolute; */
  transition: all 0.4s;

  & .menu-button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 0;
    gap: 10px;
  }

  & .sidebar-items {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px;
    width: 100%;

    & .sidebar-item {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 100%;
      padding: 10px;
      margin: 0 20px;
      background-color: cornsilk;
      border-radius: 10px;
      gap: 10px;
      cursor: pointer;
      color: black;

      &:hover {
        background-color: #f7e084;
      }
      &:active {
        background-color: #fad646;
      }
    }
  }
`;
