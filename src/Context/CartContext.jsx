import axios from "axios";
import { createContext, useState } from "react";

export const CartContext = createContext(null);

export function CartContextProvider({ children }) {
  let [count, setCount] = useState(0);
  const [cart, setCart] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [statusError, setStatusError] = useState('');

  const getCart = async () => {
    try {
      const token = localStorage.getItem("userToken");
      const response = await axios.get(`/cart`, { headers: { authorization: `Saja__${token}` } });
      const responseData = response.data;

      if (responseData.products.length>0) {
        setCart(responseData.cart);
        console.log(cart);
        setIsEmpty(false);
      } else {
        setIsEmpty(true);
      }
      
    } catch (error) {
      setStatusError(error.response?.data.message || "An error occurred while fetching favorite list.");
      setIsEmpty(true);
      setCart(null);
      console.log(statusError);
    }
  };

  async function addToCart(productID) {
    try {
      const token = localStorage.getItem('userToken');
      let objData = { productID };
      const { data } = await axios.post(`/cart/add`, objData, { headers: { authorization: `Tariq__${token}` } })
      return data;
    } catch (error) {
      console.log(error);
    }
  }


  async function updateCart(productID, quantity) {
    try {
      let objData = {
        quantity: quantity
      }
      const { data } = await axios.put(`https://king-prawn-app-3mgea.ondigitalocean.app/cart/${productID}`, objData, { headers: { Authorization: `Tariq__${localStorage.getItem('userToken')}` } });
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  async function deleteCart(productID) {
    try {

      const { data } = await axios.delete(`/cart/${productID}`, { headers: { Authorization: `Tariq__${localStorage.getItem('userToken')}` } });
      return data;
    } catch (error) {
      console.error(error);
    }
  }

  return <CartContext.Provider value={{ addToCart, getCart, updateCart, deleteCart, count, setCount, cart, isEmpty }}>
    {children}
  </CartContext.Provider>
}