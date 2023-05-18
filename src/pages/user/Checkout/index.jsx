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
} from "antd";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useMemo } from "react";

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
  const initialValues = {};

  const handleSubmitCheckoutForm = (values) => {
    dispatch(
      orderProductAction({
        data: {
          ...values,
          userId: userInfo.data.id,
          totalPrice: cartTotalPrice,
          status: "pending",
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
      Cart List
      <Steps
        size="small"
        current={1}
        items={[
          {
            title: "Cart",
            icon: <ShoppingCartOutlined />,
          },
          {
            title: "Checkout",
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
      <Row justify="end">
        <Col span={4}>Tổng tiền: {cartTotalPrice.toLocaleString()} VND</Col>
      </Row>
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
                label="Full name"
                name="fullName"
                rules={[{ required: true, message: "" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Email"
                name="email"
                rules={[{ required: true, message: "" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Phone Number"
                name="phoneNumber"
                rules={[{ required: true, message: "" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="City"
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
                label="District"
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
                label="Ward"
                name="wardCode"
                rules={[{ required: true, message: "" }]}
              >
                <Select disabled={!checkoutForm.getFieldValue("districtCode")}>
                  {renderWardListOptions}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Address"
                name="address"
                rules={[{ required: true, message: "" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Row justify="space-between">
          <Button
            type="primary"
            onClick={() => navigate(ROUTES.USER.CART_LIST)}
          >
            Prev
          </Button>
          <Button type="primary" htmlType="submit">
            Thanh toán
          </Button>
        </Row>
      </Form>
    </S.CheckoutWrapper>
  );
}

export default CheckoutPage;
