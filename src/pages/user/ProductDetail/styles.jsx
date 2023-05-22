import styled from "styled-components";

export const ProductDetailWrapper = styled.div`
  padding-top: 30px;
  overflow: hidden;
  width: 100%;
  border-bottom: #0f62f9 10px solid;
`;

// chi tiết sản phẩm và nút mua hàng
export const ProductDetailContainer = styled.div`
  padding: 20px 100px;
  width: 100%;
  background-color: white;
`;

export const ProductDetail = styled.div`
  background-color: white;
  max-width: 1400px;
  width: 100%;
`;

// thông tin sản phẩm và review
export const ProductContentWrapper = styled.div`
  width: 100%;
  background-color: #f0f2f5;
  padding: 20px 80px 20px 100px;
`;
export const ProductContentContainer = styled.div`
  max-width: 1400px;
  width: 100%;
`;
export const ProductContent = styled.div`
  margin-right: 20px;
  padding: 10px 20px;
  background-color: white;
  border: white 1px solid;
  border-radius: 8px;
  height: 700px;
`;
export const ProductDescribe = styled.div`
  background-color: white;
  width: auto;
  height: 550px;
  overflow-y: scroll;
`;
export const ShowmoreButton = styled.div`
  text-align: center;

  & button {
    width: 200px;
    height: 40px;
    border-style: none;
    color: white;
    background-color: #0f62f9;
    border: #8d94ff 1px solid;
    border-radius: 5px;
    margin: 10px 0px;
    padding: 5px 0px;

    &:hover {
      color: #0f62f9;
      background-color: white;
      cursor: pointer;
    }
  }
`;
export const ProductReview = styled.div`
  width: 100%;
  margin: 0px;
  padding: 0px;
  background-color: white;
  border-radius: 8px;
  height: 700px;
`;
//sản phẩm tương tự
export const SimilarProductContainer = styled.div`
  background-color: #f0f2f5;
  display: flex;
  justify-content: center;
  padding: 10px 80px 20px 100px;
  width: 100%;
  height: auto;
`;
export const SimilarProduct = styled.div`
  max-width: 1400px;
  width: 100%;
  background-color: white;
  border-radius: 20px;
  height: auto;

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
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      color: black;

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
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      & h3 {
        margin: 10px 0px 0px 0px;
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
