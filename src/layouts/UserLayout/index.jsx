import * as S from "./styles";

import UserHeader from "../UserHeader";
import UserFooter from "../UserFooter";

import { Outlet } from "react-router-dom";

function UserLayout() {
  return (
    <div className="wrapper">
      <UserHeader />
      <S.MainWrapper>
        <S.MainContainer>
          <Outlet />
        </S.MainContainer>
      </S.MainWrapper>
      <UserFooter />
    </div>
  );
}

export default UserLayout;
