import * as S from "./styles";

import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

import { Button, Input, Badge, notification } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  PhoneOutlined,
  LogoutOutlined,
  LoginOutlined,
  FrownOutlined,
} from "@ant-design/icons";

import { logoutAction } from "../../redux/actions";

function UserHeader() {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartList } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { Search } = Input;
  const onSearch = (value) =>
    navigate(ROUTES.USER.PRODUCT_LIST, { state: { searchKey: value } });

  const handleLogout = () => {
    dispatch(logoutAction());
    notification.open({
      message: "Đăng xuất thành công!",
      icon: (
        <FrownOutlined
          style={{
            color: "#108ee9",
          }}
        />
      ),
    });
  };
  return (
    <S.HeaderWrapper>
      <S.HeaderContainer>
        <S.HeaderTop>
          <S.HeaderTopLeft>
            <h5>Hotline Đặt hàng (Miễn phí)</h5>
            <p>
              Numberphone <PhoneOutlined />
            </p>
          </S.HeaderTopLeft>
          <S.HeaderTopRight>
            <h5>TẢI ỨNG DỤNG</h5>
            <Link to={ROUTES.USER.HOME}>
              <h5>TRANG CHỦ</h5>
            </Link>
            <Link to={ROUTES.USER.PRODUCT_LIST}>
              <h5>LOẠI THUỐC</h5>
            </Link>
            <h5>HỆ THỐNG NHÀ THUỐC</h5>

            {userInfo.data.role === "admin" ? (
              <Link to={ROUTES.ADMIN.DASHBOARD}>
                <h5>TRANG ADMIN</h5>
              </Link>
            ) : (
              <span></span>
            )}

            <div className="username">
              {userInfo.data.id ? (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <h5>
                    <Link
                      to={ROUTES.USER.PROFILE}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: 0,
                        padding: 0,
                        color: "white",
                        gap: 4,
                      }}
                    >
                      {userInfo.data.fullName.toUpperCase()}
                      <UserOutlined style={{ fontSize: 15 }} />
                    </Link>
                  </h5>
                  <Button
                    type="link"
                    block
                    style={{
                      margin: 0,
                      padding: 0,
                      width: "auto",
                      height: "auto",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "white",
                    }}
                    onClick={() => handleLogout()}
                  >
                    <h5 style={{ borderStyle: "none" }}>ĐĂNG XUẤT</h5>
                    <LogoutOutlined />
                  </Button>
                </div>
              ) : (
                <Button
                  type="link"
                  block
                  style={{
                    margin: 0,
                    padding: 0,
                    width: "auto",
                    height: "auto",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                  }}
                  onClick={() => navigate(ROUTES.LOGIN)}
                >
                  <h5 style={{ borderStyle: "none" }}>ĐĂNG NHẬP</h5>
                  <LoginOutlined />
                </Button>
              )}
            </div>
          </S.HeaderTopRight>
        </S.HeaderTop>
        <S.Header>
          <img
            src="https://www.pharmacity.vn/images/pmc-logo.png"
            alt="logo"
          ></img>
          <span className="search">
            <Search
              placeholder="Search"
              allowClear
              size="large"
              onSearch={onSearch}
            />
          </span>
          <span className="cart">
            <Link to={ROUTES.USER.CART_LIST} className="cart-content">
              <Badge count={cartList.length} size="small">
                <ShoppingCartOutlined
                  style={{ color: "white", fontSize: "25px" }}
                />
              </Badge>
              <h5>Giỏ hàng</h5>
            </Link>
          </span>
        </S.Header>
      </S.HeaderContainer>
    </S.HeaderWrapper>
  );
}

export default UserHeader;
