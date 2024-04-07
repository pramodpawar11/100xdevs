import React, { useEffect, useState } from "react";
import { IoMdHome, IoIosCart } from "react-icons/io";
import { useDispatch,useSelector } from 'react-redux';
import { add } from "../store/cartSlice";
import { Link } from "react-router-dom";
import {fetchProduct} from "../store/productSlice"


const Home = () => {
  
  const dispatch = useDispatch();
  const storeLength = useSelector((store)=>store.cart);
  const { data, status } = useSelector((store) => store.product); 
  const products = data.products
  useEffect(() => {
    dispatch(fetchProduct());
    // const fetchData = async () => {
    //   try {
    //     const res = await fetch("https://dummyjson.com/products");
    //     if (!res.ok) {
    //       throw new Error("Failed to fetch data");
    //     }
    //     const json = await res.json();
    //     setProducts(json.products);
    //     setLoading(false);
    //   } catch (error) {
    //     setError(error.message);
    //     setLoading(false);
    //   }
    // };
    // fetchData();
  }, []);

  const addToCart = (prod)=>{
    dispatch(add(prod));
  }
  if(!products) return <div>Loading.........</div>
  return (
    <div>
      <nav className="bg-gray-800 shadow-lg">
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            {/* Left section */}
            <div className="flex items-center">
              <span className="text-white text-lg font-semibold">
                Redux Store
              </span>
            </div>

            {/* Right section */}
            <div className="flex items-center">
              <Link to="/" className="text-gray-300 hover:text-white mr-4">
                <IoMdHome style={{ fontSize: "24px" }} />
              </Link>
              <Link to="/cart" className="text-gray-300 hover:text-white mr-4">
                <IoIosCart style={{ fontSize: "24px" }} />
              </Link>
              <div className="flex items-center">
                <span className="text-gray-300 mr-2">Items</span>
                <sup className="text-white bg-red-500 px-2 py-1 rounded-full">
                {storeLength.length}
                </sup>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-5">
        {products.map((prod) => (
          <div
            key={prod.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden cursor-pointer"
          >
            <img
              src={prod.thumbnail}
              alt={prod.title}
              className="w-full h-48 object-cover object-center"
            />
            <div className="p-4">
              <h2 className="text-gray-800 text-lg font-semibold">
                {prod.title}
              </h2>
              <h3 className="text-gray-600 text-md">{prod.brand}</h3>
              <p className="text-gray-700">${prod.price}</p>
            </div>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"onClick={()=>addToCart(prod)}>
              Add to cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
