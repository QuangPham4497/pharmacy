import * as S from "./styles";

import { Col, Row, Carousel, Button } from "antd";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Pagination, Navigation } from "swiper";

function HomePage() {
  const productList = [
    {
      img: "https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/__sized__/products/P18567_34_1-thumbnail-255x255-70.jpg",
      title: "Khẩu trang 4D Pharmacity - Hộp 10 cái",
      price: "49 000/hộp",
    },
    {
      img: "https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/__sized__/products/P18239_34_3-thumbnail-255x255-70.jpg",
      title: "Khẩu trang y tế 3 lớp màu trắng Pharmacity",
      price: "10 000/gói",
    },
    {
      img: "https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/__sized__/products/P17823_7-thumbnail-255x255-70.jpg",
      title: "Bộ vệ sinh mũi Rohto NoseWash (400ml) ",
      price: "95 000/bộ",
    },
    {
      img: "https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/__sized__/products/P22589_33-thumbnail-255x255-70.jpg",
      title: "Bộ xét nghiệm nhanh COVID-19 tại nhà",
      price: "89 000/bộ",
    },
    {
      img: "https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/__sized__/products/P19806_1_l-thumbnail-255x255.webp",
      title: "Dung dịch sát khuẩn tay nhanh On1 (100ml)",
      price: "11 000/chai",
    },
    {
      img: "https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/__sized__/products/P00288_6-thumbnail-255x255-70.jpg",
      title: "Viên xông hương trầm Vim Bảo Gấm",
      price: "26 000/hộp",
    },
  ];

  const productList1 = [
    {
      img: "https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/__sized__/products/P16618_1_l-thumbnail-255x255.webp",
      title: "Đông trùng hạ thảo",
      price: "697 700/hộp",
    },
    {
      img: "https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/__sized__/products/P21994_1_l-thumbnail-255x255.webp",
      title: "Viên uống tảo xoắn",
      price: "486 220/hộp",
    },
    {
      img: "https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/__sized__/products/P00053_5-thumbnail-255x255-70.jpg",
      title: "Berocca",
      price: "72 000/tuýp",
    },
    {
      img: "https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/__sized__/products/P19038_1_l-thumbnail-255x255.webp",
      title: "Nước uống đông trùng hạ thảo",
      price: "345 000/hộp",
    },
    {
      img: "https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/__sized__/products/P11040_2-thumbnail-255x255-70.jpg",
      title: "PV Viên dầu gấc PV",
      price: "40 000/chai",
    },
    {
      img: "https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/__sized__/products/P16811_1_l-thumbnail-255x255.webp",
      title: "Vitamin C",
      price: "351 000/hộp",
    },
  ];

  const renderProductList = () => {
    return productList.map((item) => {
      return (
        <SwiperSlide>
          <div className="card">
            <div className="card-content">
              <div className="image">
                <img src={item.img} alt="" />
              </div>
              <div className="content">
                <h4>{item.title}</h4>
                <h5 className="price">{item.price}</h5>
                <Button
                  style={{
                    width: "100%",
                    backgroundColor: "rgb(93, 172, 70)",
                    color: "white",
                    borderStyle: "none",
                  }}
                >
                  Xem chi tiết
                </Button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      );
    });
  };

  const renderProductList1 = () => {
    return productList1.map((item) => {
      return (
        <SwiperSlide>
          <div className="card">
            <div className="card-content">
              <div className="image">
                <img src={item.img} alt="" />
              </div>
              <div className="content">
                <h4>{item.title}</h4>
                <h5 className="price">{item.price}</h5>
                <Button
                  style={{
                    width: "100%",
                    backgroundColor: "rgb(93, 172, 70)",
                    color: "white",
                    borderStyle: "none",
                  }}
                >
                  Xem chi tiết
                </Button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      );
    });
  };

  return (
    <S.HomeWrapper>
      {/* Slide Card quảng cáo */}
      <Row gutter={16}>
        <Col
          span={24}
          style={{
            width: "100%",
            height: "auto",
            padding: "20px 50px 10px",
            backgroundColor: "white",
            borderRadius: "8px",
          }}
        >
          <Carousel autoplay>
            <div>
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "8px",
                }}
                src="https://data-service.pharmacity.io/pmc-ecm-webapp-config-api/production/banner/913x280%20(x1.5)-1680254665949.jpg"
                alt=""
              />
            </div>
            <div>
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "8px",
                }}
                src="https://data-service.pharmacity.io/pmc-ecm-webapp-config-api/production/banner/913x280%20(x1.5)-1680254579832.png"
                alt=""
              />
            </div>
            <div>
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "8px",
                }}
                src="https://data-service.pharmacity.io/pmc-ecm-webapp-config-api/production/banner/913x280x1.5-1681706971861.png"
                alt=""
              />
            </div>
            <div>
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "8px",
                }}
                src="https://data-service.pharmacity.io/pmc-ecm-webapp-config-api/production/banner/913x280%20(x1.5)-1680852770450.png"
                alt=""
              />
            </div>
          </Carousel>
        </Col>
      </Row>

      {/* Category sản phẩm */}
      <div className="container">
        <div className="title">
          <h3>Danh mục sản phẩm</h3>
        </div>
        <Row className="container-category">
          <Col span={3}>
            <div className="card">
              <div className="card-content">
                <div className="img">
                  <img src="https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/Group_10379.png" />
                </div>
                <div className="content">Dược phẩm</div>
              </div>
            </div>
          </Col>
          <Col span={3}>
            <div className="card">
              <div className="card-content">
                <div className="img">
                  <img src="https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/Group_10378.png" />
                </div>
                <div className="content">Chăm sóc sức khoẻ</div>
              </div>
            </div>
          </Col>
          <Col span={3}>
            <div className="card">
              <div className="card-content">
                <div className="img">
                  <img src="https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/Group_10378-1.png" />
                </div>
                <div className="content">Chăm sóc cá nhân</div>
              </div>
            </div>
          </Col>
          <Col span={3}>
            <div className="card">
              <div className="card-content">
                <div className="img">
                  <img src="https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/Group_10378-2.png" />
                </div>
                <div className="content">Sản phẩm tiện lợi</div>
              </div>
            </div>
          </Col>
          <Col span={3}>
            <div className="card">
              <div className="card-content">
                <div className="img">
                  <img src="https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/Group_10378-3.png" />
                </div>
                <div className="content">Thực phẩm chức năng</div>
              </div>
            </div>
          </Col>
          <Col span={3}>
            <div className="card">
              <div className="card-content">
                <div className="img">
                  <img src="https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/Group_10378-4.png" />
                </div>
                <div className="content">Mẹ và Bé</div>
              </div>
            </div>
          </Col>
          <Col span={3}>
            <div className="card">
              <div className="card-content">
                <div className="img">
                  <img src="https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/Group_10378-5.png" />
                </div>
                <div className="content">Chăm sóc sắc đẹp</div>
              </div>
            </div>
          </Col>
          <Col span={3}>
            <div className="card">
              <div className="card-content">
                <div className="img">
                  <img src="https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/Group_10378-6.png" />
                </div>
                <div className="content">Thiết bị y tế</div>
              </div>
            </div>
          </Col>
        </Row>
        {/* <div className="container-category">
          <Swiper slidesPerView={8}>
            <SwiperSlide className="card-content">
              <div className="img">
                <img src="https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/Group_10379.png" />
              </div>
              <div className="content">Dược phẩm</div>
            </SwiperSlide>
            <SwiperSlide className="card-content">
              <div className="img">
                <img src="https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/Group_10378.png" />
              </div>
              <div className="content">Chăm sóc sức khoẻ</div>
            </SwiperSlide>
            <SwiperSlide className="card-content">
              <div className="img">
                <img src="https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/Group_10378-1.png" />
              </div>
              <div className="content">Chăm sóc cá nhân</div>
            </SwiperSlide>
            <SwiperSlide className="card-content">
              <div className="img">
                <img src="https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/Group_10378-2.png" />
              </div>
              <div className="content">Sản phẩm tiện lợi</div>
            </SwiperSlide>
            <SwiperSlide className="card-content">
              <div className="img">
                <img src="https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/Group_10378-3.png" />
              </div>
              <div className="content">Thực phẩm chức năng</div>
            </SwiperSlide>
            <SwiperSlide className="card-content">
              <div className="img">
                <img src="https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/Group_10378-4.png" />
              </div>
              <div className="content">Mẹ và Bé</div>
            </SwiperSlide>
            <SwiperSlide className="card-content">
              <div className="img">
                <img src="https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/Group_10378-5.png" />
              </div>
              <div className="content">Chăm sóc sắc đẹp</div>
            </SwiperSlide>
            <SwiperSlide className="card-content">
              <div className="img">
                <img src="https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/category-icons/Group_10378-6.png" />
              </div>
              <div className="content">Thiết bị y tế</div>
            </SwiperSlide>
          </Swiper>
        </div> */}
      </div>

      {/* Slide card sản phẩm */}
      <div className="container-carousel">
        <div className="title">
          <h3>Không để Covid quay trở lại</h3>
        </div>

        <Swiper
          className="slide"
          slidesPerView={5}
          spaceBetween={15}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Navigation]}
          navigation={true}
        >
          {renderProductList()}
        </Swiper>
      </div>

      {/* Slide card sản phẩm */}
      <div className="container-carousel">
        <div className="title">
          <h3>Tăng sức đề kháng</h3>
        </div>

        <Swiper
          className="slide"
          slidesPerView={5}
          spaceBetween={15}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation]}
        >
          {renderProductList1()}
        </Swiper>
      </div>
    </S.HomeWrapper>
  );
}

export default HomePage;
