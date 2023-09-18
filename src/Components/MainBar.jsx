import React, { useState, useEffect } from 'react';
import Card from './Card';
import Swal from 'sweetalert2';
import { collection, addDoc, getDocs, db } from '../firebase';
import "./Style/MainBar.css"
import "./Style/SideBar.css"

let style = {
  width: "220px",
  height: "30px",
  border: "2px solid #42f572",
  padding: "7px",
  borderRadius: "12px"
}

function searching(products, searchInput) {
  const inp = searchInput.toLowerCase();
  return products.filter((product) =>
    product.Title.toLowerCase().includes(inp)
  );
}

export default function MainBar() {
  const [products, setProducts] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [formData, setFormData] = useState({
    image: '',
    title: '',
    des: '',
    category: '',
    price: '',
  });

  async function addProduct() {
    let image = document.getElementById("image").value;
    let title = document.getElementById("title").value;
    let des = document.getElementById("des").value;
    let category = document.getElementById("category").value;
    let price = document.getElementById("price").value;
    if (!image || !title || !des || !category || !price) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please Filled Input First!',
      }); return;
    } try {
      const docRef = await addDoc(collection(db, 'Products'), {
        Image: image,
        Title: title,
        Des: des,
        Category: category,
        Price: price,
      });
      console.log('Products Collection --> ', docRef);
      setFormData({
        image: '',
        title: '',
        des: '',
        category: '',
        price: '',
      });
      console.log("Form Data", formData);
    }
    catch (e) {
      console.error('Products Collection Error -->', e);
    }
  }
  
  async function fetchProducts() {
    const productsCollection = collection(db, 'Products');
    const querySnapshot = await getDocs(productsCollection);
    const productsData = [];
    querySnapshot.forEach((doc) => {
      productsData.push({ id: doc.id, ...doc.data() });
    });
    setProducts(productsData);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    const filtered = searching(products, searchInput);
    setFilteredProducts(filtered);
  }, [products, searchInput]);

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <>
      <div className="side-bar">
        <h1>Filter</h1>
        <input
          type="text"
          placeholder='Enter Title...'
          id='search'
          value={searchInput}
          onChange={handleInputChange}
        />
        <hr />
        <h1>Price</h1>
        <input type="radio" name="price" />
        <label htmlFor="price"> 100</label><br />
        <input type="radio" name="price" />
        <label htmlFor="price"> 200</label><br />
        <input type="radio" name="price" />
        <label htmlFor="price"> 300</label><br />
        <input type="radio" name="price" />
        <label htmlFor="price"> 400</label><br />
        <hr />
        <h2>Select By Category</h2>
        <input type="radio" name="category" />
        <label htmlFor="category"> Shoes</label>
        <input type="radio" name="category" />
        <label htmlFor="category"> Mobile</label>
        <input type="radio" name="category" />
        <label htmlFor="category"> Laptop</label>
      </div>
      <div className="main-bar">
        <div className="input-container">
          <div className="input-row">
            <div className="input-group">
              <p>Image Url</p>
              <input type="text" placeholder='Enter Image Url ...' id='image' style={style} />
            </div>
            <div className="input-group">
              <p>Title</p>
              <input type="text" placeholder='Enter Title ...' id='title' style={style} />
            </div>
            <div className="input-group">
              <p>Description</p>
              <input type="text" placeholder='Enter Description ...' id='des' style={style} />
            </div>
          </div>
          <div className="input-row">
            <div className="input-group">
              <p>Category</p>
              <input type="text" placeholder='Enter Category ...' id='category' style={style} />
            </div>
            <div className="input-group">
              <p>Price</p>
              <input type="text" placeholder='Enter Price ...' id='price' style={style} />
            </div>
          </div>
          <button onClick={addProduct}>Add</button>
        </div>
        <div className="card-show">
          <Card products={filteredProducts} />
        </div>
      </div>
    </>
  );
}
