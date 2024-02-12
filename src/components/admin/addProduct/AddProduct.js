//// admin panelindeki add product componenti
import React, { useState } from "react";
import styles from "./AddProduct.module.scss";
import Card from "../../card/Card";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "../../../firebase/config";
import { toast } from "react-toastify";
import { Timestamp, addDoc, collection, doc, setDoc } from "firebase/firestore";
import Loader from "../../loader/Loader";
import { useNavigate , useParams } from "react-router-dom"
import { useSelector } from "react-redux";
import { selectProducts } from "../../../redux/slice/productSlice";

const categories = [
  { id: 1, name: "Laptop" },
  { id: 2, name: "Electronics" },
  { id: 3, name: "Fashion" },
  { id: 4, name: "Phone" },
];

const AddProduct = () => {

  const {id} = useParams()

  const products = useSelector(selectProducts)
  const productEdit = products.find((item) => item.id === id)

  const initialState = {
    name: "",
    imageURL: "",
    price: 0,
    category: "",
    brand: "",
    desc: "",
  }
  const [product, setProduct] = useState(
    ()=>{
      const newState = detectForm({...initialState},productEdit)
      return newState
    }
  );

  const navigate = useNavigate()

  function detectForm(f1,f2){
    if(id === "ADD"){
      return f1
    }
    else{
      return f2
    }
  }

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // console.log(file)
    const storageRef = ref(storage, `eshop/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        // console.log("Upload is " + progress + "% done");
        setUploadProgress(progress);
      },
      (error) => {
        toast.error(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          // console.log("File available at", downloadURL);
          setProduct({ ...product, imageURL: downloadURL });
          toast.success("Image uploaded successfully");
        });
      }
    );
  };

  const addProduct = (e) => {
    e.preventDefault();
    // console.log(product);
    setIsLoading(true);
    try {
      addDoc(collection(db, "products"), {
        name: product.name,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      setUploadProgress(0)
      setProduct({...initialState})
      toast.success("Product uploaded successfully");
      navigate("/admin/all-products")
    } catch (error) {
      setIsLoading(false);
      toast.error(error.message);
    }
  };

  const editProduct= (e) => {
    e.preventDefault();
    setIsLoading(true)

    if(product.imageURL !== productEdit.imageURL){
      const storageRef = ref(storage,productEdit.imageURL)
      deleteObject(storageRef)
    }
    try{
      setDoc(doc(db,"products",id),{
        name: product.name !== editProduct.name ? product.name : null ,
        imageURL: product.imageURL,
        price: Number(product.price),
        category: product.category,
        brand: product.brand,
        desc: product.desc,
        createdAt: productEdit.createdAt,
        editedAt: Timestamp.now().toDate()
      })
      setIsLoading(false)
      toast.success("Prodct Edit Succesfuly")
      navigate("/admin/all-product")
    }
    catch(error) {
      setIsLoading(false)
      toast.error(error.message)
    }
  }

  return (
    <>
      {isLoading && <Loader/>}
      <div className={styles.product}>
        <h2>{detectForm("Add New Product","Edit New Product")}</h2>
        <Card cardClass={styles.card}>
          <form onSubmit={detectForm(addProduct,editProduct)}>
            <label>Product name:</label>
            <input
              type="text"
              placeholder="Product Name"
              required
              name="name"
              value={product.name}
              onChange={(e) => handleInputChange(e)}
            />
            <label>Product image:</label>
            <Card cardClass={styles.group}>
              {uploadProgress === 0 ? null : (
                <div className={styles.progress}>
                  <div
                    className={styles["progress-bar"]}
                    style={{ width: `${uploadProgress}%` }}
                  >
                    {uploadProgress < 100
                      ? `Uploading ${uploadProgress}%`
                      : `Upload Complete ${uploadProgress}%`}
                  </div>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                placeholder="Product Image"
                name="image"
                onChange={(e) => handleImageChange(e)}
              />
              {product.imageURL === "" ? null : (
                <input
                  type="text"
                  required
                  value={product.imageURL}
                  placeholder="Image URL"
                  name="imageURL"
                  disabled
                />
              )}
            </Card>
            <label>Pruduct Price:</label>
            <input
              type="number"
              placeholder="Product Price"
              required
              name="price"
              value={product.price}
              onChange={(e) => handleInputChange(e)}
            />
            <label>Product Category:</label>
            <select
              required
              name="category"
              value={product.category}
              onChange={(e) => handleInputChange(e)}
            >
              <option value="" disabled>
                -- choose product category --
              </option>
              {categories.map((cat) => {
                return (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                );
              })}
            </select>
            <label>Product Company/Brand</label>
            <input
              type="text"
              placeholder="Product Brand"
              required
              name="brand"
              value={product.brand}
              onChange={(e) => handleInputChange(e)}
            />
            <label>Product Description</label>
            <textarea
              name="desc"
              value={product.desc}
              onChange={(e) => handleInputChange(e)}
              cols="30"
              rows="10"
            ></textarea>
            <button className="--btn --btn-primary">{detectForm("Save Product","Edit Product")}</button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddProduct;