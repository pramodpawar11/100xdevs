import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
 import {remove} from "../store/cartSlice.jsx"

 const Cart = () => {
  const products = useSelector((store)=>store.cart);

    const dispatch = useDispatch();
  
    if (!products || products.length === 0) {
      return <div>No items in cart</div>;
    }
  
    const handleRemoveFromCart = (productId) => {
      dispatch(remove(productId));
    };
    
    return (
      <div>
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
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                onClick={() => handleRemoveFromCart(prod.id)} // Pass productId to the handler
              >
                Remove from cart
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Cart;
  