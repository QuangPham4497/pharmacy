import * as S from "./styles";
import { Row, Col, Button, Table, Space, Avatar, Pagination } from "antd";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { TABLE_PRODUCT_LIMIT } from "../../../constants/paging";
import { ROUTES } from "../../../constants/routes";

import { getProductListAction } from "../../../redux/actions/product.action";

const ProductManagement = () => {
  const [filterParams, setFilterParams] = useState({
    categoryId: [],
    searchKey: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productList } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(
      getProductListAction({
        ...filterParams,
        page: 1,
        limit: TABLE_PRODUCT_LIMIT,
      })
    );
    //  dispatch(getCategoryListAction());
  }, []);
  const handleChangePage = (page) => {
    dispatch(
      getProductListAction({
        ...filterParams,
        page: page,
        limit: TABLE_PRODUCT_LIMIT,
      })
    );
  };

  const tableColumns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (_, item) => {
        return (
          <Space>
            <Avatar />
            <h4>{item.name}</h4>
          </Space>
        );
      },
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => category.name,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_, item) => {
        return (
          <Space>
            <Button
              type="primary"
              ghost
              // onClick={() =>
              //   navigate(
              //     generatePath(ROUTES.ADMIN.UPDATE_PRODUCT, { id: item.id })
              //   )
              // }
            >
              Update
            </Button>
            <Button ghost danger>
              Delete
            </Button>
          </Space>
        );
      },
    },
  ];

  return (
    <S.ProductManagementWrapper>
      <div className="form">
        {/* <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          onFinish={(values) => {
            dispatch(addProductListAction(values));
          }}
        >
          <Form.Item name="name" label="Name">
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price">
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Them san pham
          </Button>
        </Form> */}
      </div>
      <Row justify="center">
        <h3>Quản lý sản phẩm</h3>
      </Row>
      <Row justify="end">
        <Button onClick={() => navigate(ROUTES.ADMIN.CREATE_PRODUCT)}>
          Thêm loại thuốc
        </Button>
      </Row>
      <S.ProductManagementFilter>
        <h4>Bảng các loại thuốc</h4>
      </S.ProductManagementFilter>
      <Table
        columns={tableColumns}
        dataSource={productList.data}
        rowKey="id"
        pagination={false}
        loading={productList.load}
      />
      <Pagination
        current={productList.meta.page}
        pageSize={TABLE_PRODUCT_LIMIT}
        total={productList.meta.total}
        onChange={(page) => handleChangePage(page)}
        style={{ textAlign: "center", margin: 10 }}
      />
    </S.ProductManagementWrapper>
  );
};

export default ProductManagement;
