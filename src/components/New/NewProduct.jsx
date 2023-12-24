import { useState } from "react";
import styles from "./NewProduct.module.scss";
import { useNavigate } from "react-router-dom";
import ProductAPI from "../../API/ProductAPI";
import Sidebar from "../sidebar/Sidebar";
const NewProduct = () => {
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

  const newProduct = {
    ...details,
    img1: images.img1,
    img2: images.img2,
    img3: images.img3,
    img4: images.img4,
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      details.name.trim() === "" ||
      details.category.trim() === "" ||
      details.price.trim() === "" ||
      details.short_desc.trim() === "" ||
      details.long_desc.trim() === ""
    ) {
      alert("Vui lòng điền đầy đủ thông tin");
    } else {
      console.log(newProduct);

      const addProduct = async () => {
        const data = await ProductAPI.postAddProduct(newProduct)
          .then((result) => {
            alert("1 sản phẩm mới đã được tạo thành công");
            navigate("/products");
          })
          .catch((err) => {
            console.log(err);
          });
      };
      addProduct();
    }
  };
  return (
    <div className={styles.home}>
      <Sidebar />
      <div className={styles.homeContainer}>
        <h1>Add Product</h1>
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
                  />
                </div>
                <div className="form-group">
                  <label>Price</label>
                  <input
                    type="number"
                    name="price"
                    className="form-control"
                    placeholder="Enter Product Price"
                    onChange={handleChange}
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
                  Create
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewProduct;
