import * as S from "./styles";
import {
  SmileOutlined,
  StarFilled,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import {
  Form,
  Input,
  Rate,
  Col,
  Card,
  Spin,
  Row,
  InputNumber,
  Button,
  notification,
  Popover,
  Tabs,
} from "antd";
import { TbTruckDelivery } from "react-icons/tb";
import { GiMedicines } from "react-icons/gi";
import { MdPhonelinkSetup } from "react-icons/md";

import { useEffect, useMemo, useState } from "react";
import { Link, useParams, generatePath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ROUTES } from "../../../constants/routes";
import { PRODUCT_LIMIT } from "../../../constants/paging";

import {
  getProductDetailAction,
  getSimilarProductListAction,
  getReviewListAction,
  sendReviewAction,
  addtocartAction,
} from "../../../redux/actions";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import moment from "moment";

function ProductDetailPage() {
  const { id } = useParams();

  const [reviewForm] = Form.useForm();
  const { userInfo } = useSelector((state) => state.auth);
  const { reviewList } = useSelector((state) => state.review);
  const { productDetail, similarproductList } = useSelector(
    (state) => state.product
  );

  const contentPopover = (
    <div>
      <ul>
        <li>Tích điểm đối với các sản phẩm nội địa</li>
      </ul>
    </div>
  );

  const [isReadmore, setIsReadmore] = useState(true);
  const toggleReadmore = () => {
    setIsReadmore(!isReadmore);
  };

  const onChange = (key) => {
    console.log(key);
  };

  const itemsTab = [
    {
      key: "1",
      label: `Mô tả`,
      children: (
        <>
          {isReadmore ? (
            <S.ProductDescribe
              dangerouslySetInnerHTML={{
                __html: productDetail.data.describe?.slice(0, 3000),
              }}
            ></S.ProductDescribe>
          ) : (
            <S.ProductDescribe
              dangerouslySetInnerHTML={{
                __html: productDetail.data.describe,
              }}
            ></S.ProductDescribe>
          )}
          <S.ShowmoreButton onClick={() => toggleReadmore()}>
            <button>
              <i>{isReadmore ? "Xem thêm" : "Ẩn bớt"}</i>
            </button>
          </S.ShowmoreButton>
        </>
      ),
    },
    {
      key: "2",
      label: `Thông tin sản phẩm`,
      children: (
        <>
          {isReadmore ? (
            <S.ProductDescribe
              dangerouslySetInnerHTML={{
                __html: productDetail.data.infomation?.slice(0, 3000),
              }}
            ></S.ProductDescribe>
          ) : (
            <S.ProductDescribe
              dangerouslySetInnerHTML={{
                __html: productDetail.data.infomation,
              }}
            ></S.ProductDescribe>
          )}
          <S.ShowmoreButton>
            <Button onClick={() => toggleReadmore()}>
              <i>{isReadmore ? "Xem thêm" : "Ẩn bớt"}</i>
            </Button>
          </S.ShowmoreButton>
        </>
      ),
    },
    {
      key: "3",
      label: `Thương hiệu`,
      children: (
        <S.ProductDescribe
          dangerouslySetInnerHTML={{
            __html: productDetail.data.brand,
          }}
        ></S.ProductDescribe>
      ),
    },
  ];

  const [quantity, setQuantity] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductDetailAction({ id: id }));
    dispatch(getReviewListAction({ productId: id }));
  }, [id]);

  useEffect(() => {
    if (productDetail.data.categoryId) {
      dispatch(
        getSimilarProductListAction({
          similarProductId: productDetail.data.categoryId,
          limit: PRODUCT_LIMIT,
        })
      );
    }
  }, [productDetail.data.categoryId]);

  const handleReview = (values) => {
    dispatch(
      sendReviewAction({
        data: {
          ...values,
          userId: userInfo.data.id,
          productId: parseInt(id),
        },
        callback: () => reviewForm.resetFields(),
      })
    );
  };

  const handleAddtocart = () => {
    dispatch(
      addtocartAction({
        id: parseInt(id),
        name: productDetail.data.name,
        price: productDetail.data.price,
        quantity: quantity,
      })
    );
    notification.open({
      message: "Thêm vào giỏ hàng thành công!",
      icon: (
        <SmileOutlined
          style={{
            color: "#108ee9",
          }}
        />
      ),
    });
  };

  const totalRate = useMemo(
    () =>
      reviewList.data.length
        ? reviewList.data
            .map((item) => item.rate)
            .reduce((total, item) => (total += item))
        : 0,
    [reviewList.data]
  );

  const renderReviewList = useMemo(() => {
    return reviewList.data.map((item) => {
      return (
        <Card
          title={item.user.fullName}
          size="small"
          style={{
            backgroundColor: "#ffffff",
            borderRadius: 8,
            marginBottom: 10,
          }}
        >
          <div>{moment(item.createdAt).format("DD/MM/YYYY HH:mm")}</div>
          <Rate value={item.rate} disabled></Rate>
          <div>{item.comment}</div>
        </Card>
      );
    });
  }, [reviewList.data]);

  const renderSimilarProductList = useMemo(() => {
    return similarproductList.data.map((item) => {
      return (
        <SwiperSlide style={{ padding: "10px 0px 30px 0px" }}>
          <Col span={24} className="product-card-wrapper" key={item.id}>
            <Link
              to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: item.id })}
            >
              <div className="product-card-container">
                <div className="img">
                  <img src={item.image} />
                </div>
                <h3>{item.name}</h3>
                <div className="category-product">
                  <i>{item.category?.name}</i>
                </div>
                <h4>Giá: {item.price.toLocaleString()}/sp</h4>
              </div>
            </Link>
          </Col>
        </SwiperSlide>
      );
    });
  }, [similarproductList.data]);

  return (
    <S.ProductDetailWrapper>
      <Spin spinning={productDetail.load}>
        {/* Chi tiết sản phẩm */}
        <S.ProductDetailContainer>
          <S.ProductDetail>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Card
                  size="small"
                  style={{
                    border: "#e5e5e5 1px solid",
                    borderRadius: 8,
                  }}
                >
                  <img
                    style={{ width: "100%", height: "400px" }}
                    src={productDetail.data.image}
                  />
                </Card>
              </Col>
              <Col span={16}>
                <Row gutter={[10, 10]}>
                  <Col span={24}>
                    <div style={{ marginLeft: 10 }}>
                      <h2>{productDetail.data.name}</h2>
                      <h4>({productDetail.data.category?.name})</h4>
                      <Rate
                        value={totalRate / reviewList.data.length}
                        disabled
                      />
                    </div>
                  </Col>
                  <Col span={14}>
                    <div>
                      <p
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <i>
                          <u>Mã số: {id}</u>
                        </i>
                      </p>
                      <div
                        style={{
                          borderRadius: 10,
                          border: "white 5px solid",
                          backgroundColor: "#ededed",
                          padding: 40,
                          width: "100%",
                        }}
                      >
                        <h2>
                          {productDetail.data.price?.toLocaleString()} VND
                        </h2>
                        <span>Mua hàng và tích điểm thành viên</span>
                        <span style={{ margin: 10, cursor: "pointer" }}>
                          <Popover
                            content={contentPopover}
                            title="Đặc quyền thành viên vip"
                            trigger="hover"
                            placement="bottom"
                          >
                            <QuestionCircleOutlined />
                          </Popover>
                        </span>
                      </div>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        margin: 10,
                        gap: 10,
                      }}
                    >
                      <div>
                        <InputNumber
                          min={1}
                          value={quantity}
                          onChange={(value) => setQuantity(value)}
                        />
                      </div>
                      <div>
                        <Button
                          type="primary"
                          onClick={() => handleAddtocart()}
                        >
                          Thêm vào giỏ hàng
                        </Button>
                      </div>
                    </div>
                  </Col>
                  <Col span={10}>
                    <button
                      style={{
                        borderRadius: 8,
                        border: " #e5e5e5  1px solid",
                        backgroundColor: "white",
                        padding: 10,
                        margin: 10,
                        width: "100%",
                      }}
                    >
                      <h2>Các hình thức giao hàng</h2>
                      <h3>
                        <StarFilled style={{ color: "rgb(93, 172, 70)" }} />
                        <span>
                          <span
                            style={{
                              color: "rgb(93, 172, 70)",
                              margin: " 0 4px",
                            }}
                          >
                            Freeship
                          </span>
                          cho đơn hàng từ
                          <span
                            style={{
                              color: "rgb(93, 172, 70)",
                              margin: " 0 4px",
                            }}
                          >
                            300.000 đ
                          </span>
                        </span>
                      </h3>
                      <Button style={{ margin: 10, borderRadius: "20px" }}>
                        Viettel Post
                      </Button>
                      <Button style={{ margin: 10, borderRadius: "20px" }}>
                        Ahamove
                      </Button>
                    </button>
                    <button
                      style={{
                        borderRadius: 8,
                        border: " #e5e5e5  1px solid",
                        backgroundColor: "white",
                        padding: 10,
                        margin: 10,
                        width: "100%",
                        height: "150px",
                      }}
                    >
                      <Row gutter={[5, 0]}>
                        <Col span={8}>
                          <TbTruckDelivery
                            style={{
                              fontSize: "40px",
                              color: "rgb(15, 98, 249)",
                            }}
                          />
                          <h5>
                            <i>
                              Miễn phí vận chuyển cho đơn hàng từ 300.000 đ.
                            </i>
                          </h5>
                        </Col>
                        <Col span={8}>
                          <GiMedicines
                            style={{
                              fontSize: "40px",
                              color: "rgb(15, 98, 249)",
                            }}
                          />
                          <h5>
                            <i>Đủ thuốc chuẩn, tư vấn tốt.</i>
                          </h5>
                        </Col>
                        <Col span={8}>
                          <MdPhonelinkSetup
                            style={{
                              fontSize: "40px",
                              color: "rgb(15, 98, 249)",
                            }}
                          />
                          <h5>
                            <i>
                              Tích lũy điểm thưởng và sử dụng điểm cho mọi giao
                              dịch.
                            </i>
                          </h5>
                        </Col>
                      </Row>
                    </button>
                  </Col>
                </Row>
              </Col>
            </Row>
          </S.ProductDetail>
        </S.ProductDetailContainer>

        {/* thông tin sản phẩm và review */}
        <S.ProductContentWrapper>
          <S.ProductContentContainer>
            <Row>
              <Col span={16}>
                {/* Mô tả sản phẩm */}
                <S.ProductContent>
                  <Tabs
                    defaultActiveKey="1"
                    items={itemsTab}
                    onChange={onChange}
                  />
                </S.ProductContent>
              </Col>
              <Col span={8}>
                {/* review sản phẩm */}
                <S.ProductReview>
                  <div
                    style={{
                      margin: "0",
                      backgroundColor: "#e2e2e6",
                      borderRadius: "8px 8px 0 0",
                      padding: "20px 20px 20px 20px",
                      overflowY: "scroll",
                      width: "auto",
                      height: "400px",
                    }}
                  >
                    <h2>Đánh giá từ người dùng</h2>
                    {renderReviewList}
                  </div>
                  <div
                    style={{
                      margin: "0",
                      borderRadius: "0 0 8px 8px",
                      padding: "20px 20px 0px 20px",
                      backgroundColor: "white",
                    }}
                  >
                    {userInfo.data.id ? (
                      <div>
                        <h3>Bình luận</h3>
                        <Form
                          form={reviewForm}
                          name="reviewForm"
                          layout="vertical"
                          labelCol={{
                            span: 8,
                          }}
                          wrapperCol={{
                            span: 16,
                          }}
                          initialValues={{
                            remember: true,
                          }}
                          onFinish={(values) => handleReview(values)}
                          autoComplete="off"
                        >
                          <Form.Item
                            label="Rate"
                            name="rate"
                            rules={[
                              {
                                required: true,
                                message: "",
                              },
                            ]}
                          >
                            <Rate />
                          </Form.Item>

                          <Form.Item
                            label="Comment"
                            name="comment"
                            rules={[
                              {
                                required: true,
                                message: "",
                              },
                            ]}
                          >
                            <Input.TextArea autoSize />
                          </Form.Item>

                          <Form.Item
                            wrapperCol={{
                              offset: 8,
                              span: 16,
                            }}
                          >
                            <Button type="primary" htmlType="submit">
                              Gửi
                            </Button>
                          </Form.Item>
                        </Form>
                      </div>
                    ) : (
                      <h3>Vui lòng đăng nhập để bình luận!</h3>
                    )}
                  </div>
                </S.ProductReview>
              </Col>
            </Row>
          </S.ProductContentContainer>
        </S.ProductContentWrapper>

        {/* Sản phẩm tương tự */}
        <S.SimilarProductContainer>
          <S.SimilarProduct>
            <h2 style={{ padding: "20px 10px 0px 20px" }}>
              Có thể bạn quan tâm?
            </h2>
            <Swiper
              spaceBetween={15}
              slidesPerView={5}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[Pagination, Navigation]}
            >
              {renderSimilarProductList}
            </Swiper>
          </S.SimilarProduct>
        </S.SimilarProductContainer>
      </Spin>
    </S.ProductDetailWrapper>
  );
}

export default ProductDetailPage;
