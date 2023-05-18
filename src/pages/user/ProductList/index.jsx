import { useMemo, useEffect, useState } from "react";
import { Row, Col, Card, Button, Input, Checkbox, Select, Spin } from "antd";
import * as S from "./styles";
import { useSelector, useDispatch } from "react-redux";
import { Link, generatePath, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import {
  getCategoryListAction,
  getProductListAction,
} from "../../../redux/actions";
import { PRODUCT_LIMIT } from "../../../constants/paging";

function ProductList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productList } = useSelector((state) => state.product);
  const { categoryList } = useSelector((state) => state.category);
  const [filterParams, setFilterParams] = useState({
    categoryId: [],
    searchKey: "",
    sort: "",
  });

  // const [productList, setProductList] = useState([
  //   {
  //     name: "3B STADA",
  //     price: 77220,
  //   },
  //   {
  //     name: "Acetylcystein",
  //     price: 65000,
  //   },
  //   {
  //     name: "Acetylcystein 200mg Vidipha",
  //     price: 100000,
  //   },
  //   {
  //     name: "AcetylCysstein Boston 200",
  //     price: 55000,
  //   },
  //   {
  //     name: "Agilodin 10g",
  //     price: 350000,
  //   },
  //   {
  //     name: "Agiparofen 525mg",
  //     price: 50000,
  //   },
  // ]);

  useEffect(() => {
    dispatch(
      getProductListAction({
        page: 1,
        limit: PRODUCT_LIMIT,
      })
    );
    dispatch(getCategoryListAction());
  }, []);

  // const handleFilterCategory = (values) => {
  //   setFilterParams({
  //     ...filterParams,
  //     categoryId: values,
  //   });
  //   dispatch(
  //     getProductListAction({
  //       ...filterParams,
  //       page: 1,
  //       limit: PRODUCT_LIMIT,
  //       categoryId: values,
  //     })
  //   );
  // };
  // const handleFilterSearchKey = (values) => {
  //   setFilterParams({
  //     ...filterParams,
  //     searchKey: values,
  //   });
  //   dispatch(
  //     getProductListAction({
  //       ...filterParams,
  //       page: 1,
  //       limit: PRODUCT_LIMIT,
  //       searchKey: values,
  //     })
  //   );
  // };

  const handleFilter = (key, values) => {
    setFilterParams({
      ...filterParams,
      [key]: values,
    });
    dispatch(
      getProductListAction({
        ...filterParams,
        page: 1,
        limit: PRODUCT_LIMIT,
        [key]: values,
      })
    );
  };

  const navigateToDetail = (item) => {
    navigate(generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: item.id }));
  };

  const handleShowMore = () => {
    dispatch(
      getProductListAction({
        ...filterParams,
        page: productList.meta.page + 1,
        limit: PRODUCT_LIMIT,
        more: true,
      })
    );
  };

  const renderFilterCategory = useMemo(() => {
    return categoryList.data.map((item) => {
      return (
        <Col span={24} key={item.id} style={{ margin: "15px 0px" }}>
          <Checkbox value={item.id}>
            {item.name} ({item.products.length})
          </Checkbox>
        </Col>
      );
    });
  }, [categoryList.data]);

  const renderProductList = useMemo(() => {
    return productList.data.map((item, index) => {
      return (
        <Col key={item.id} span={6}>
          <Card title={item.name} size="small" className="product-card-global">
            <span>{item.category?.name}</span>
            <img
              style={{ width: "100%", height: "100%" }}
              src="https://data-service.pharmacity.io/pmc-upload-media/production/pmc-ecm-core/products/P16412_1_l.webp"
            />
            <h3>Price: {item.price.toLocaleString()}</h3>
            {/* <Link
              to={generatePath(ROUTES.USER.PRODUCT_DETAIL, { id: item.id })}
            > */}
            <Button
              type="primary"
              // style={{ backgroundColor: "rgb(93, 172, 70)" }}
              onClick={() => navigateToDetail(item)}
            >
              Xem chi tiết
            </Button>
            {/* </Link> */}
          </Card>
        </Col>
      );
    });
  }, [productList.data]);

  return (
    <S.ProductListWrapper>
      <h2 style={{ padding: 20 }}>Danh sách sản phẩm</h2>
      <S.ProductListContainer>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Card
              title="Bộ lọc sản phẩm"
              size="large"
              style={{ borderRadius: 8, height: 700 }}
            >
              <Checkbox.Group
                onChange={(values) => handleFilter("categoryId", values)}
              >
                <Row>{renderFilterCategory}</Row>
              </Checkbox.Group>
            </Card>
          </Col>
          <Col span={18} style={{ borderLeft: "whitesmoke 2px solid" }}>
            <Row gutter={[16, 16]} style={{ marginBottom: 0 }}>
              <Col span={21}>
                <Input
                  style={{ borderRadius: 8 }}
                  onChange={(e) => handleFilter("searchKey", e.target.value)}
                  placeholder="Tim kiem"
                />
              </Col>
              <Col span={3}>
                <Select
                  onChange={(value) => handleFilter("sort", value)}
                  placeholder="Sắp xếp"
                  style={{ width: "100%" }}
                >
                  <Select.Option value="name.asc">Tên A-Z</Select.Option>
                  <Select.Option value="name.desc">Tên Z-A</Select.Option>
                  <Select.Option value="price.asc">Giá tăng dần</Select.Option>
                  <Select.Option value="price.desc">Giá giảm dần</Select.Option>
                </Select>
              </Col>
            </Row>
            <Spin spinning={productList.load}>
              <Row gutter={[16, 16]}>{renderProductList}</Row>
            </Spin>
            {productList.data.length !== productList.meta.total && (
              <Row justify="center">
                <Button
                  style={{
                    margin: "20px 0",
                  }}
                  onClick={() => handleShowMore()}
                >
                  Xem thêm
                </Button>
              </Row>
            )}
          </Col>
        </Row>
      </S.ProductListContainer>
    </S.ProductListWrapper>
  );
}

export default ProductList;
