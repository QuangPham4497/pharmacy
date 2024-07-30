import * as S from "./styles";

import { Col, Row, Carousel, Button } from "antd";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Pagination, Navigation } from "swiper";
import { useNavigate, useLocation, generatePath, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { ROUTES } from "../../../constants/routes";
import {
  getProductListAction,
  getCategoryListAction,
} from "../../../redux/actions";
import {} from "../../../constants/paging";

function HomePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { state } = useLocation();

  const { productList } = useSelector((state) => {
    return state.product;
  });

  const { categoryList } = useSelector((state) => {
    return state.category;
  });

  //mounting
  useEffect(() => {
    dispatch(getProductListAction({}));
    dispatch(getCategoryListAction());
  }, []);

  const navigateToDetail = (item) => {
    navigate(
      generatePath(ROUTES.USER.PRODUCT_DETAIL, {
        id: item.id,
      })
    );
  };

  const renderCategoryList = useMemo(() => {
    return categoryList.data.map((item, index) => {
      return (
        <Col xs={24} sm={6} lg={3} key={item.id}>
          <Link to={generatePath(ROUTES.USER.PRODUCT_LIST, { id: item.id })}>
            <div className="card">
              <div className="card-content">
                <div className="img">
                  <img src={item.image} />
                </div>
                <div className="content">{item.name}</div>
              </div>
            </div>
          </Link>
        </Col>
      );
    });
  }, [categoryList.data]);
  
  const renderProductList2 = useMemo(() => {
    return productList.data.map((item, index) => {
      return item.categoryId === 2 ? (
        <SwiperSlide>
          <div className="card" key={item.id}>
            <div className="card-content">
              <div className="image">
                <img src={item.image} alt="" />
              </div>
              <div className="content">
                <h4>{item.name}</h4>
                <h5 className="price">{item.price.toLocaleString()}</h5>
                <Button
                  style={{
                    width: "100%",
                    backgroundColor: "rgb(93, 172, 70)",
                    color: "white",
                    borderStyle: "none",
                  }}
                  onClick={() => navigateToDetail(item)}
                >
                  Xem chi tiết
                </Button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ) : (
        ""
      );
    });
  }, [productList.data]);

  const renderProductList5 = useMemo(() => {
    return productList.data.map((item, index) => {
      return item.categoryId === 5 ? (
        <SwiperSlide>
          <div className="card" key={item.id}>
            <div className="card-content">
              <div className="image">
                <img src={item.image} alt="" />
              </div>
              <div className="content">
                <h4>{item.name}</h4>
                <h5 className="price">{item.price.toLocaleString()}</h5>
                <Button
                  style={{
                    width: "100%",
                    backgroundColor: "rgb(93, 172, 70)",
                    color: "white",
                    borderStyle: "none",
                  }}
                  onClick={() => navigateToDetail(item)}
                >
                  Xem chi tiết
                </Button>
              </div>
            </div>
          </div>
        </SwiperSlide>
      ) : (
        ""
      );
    });
  }, [productList.data]);

  return (
    <S.HomeWrapper>
      <div className="wrapper">
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
          <Row className="container-category">{renderCategoryList}</Row>
        </div>
      </div>

      <div className="wrapper-carousel">
        {/* Slide card sản phẩm */}
        <div className="container-carousel">
          <div className="title">
            <h3>Không để Covid quay trở lại</h3>
          </div>

          <Swiper
            className="slide"
            slidesPerView={5}
            breakpoints={{
              769: {
                slidesPerView: 5,
              },
              481: {
                slidesPerView: 2,
              },
              320: {
                slidesPerView: 1,
              },
            }}
            spaceBetween={15}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination, Navigation]}
            navigation={true}
          >
            {renderProductList2}
          </Swiper>
        </div>

        {/* Slide card sản phẩm */}
        <div className="container-carousel">
          <div className="title">
            <h3>Tăng sức đề kháng</h3>
          </div>

          <Swiper
            className="slide"
            slidesPerView="auto"
            breakpoints={{
              769: {
                slidesPerView: 5,
              },
              481: {
                slidesPerView: 2,
              },
              320: {
                slidesPerView: 1,
              },
            }}
            spaceBetween={15}
            pagination={{
              clickable: true,
            }}
            navigation={true}
            modules={[Pagination, Navigation]}
          >
            {renderProductList5}
          </Swiper>
        </div>
      </div>
    </S.HomeWrapper>
  );
}

export default HomePage;
