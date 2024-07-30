import * as S from "./styles";

import { Button } from "antd";
import {
  MenuOutlined,
  DashboardOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

function Sidebar({ isShow, setIsShow }) {
  return (
    <S.SidebarWrapper style={{ width: isShow ? "250px" : "50px" }}>
      <div className="menu-button">
        <Button
          icon={<MenuOutlined />}
          onClick={() => setIsShow(!isShow)}
        ></Button>
        <h3 style={{ display: isShow ? "block" : "none" }}>Sidebar</h3>
      </div>

      <div className="sidebar-items">
        <Link to={ROUTES.ADMIN.DASHBOARD} className="sidebar-item">
          <DashboardOutlined />
          <h4 style={{ display: isShow ? "block" : "none" }}>Dashboard</h4>
        </Link>
        <Link to={ROUTES.ADMIN.PRODUCT_MANAGEMENT} className="sidebar-item">
          <EditOutlined />
          <h4 style={{ display: isShow ? "block" : "none" }}>
            Product Management
          </h4>
        </Link>
      </div>
    </S.SidebarWrapper>
  );
}

export default Sidebar;
