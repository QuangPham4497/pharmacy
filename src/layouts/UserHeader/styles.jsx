import styled from "styled-components";

export const HeaderContainer = styled.div``;
export const HeaderTop = styled.div`
  display: flex;
  height: 50px;
  margin-bottom: 5px;
`;
export const HeaderTopLeft = styled.div``;
export const HeaderTopRight = styled.div``;
export const Header = styled.div``;

export const HeaderWrapper = styled.div`
  background-color: #0f62f9;
  height: 150px;
  width: 100%;
  padding-left: 80px;
  padding-right: 80px;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;

  ${HeaderContainer} {
    max-width: 1400px;
    ${HeaderTop} {
      display: flex;
      justify-content: space-between;
      align-items: center;

      ${HeaderTopLeft} {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 1px 10px;
        & h5 {
          margin: 0 10px;
          color: white;
          font-size: 12px;
        }
        & p {
          border-radius: 20px;
          background-color: #003cbf;
          padding: 5px 10px;
          color: white;
          font-size: 12px;
        }
      }

      ${HeaderTopRight} {
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 0px 10px;
        & h5 {
          margin: 0px;
          padding: 0 5px;
          width: auto;
          height: auto;
          font-size: 12px;
          color: white;
          border-right: 1px solid rgba(158, 186, 237, 0.5);

          &:hover {
            background-color: #8f90e9;
            cursor: pointer;
          }
        }

        & .username {
          text-align: center;
          display: flex;
        }
      }
    }

    ${Header} {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;

      & img {
        width: 195px;
        height: 85px;
        border-radius: 20px;
        background-color: #0f62f9;
        padding: 5px;
        margin: 1px 10px;
      }
      & .search {
        display: flex;
        justify-content: center;
        align-items: flex-start;
        min-height: 85px;
        width: 800px;
        padding: 5px;
        margin: 1px 10px;
      }
      & .cart {
        width: 180px;
        height: 54px;

        & .cart-content {
          border-radius: 8px;
          background-color: #003cbf;
          margin: 1px 5px;
          height: 54px;
          min-width: 140px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;

          & h5 {
            margin: 0px;
            padding: 0;
            font-size: 12px;
            width: auto;
            height: auto;
            color: white;
          }
        }
      }
    }
  }
`;
