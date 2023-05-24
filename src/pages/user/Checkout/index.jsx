import * as S from "./styles";
import {
  FormOutlined,
  ShoppingCartOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import {
  Steps,
  Table,
  Button,
  Select,
  Input,
  Form,
  Row,
  Col,
  Card,
  notification,
  Radio,
  Space,
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";

import { ROUTES } from "../../../constants/routes";
import { useNavigate } from "react-router-dom";
import {
  getCityListAction,
  getDistrictListAction,
  getWardListAction,
  orderProductAction,
} from "../../../redux/actions";

function CheckoutPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checkoutForm] = Form.useForm();

  const { cartList } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const cartTotalPrice = cartList.reduce((total, item) => {
    return (total += item.price * item.quantity);
  }, 0);
  const columns = [
    { title: "Loại thuốc", dataIndex: "name", key: "name" },
    {
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      render: (price, item) => `${price.toLocaleString()} VND`,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: " Thành tiền",
      dataIndex: "total",
      key: "total",
      render: (_, item) =>
        `${(item.price * item.quantity).toLocaleString()} VND`,
    },
  ];

  const { cityList, districtList, wardList } = useSelector(
    (state) => state.location
  );
  const initialValues = {
    email: userInfo.data.email,
  };

  const handleSubmitCheckoutForm = (values) => {
    // const { cityCode, districtCode, wardCode } = values;
    // const cityData = cityList.data.find((item) => item.code === cityCode);
    // const districtData = districtList.data.find(
    //   (item) => item.code === districtCode
    // );
    // const wardData = wardList.data.find((item) => item.code === wardCode);

    dispatch(
      orderProductAction({
        data: {
          ...values,
          userId: userInfo.data.id,
          totalPrice: cartTotalPrice,
          status: "pending",
          // cityName: cityData?.name,
          // districtName: districtData?.name,
          // wardName: wardData?.name,
        },
        products: cartList,
        callback: () => navigate(ROUTES.USER.HOME),
      })
    );
    notification.open({
      message: "Bạn đã đặt đơn hàng thành công!",
      icon: (
        <CheckCircleOutlined
          style={{
            color: "#108ee9",
          }}
        />
      ),
    });
  };

  useEffect(() => {
    if (userInfo.data.id) {
      checkoutForm.resetFields();
    }
  }, [userInfo.data.id]);

  useEffect(() => {
    dispatch(getCityListAction());
  }, []);

  const renderCityOptions = useMemo(() => {
    return cityList.data.map((item) => {
      return (
        <Select.Option key={item.id} value={item.code}>
          {item.name}
        </Select.Option>
      );
    });
  }, [cityList.data]);
  const renderDistrictOptions = useMemo(() => {
    return districtList.data.map((item) => {
      return (
        <Select.Option key={item.id} value={item.code}>
          {item.name}
        </Select.Option>
      );
    });
  }, [districtList.data]);
  const renderWardListOptions = useMemo(() => {
    return wardList.data.map((item) => {
      return (
        <Select.Option key={item.id} value={item.code}>
          {item.name}
        </Select.Option>
      );
    });
  }, [wardList.data]);

  return (
    <S.CheckoutWrapper>
      <S.CheckoutContainer>
        <Steps
          size="small"
          current={1}
          items={[
            {
              title: "Giỏ hàng",
              icon: <ShoppingCartOutlined />,
            },
            {
              title: "Thanh toán",
              icon: <FormOutlined />,
            },
          ]}
        />
        <Table
          columns={columns}
          dataSource={cartList}
          pagination={false}
          rowKey="id"
        />
        <Row justify="end" style={{ margin: "20px 0px 20px 10px" }}>
          <Col span={4} style={{ textAlign: "center" }}>
            <Card title="Tổng tiền">
              <b>{cartTotalPrice.toLocaleString()} VND</b>
            </Card>
          </Col>
        </Row>
        <h3 style={{ margin: "10px 10px" }}>Thông tin thanh toán</h3>
        <Form
          name="checkoutForm"
          form={checkoutForm}
          layout="vertical"
          initialValues={initialValues}
          onFinish={(values) => handleSubmitCheckoutForm(values)}
        >
          <Card size="medium">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Form.Item
                  label="Họ và tên"
                  name="fullName"
                  rules={[{ required: true, message: "" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={24}>
                {userInfo.data.id ? (
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: "" }]}
                  >
                    <Input readOnly />
                  </Form.Item>
                ) : (
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: "" }]}
                  >
                    <Input />
                  </Form.Item>
                )}

                {/* <Form.Item
                  label="Email"
                  name="email"
                  rules={[{ required: true, message: "" }]}
                >
                  <Input />
                </Form.Item> */}
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Số điện thoại"
                  name="phoneNumber"
                  rules={[{ required: true, message: "" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Thành phố, tỉnh"
                  name="cityCode"
                  rules={[{ required: true, message: "" }]}
                >
                  <Select
                    onChange={(value) => {
                      dispatch(getDistrictListAction({ cityCode: value }));
                      checkoutForm.setFieldsValue({
                        districtCode: undefined,
                        wardCode: undefined,
                      });
                    }}
                  >
                    {renderCityOptions}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Quận, huyện"
                  name="districtCode"
                  rules={[{ required: true, message: "" }]}
                >
                  <Select
                    onChange={(value) => {
                      dispatch(getWardListAction({ districtCode: value }));
                      checkoutForm.setFieldsValue({
                        wardCode: undefined,
                      });
                    }}
                    disabled={!checkoutForm.getFieldValue("cityCode")}
                  >
                    {renderDistrictOptions}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item
                  label="Phường, xã"
                  name="wardCode"
                  rules={[{ required: true, message: "" }]}
                >
                  <Select
                    disabled={!checkoutForm.getFieldValue("districtCode")}
                  >
                    {renderWardListOptions}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  label="Địa chỉ"
                  name="address"
                  rules={[{ required: true, message: "" }]}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item
                  label="Phương thức thanh toán"
                  name="paymentMethod"
                  rules={[{ required: true, message: "" }]}
                >
                  <Radio.Group>
                    <Space direction="vertical">
                      <Radio value={1}>Thanh toán bằng tiền mặt</Radio>
                      <Radio value={2}>Thanh toán bằng thẻ ngân hàng</Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
          </Card>
          <Row justify="space-between" style={{ margin: "20px 10px" }}>
            <Button
              type="primary"
              onClick={() => navigate(ROUTES.USER.CART_LIST)}
            >
              Trở về
            </Button>
            <Button type="primary" htmlType="submit">
              Thanh toán
            </Button>
          </Row>
        </Form>
      </S.CheckoutContainer>
    </S.CheckoutWrapper>
  );
}

export default CheckoutPage;
