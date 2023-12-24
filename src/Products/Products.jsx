import React, { useEffect, useState } from "react";
import queryString from "query-string";
import ProductAPI from "../API/ProductAPI";
import Pagination from "./Component/Pagination";
import Sidebar from "../components/sidebar/Sidebar";
import { Link } from "react-router-dom";
import styles from "./Products.module.scss";

function Products(props) {
  const [products, setProducts] = useState([]);

  const [pagination, setPagination] = useState({
    page: "1",
    count: "6",
    search: "",
    category: "all",
  });

  const onChangeText = (e) => {
    const value = e.target.value;

    setPagination({
      page: pagination.page,
      count: pagination.count,
      search: value,
      category: pagination.category,
    });
  };

  //Tổng số trang
  const [totalPage, setTotalPage] = useState();

  //Hàm này dùng để thay đổi state pagination.page
  //Nó sẽ truyền xuống Component con và nhận dữ liệu từ Component con truyền lên
  const handlerChangePage = (value) => {
    console.log("Value: ", value);

    //Sau đó set lại cái pagination để gọi chạy làm useEffect gọi lại API pagination
    setPagination({
      page: value,
      count: pagination.count,
      search: pagination.search,
      category: pagination.category,
    });
  };

  //Gọi hàm useEffect tìm tổng số sản phẩm để tính tổng số trang
  //Và nó phụ thuộc và state pagination
  useEffect(() => {
    const fetchAllData = async () => {
      const response = await ProductAPI.getAPI();

      //Tính tổng số trang = tổng số sản phẩm / số lượng sản phẩm 1 trang
      const totalPage = Math.ceil(
        parseInt(response.length) / parseInt(pagination.count)
      );

      setTotalPage(totalPage);
    };

    fetchAllData();
  }, [pagination]);

  //Gọi hàm Pagination
  useEffect(() => {
    const fetchData = async () => {
      const params = {
        page: pagination.page,
        count: pagination.count,
        search: pagination.search,
        category: pagination.category,
      };

      const query = queryString.stringify(params);

      const newQuery = "?" + query;

      const response = await ProductAPI.getPagination(newQuery);

      setProducts(response);
    };

    fetchData();
  }, [pagination]);

  // Hàm xử lý xóa sản phẩm
  function handleDelete(_id) {
    if (window.confirm("Bạn chắc chắn muốn xóa sản phẩm này")) {
      // xóa ở phía client
      const newData = products.filter((item) => item._id !== _id);
      // xóa ở phía sever
      const deleteProduct = async () => {
        const data = await ProductAPI.deleteProduct(_id);
        alert(data.message);
      };
      deleteProduct();
      //cập nhật dữ liệu mới đã xóa
      setProducts(newData);
    }
  }

  return (
    <div className={styles.home}>
      <Sidebar />
      <div className={styles.homeContainer}>
        <div className="page-wrapper">
          <div className="page-breadcrumb">
            <div className="row">
              <div className="col-7 align-self-center">
                <div className="d-flex align-items-center">
                  <nav aria-label="breadcrumb"></nav>
                </div>
              </div>
            </div>
          </div>
          <div className="container-fluid">
            <div className="row">
              <div className="col-12">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Products</h4>
                    <input
                      className="form-control w-25"
                      onChange={onChangeText}
                      type="text"
                      placeholder="Enter Search!"
                    />
                    <br />
                    <div className="table-responsive">
                      <table className="table table-striped table-bordered no-wrap">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Count</th>
                            <th>Image</th>
                            <th>Category</th>
                            <th>Edit</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products &&
                            products.map((value) => (
                              <tr key={value._id}>
                                <td>{value._id}</td>
                                <td>{value.name}</td>
                                <td>{value.price}</td>
                                <td>{value.count}</td>
                                <td>
                                  <img
                                    src={value.img1}
                                    style={{
                                      height: "60px",
                                      width: "60px",
                                    }}
                                    alt=""
                                  />
                                </td>
                                <td>{value.category}</td>
                                <td>
                                  <Link
                                    to={`/products/edit/${value._id}`}
                                    style={{
                                      cursor: "pointer",
                                      color: "white",
                                    }}
                                    className="btn btn-success"
                                  >
                                    Update
                                  </Link>
                                  &nbsp;
                                  <Link
                                    style={{
                                      cursor: "pointer",
                                      color: "white",
                                    }}
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(value._id)}
                                  >
                                    Delete
                                  </Link>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                      <Pagination
                        pagination={pagination}
                        handlerChangePage={handlerChangePage}
                        totalPage={totalPage}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <footer className="footer text-center text-muted"></footer>
        </div>
      </div>
    </div>
  );
}

export default Products;
