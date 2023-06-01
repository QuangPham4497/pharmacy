import * as S from "./styles";
import {
  MinusOutlined,
  PlusOutlined,
  FormOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Steps, Table, Button, Input, Space, Row, Col, Card } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { deleteAction, updateAction } from "../../../redux/actions";

import { ROUTES } from "../../../constants/routes";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartList } = useSelector((state) => state.cart);
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
      render: (quantity, item) => (
        <Space.Compact>
          <Button
            onClick={() =>
              dispatch(
                updateAction({
                  id: item.id,
                  quantity: quantity > 1 ? quantity - 1 : 1,
                })
              )
            }
            icon={<MinusOutlined />}
          />
          <Input value={quantity} style={{ width: 50 }} readOnly />
          <Button
            onClick={() =>
              dispatch(updateAction({ id: item.id, quantity: quantity + 1 }))
            }
            icon={<PlusOutlined />}
          />
        </Space.Compact>
      ),
    },
    {
      title: " Thành tiền",
      dataIndex: "total",
      key: "total",
      render: (_, item) =>
        `${(item.price * item.quantity).toLocaleString()} VND`,
    },
    {
      title: " ",
      dataIndex: "action",
      key: "action",
      render: (_, item) => (
        <Button onClick={() => dispatch(deleteAction({ id: item.id }))}>
          Delete
        </Button>
      ),
    },
  ];

  return (
    <S.CartWrapper>
      <S.CartContainer>
        <Steps
          size="small"
          current={0}
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
          style={{ marginBottom: 16 }}
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
        <Row justify="end">
          <Button
            type="primary"
            disabled={cartList.length === 0}
            onClick={() => navigate(ROUTES.USER.CHECKOUT_LIST)}
          >
            Tiếp theo
          </Button>
        </Row>{" "}
      </S.CartContainer>
    </S.CartWrapper>
  );
}

export default CartPage;
