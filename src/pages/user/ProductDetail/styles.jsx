import styled from "styled-components";

export const ProductDetailWrapper = styled.div`
  padding-top: 50px;
  overflow: hidden;
`;

export const ProductDetail = styled.div`
  background-color: white;
`;
export const ProductContent = styled.div`
  margin: 20px 10px 20px 100px;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  max-width: 100%;
  height: 700px;
  /* 
  & .ant-table-tbody .ant-table-row:nth-child(even) {
    background-color: #c9f0c9;

    &:hover > td {
      background-color: unset;
    }
  } */
`;
export const ProductDescribe = styled.div`
  width: auto;
  height: 550px;
  /* max-height: auto; */
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
  margin: 20px 100px 20px 10px;
  padding: 0px;
  background-color: white;
  border-radius: 8px;
  height: 700px;
`;

export const SimilarProduct = styled.div`
  margin: 20px 0px 0px 0px;
  padding: 10px 100px;
  background-color: white;
  border-radius: 20px;
  height: auto;
`;
