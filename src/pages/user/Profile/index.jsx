import * as S from "./styles";
import { Form, Card, Row, Col, Input } from "antd";
import { useEffect } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { Navigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import { getOrderList } from "redux/actions";

function ProfilePage() {
  const dispatch = useDispatch();
  const [infomationForm] = Form.useForm();

  const { userInfo } = useSelector((state) => state.auth);
  console.log("🚀 ~ file: index.jsx:18 ~ ProfilePage ~ userInfo:", userInfo);

  const { orderList } = useSelector((state) => state.order);

  useEffect(() => {
    if (userInfo.data.id) {
      dispatch(getOrderList({ userId: userInfo.data.id }));
    }
  }, [userInfo.data.id]);

  useEffect(() => {
    if (userInfo.data.id) {
      infomationForm.resetFields();
    }
  }, [userInfo.data.id]);

  // initial của thông tin cá nhân
  const initialValues = {
    fullName: userInfo.data.fullName,
    email: userInfo.data.email,
    phoneNumber: userInfo.data.phoneNumber,
  };

  const tableColumns = [
    {
      title: "Mã đơn hàng",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Số loại sản phẩm",
      dataIndex: "orderDetails",
      key: "orderDetails",
      render: (orderDetails) => `${orderDetails.length}`,
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (totalPrice) => `${totalPrice.toLocaleString()} VND`,
    },
    {
      title: "Ngày đặt hàng",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => moment(createdAt).format("DD/MM/YYYY HH:mm"),
    },
  ];

  // expandable table detail
  const tableColumnsDetail = [
    {
      title: "ID sản phẩm",
      dataIndex: "id",
      key: "id",
      render: (_, orderDetails) => `${orderDetails.productId}`,
    },
    {
      title: "Loại thuốc",
      dataIndex: "name",
      key: "name",
      render: (record, orderDetails) => `${orderDetails.name}`,
    },
    {
      title: "Giá",
      dataIndex: "price",
      key: "price",
      render: (record, orderDetails) =>
        `${orderDetails.price.toLocaleString()} VND`,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      render: (record, orderDetails) => `${orderDetails.quantity}`,
    },
  ];

  // check user id
  if (!userInfo.data.id) {
    return <Navigate to={ROUTES.USER.HOME} />;
  }

  return (
    <S.ProfileWrapper>
      <S.ProfileContainer>
        {/* form Thông tin cá nhân */}
        <Form
          name="infomationForm"
          form={infomationForm}
          layout="vertical"
          initialValues={initialValues}
          onFinish={(values) => {}}
        >
          <Card size="medium" title="Thông tin cá nhân">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Form.Item
                  label="Họ và tên"
                  name="fullName"
                  rules={[
                    {
                      required: true,
                      message: "",
                    },
                  ]}
                >
                  <Input readOnly />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: "" }]}
                >
                  <Input readOnly />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Số điện thoại"
                  name="phoneNumber"
                  rules={[{ required: true, message: "" }]}
                >
                  <Input readOnly />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Thành phố, tỉnh" name="cityCode">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Quận, huyện" name="districtCode">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Phường, xã" name="wardCode">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Địa chỉ" name="address">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Form>

        {/* Lịch sử mua hàng */}
        <Card
          size="medium"
          title="Lịch sử mua hàng"
          style={{ marginTop: "20px" }}
        >
          <Table
            columns={tableColumns}
            dataSource={orderList.data}
            rowKey="id"
            pagination={false}
            expandable={{
              expandedRowRender: (record) => (
                <>
                  <Table
                    columns={tableColumnsDetail}
                    dataSource={record.orderDetails}
                    pagination={false}
                  />

                  {/* {record.orderDetails.map((item) => (
                  <Row key={item.id}>
                    <Col span={6}>{item.name}</Col>
                    <Col span={6}>{item.price}</Col>
                    <Col span={6}>{item.quantity}</Col>
                    <Col span={6}>{item.price * item.quantity}</Col>
                  </Row>
                ))} */}
                </>
              ),
            }}
          />
        </Card>
      </S.ProfileContainer>
    </S.ProfileWrapper>
  );
}

export default ProfilePage;
