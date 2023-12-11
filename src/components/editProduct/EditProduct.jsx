import { useEffect, useState } from "react";
import "./EditProduct.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../sidebar/Sidebar";
import ProductAPI from "../../API/ProductAPI";
const EditProduct = () => {
  const [details, setDetails] = useState({
    name: "",
    category: "",
    price: "",
    count: "",
    short_desc: "",
    long_desc: "",
  });
  const [images, setImages] = useState({
    img1: "",
    img2: "",
    img3: "",
    img4: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);

  //Lấy dữ liệu ra 1 lần để hiển thị thông tin khi chọn sản phẩm cần update
  useEffect(() => {
    const getProducts = async () => {
      const data = await ProductAPI.getDetail(id);
      console.log(data);
      setDetails({
        name: data.name,
        category: data.category,
        price: data.price,
        count: data.count,
        short_desc: data.short_desc,
        long_desc: data.long_desc,
      });
      setImages({
        img1: data.img1,
        img2: data.img2,
        img3: data.img3,
        img4: data.img4,
      });
    };
    getProducts();
  }, []);

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setDetails((prev) => {
      return { ...prev, [name]: value };
    });
  };

  // xử lý upload ảnh
  const handleImg = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setImages({ ...images, [name]: value });
  };

  const EditProduct = {
    ...details,
    img1: images.img1,
    img2: images.img2,
    img3: images.img3,
    img4: images.img4,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await ProductAPI.putProduct(id, EditProduct);
    if (data) {
      alert("Update sản phẩm thành công");
      navigate("/products");
    }
  };
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <h1>Edit Product</h1>
        <div className="page-wrapper">
          <div className="page-breadcrumb">
            <div className="row">
              <form
                style={{ width: "50%", marginLeft: "40px" }}
                onSubmit={handleSubmit}
              >
                <div className="form-group">
                  <label>Product Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Product Name"
                    onChange={handleChange}
                    name="name"
                    value={details.name}
                  />
                </div>

                <div className="form-group">
                  <label>Category</label>
                  <input
                    type="text"
                    name="category"
                    className="form-control"
                    placeholder="Enter Category"
                    onChange={handleChange}
                    value={details.category}
                  />
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="text"
                    name="price"
                    className="form-control"
                    placeholder="Enter Product Price"
                    onChange={handleChange}
                    value={details.price}
                  />
                </div>
                <div className="form-group">
                  <label>Count</label>
                  <input
                    type="number"
                    name="count"
                    className="form-control"
                    placeholder="Enter Product Count"
                    onChange={handleChange}
                    value={details.count}
                  />
                </div>
                <div className="form-group">
                  <label>Short Description</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Enter Short Description"
                    name="short_desc"
                    onChange={handleChange}
                    value={details.short_desc}
                  ></textarea>
                </div>
                <div className="form-group">
                  <label>Long Description</label>
                  <textarea
                    className="form-control"
                    rows="6"
                    placeholder="Enter Long Description"
                    name="long_desc"
                    onChange={handleChange}
                    value={details.long_desc}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="exampleFormControlFile1">
                    Upload image (4 images)
                  </label>
                  <section>
                    <div className="img_control">
                      <p>Link Image1</p>
                      <input
                        name="img1"
                        className="input_image"
                        onChange={handleImg}
                        value={images.img1}
                        disabled
                      />
                      <img
                        src={images.img1}
                        alt=""
                        className="imgUrl_product"
                      />
                      <p>Link Image2</p>
                      <input
                        name="img2"
                        className="input_image"
                        onChange={handleImg}
                        value={images.img2}
                        disabled
                      />
                      <img
                        src={images.img2}
                        alt=""
                        className="imgUrl_product"
                      />
                      <p>Link Image3</p>
                      <input
                        name="img3"
                        className="input_image"
                        onChange={handleImg}
                        value={images.img3}
                        disabled
                      />
                      <img
                        src={images.img3}
                        alt=""
                        className="imgUrl_product"
                      />

                      <p>Link Image4</p>
                      <input
                        name="img4"
                        className="input_image"
                        onChange={handleImg}
                        value={images.img4}
                        disabled
                      />
                      <img
                        src={images.img4}
                        alt=""
                        className="imgUrl_product"
                      />
                    </div>
                  </section>
                </div>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
