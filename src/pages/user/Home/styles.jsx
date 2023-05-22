import styled from "styled-components";

export const HomeWrapper = styled.div`
  padding: 0px;
  max-width: 100vw;
  overflow: hidden;

  & .wrapper {
    background-color: white;
    margin-bottom: 30px;
    padding: 30px 80px;

    & .container {
      max-width: 1400px;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 0px 0px 10px 0px;
      padding: 40px 0px 0px 0px;
      background-color: white;

      & .title {
        font-size: 20px;
        margin-bottom: 10px;
      }

      & .container-category {
        height: auto;
        width: 100%;
        padding: 20px 50px;

        & .card {
          width: 100%;
          height: 180px;
          margin-bottom: 5px;
          text-align: center;

          & .card-content {
            background-color: #ffffff;
            border-radius: 8px;
            cursor: pointer;
            width: 80%;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 10px 10px;

            &:hover {
              background-color: #f2f6fe;
              border: #8787ef 1px solid;
              transform: scale(1.1);
              transition: 0.5s ease;
            }
            &:active {
              background-color: #b9b9f1;
            }
            & .img {
              display: flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 10px;
              & img {
                width: 100%;
                height: auto;
                border-radius: 50%;
              }
            }

            & .content {
              padding: 10px 10px;
            }
          }
        }
      }
    }
  }

  & .wrapper-carousel {
    background-color: white;
    padding: 30px 80px;
    border-bottom: #0f62f9 10px solid;

    & .container-carousel {
      max-width: 1400px;
      width: 100%;
      margin-bottom: 0px;
      padding: 20px 50px 20px;
      background-color: white;
      width: 100%;
      height: auto;

      & .title {
        font-size: 20px;
        margin-bottom: 10px;
      }

      & .slide {
        padding: 10px 20px 40px 20px;
        width: 100%;
        height: auto;
        border: #fff 1px solid;

        & .card {
          border-radius: 20px;
          width: auto;
          height: auto;
          margin: 0px 0px 0px 0px;

          & .card-content {
            border-radius: 8px;
            box-shadow: rgba(15, 61, 145, 0.12) 0px 0px 12px;
            padding: 20px;
            width: auto; //220px
            height: 400px;
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            &:hover {
              cursor: pointer;
              transform: scale(1.05);
              transition: 0.2s ease;
              border: rgb(93, 172, 70) 2px solid;
            }
            & .image {
              display: flex;
              align-items: center;
              justify-content: center;
              width: auto;
              height: 250px;
            }
            & img {
              width: 100%;
              height: 100%;
              object-fit: cover;
              border: 4px solid #fdfdfd;
            }
            & .content {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              & h4 {
                height: auto;
                text-align: center;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;
                width: 200px;
              }
              & .price {
                margin: 5px 0;
              }
            }
          }
        }
      }
    }
  }
`;
