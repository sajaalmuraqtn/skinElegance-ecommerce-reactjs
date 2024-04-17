import axios from "axios";
import { createContext, useState } from "react";

export const ProductApiContext = createContext(null);

export function ProductApiContextProvider({ children }) {

  // Use array destructuring to get the state variable and the function to update it
  const [products, setProducts] = useState([]);
  let [page, setPage] = useState(1);


  const getProducts = async (page, urlProduct) => {
    try {
      const separator = urlProduct.includes('?') ? '&' : '?'; // to put the sort and other filters method
      const { data } = await axios.get(`/products/${urlProduct}${separator}page=${page}`);
      console.log(data);
      if (data.message === "success") {
        setProducts(data.products);
        console.log(products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProductApiContext.Provider value={{ getProducts, products, setProducts, page, setPage }}>
      {children}
    </ProductApiContext.Provider>
  );
}
