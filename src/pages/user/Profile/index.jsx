import * as S from "./styles";
import { Form, Card, Row, Col, Input, Button, Select } from "antd";
import { useEffect, useMemo } from "react";
import { Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

import { Navigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import {
  getOrderList,
  getCityListAction,
  getDistrictListAction,
  getWardListAction,
  updateUserInfoAction,
} from "redux/actions";

function ProfilePage() {
  const dispatch = useDispatch();
  const [infomationForm] = Form.useForm();

  const { userInfo } = useSelector((state) => state.auth);
  const { orderList } = useSelector((state) => state.order);
  const { cityList, districtList, wardList } = useSelector(
    (state) => state.location
  );

  // useEffect: mounting
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

  useEffect(() => {
    dispatch(getCityListAction());
  }, []);

  // initial của thông tin cá nhân
  const initialValues = {
    fullName: userInfo.data.fullName,
    email: userInfo.data.email,
    phoneNumber: userInfo.data.phoneNumber,
    cityName: userInfo.data.cityName,
    districtName: userInfo.data.districtName,
    wardName: userInfo.data.wardName,
    address: userInfo.data.address,
  };
  const handleSaveInfoForm = (values) => {
    const { cityCode, districtCode, wardCode } = values;
    const cityData = cityList.data.find((item) => item.code === cityCode);
    const districtData = districtList.data.find(
      (item) => item.code === districtCode
    );
    const wardData = wardList.data.find((item) => item.code === wardCode);

    dispatch(
      updateUserInfoAction({
        data: {
          cityName: cityData.name,
          districtName: districtData.name,
          wardName: wardData.name,
          address: values.address,
        },
        id: userInfo.data.id,
      })
    );
  };

  // render city, district, ward
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

  // table detail
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
          onFinish={(values) => handleSaveInfoForm(values)}
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
                  <Select
                    defaultValue={userInfo.data.cityName}
                    onChange={(value) => {
                      dispatch(getDistrictListAction({ cityCode: value }));
                      infomationForm.setFieldsValue({
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
                <Form.Item label="Quận, huyện" name="districtCode">
                  <Select
                    defaultValue={userInfo.data.districtName}
                    onChange={(value) => {
                      dispatch(getWardListAction({ districtCode: value }));
                      infomationForm.setFieldsValue({
                        wardCode: undefined,
                      });
                    }}
                    disabled={!infomationForm.getFieldValue("cityCode")}
                  >
                    {renderDistrictOptions}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={8}>
                <Form.Item label="Phường, xã" name="wardCode">
                  <Select
                    defaultValue={userInfo.data.wardName}
                    disabled={!infomationForm.getFieldValue("districtCode")}
                  >
                    {renderWardListOptions}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Địa chỉ" name="address">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row justify="center" style={{ margin: "10px 0px" }}>
              <Button type="primary" htmlType="submit">
                Lưu thông tin
              </Button>
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
