import * as S from "./styles";
import { FacebookOutlined, YoutubeOutlined } from "@ant-design/icons";
import { ImBubble } from "react-icons/im";

function UserFooter() {
  return (
    <S.FooterWrapper>
      <div className="footer-top">
        <div className="about-pharma">
          <h3>Về Pharma</h3>
          <article>
            Tại Pharma, mỗi dược sĩ luôn tận tâm phục vụ và được đào tạo để hoàn
            thành xuất sắc những sứ mệnh được giao.
          </article>
          <button>Tìm hiểu thêm</button>
          <a>
            <i>Trở thành nhà cung cấp</i>
          </a>
          <span>Hỗ trợ đơn hàng doanh nghiệp: pharma@pharma.vn</span>
        </div>
        <div className="benefit-link">
          <h3>Liên kết hữu ích</h3>
          <li>Câu hỏi thường gặp</li>
          <li>Tìm cửa hàng gần bạn</li>
          <li>Chính sách giao hàng</li>
          <li>Phương thức thanh toán</li>
          <li>Chính sách đổi trả</li>
          <li>Thể lệ chương trình thẻ thành viên</li>
          <li>Chính sách bảo mật</li>
          <li>Thông báo cổ đông</li>
          <li>Bán hàng doanh nghiệp</li>
        </div>
        <div className="follow-us">
          <h3>Theo dõi chúng tôi trên</h3>
          <a href="https://www.facebook.com/">
            <FacebookOutlined />
            <h5>Facebook</h5>
          </a>
          <a href="https://www.youtube.com/">
            <YoutubeOutlined />
            <h5>Youtube</h5>
          </a>
          <a href="https://zalo.me/pc">
            <ImBubble />
            <h5>Zalo</h5>
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <h3>Công Ty Cổ Phần Dược Phẩm Pharmacity</h3>
        <h3>Trụ sở: Việt Nam</h3>
        <h3>Điện thoại:.........Email: cskh@pharma.vn</h3>
        <h3>GPDKKD:............</h3>
        <h3>do sở KH&ĐT cấp ngày............</h3>
      </div>
    </S.FooterWrapper>
  );
}

export default UserFooter;
