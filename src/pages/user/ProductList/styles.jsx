import styled from "styled-components";

export const ProductListWrapper = styled.div`
  width: 100%;
  margin: 0;
  background-color: #ffffff;
  padding: 30px 80px;
`;
export const ProductListContainer = styled.div`
  background-color: white;
  padding: 20px;
  padding-bottom: 50px;
  height: auto;
  max-width: 1400px;
  width: 100%;

  & .product-card-wrapper {
    margin: 10px 0px;
    width: auto;
    height: 400px;
    padding: 5px 10px;

    & .product-card-container {
      border-radius: 8px;
      border: rgb(241, 239, 239) 1px solid;
      width: 100%;
      height: 100%;
      padding: 10px;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      &:hover {
        background-color: white;
        border: rgb(93, 172, 70) 2px solid;
        transform: scale(1.02);
        transition: 0.2s ease;
      }
      & .img {
        width: 100%;
        height: auto;
        & img {
          object-fit: cover;
        }
      }

      & h3 {
        margin: 5px 0px 0px 0px;
        height: auto;
        width: 100%;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      & .category-product {
        margin: 10px 0px;
      }
      & h4 {
        margin: 10px 0px 10px 0px;
      }
    }
  }
`;
