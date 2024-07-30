import * as S from "./styles";
import { useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { ROUTES } from "../../constants/routes";

import AdminHeader from "../AdminHeader";
import Sidebar from "../Sidebar";

function AdminLayout() {
  const [isShow, setIsShow] = useState(true);

  const { userInfo } = useSelector((state) => state.auth);

  if (userInfo.data.role !== "admin") {
    return <Navigate to={ROUTES.USER.HOME} />;
  }

  return (
    <div className="wrapper">
      <AdminHeader />
      <div className="container-global">
        <Sidebar isShow={isShow} setIsShow={setIsShow} />
        <S.MainWrapper isFull={!isShow}>
          <Outlet />
        </S.MainWrapper>
      </div>
    </div>
  );
}

export default AdminLayout;
