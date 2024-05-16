import axios from "axios";
import { createContext, useState } from "react";
import { toast } from "react-toastify";

export const ProductApiContext = createContext(null);

export function ProductApiContextProvider({ children }) {

  // Use array destructuring to get the state variable and the function to update it
  const [products, setProducts] = useState([]);
  let [page, setPage] = useState(1);


  const getProducts = async (page, urlProduct,searchQuery) => {
    try {
      const separator = urlProduct.includes('?') ? '&' : '?'; // to put the sort and other filters method
      if (searchQuery) {
        searchQuery=`search=${searchQuery}`;
      }
      const { data } = await axios.get(`/products/${urlProduct}${separator}page=${page}&${searchQuery}`);
      console.log(data);
      if (data.message === "success") {
        setProducts(data.products);
        console.log(products);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [favoriteList, setFavoriteList] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  let [statusError, setStatusError] = useState();

  const getFavoriteList = async () => {
      try {
          const token = localStorage.getItem("userToken");
          const response = await axios.get(`/Favorite`, { headers: { authorization: `Saja__${token}` } });
          const responseData = response.data;
  
          if (responseData) {
              setFavoriteList(responseData.Favorite);
              setIsEmpty(false);
          } else {
              setIsEmpty(true);
          }
      } catch (error) {
          setStatusError(error.response?.data.message || "An error occurred while fetching favorite list.");
          setIsEmpty(true);
      }
  };
  
  async function addToFavoriteList(productId) {
    try {
        const token = localStorage.getItem('userToken');
        let objData = { productId };
        const { data } = await axios.post(`/Favorite`, objData, { headers: { authorization: `Saja__${token}` } });
        if (data.message == "success") {
            toast.success('Product added successfully!');
            getFavoriteList()
        }
    } catch (error) {
        toast.error('Product Already Exist');
    }
}



  return (
    <ProductApiContext.Provider value={{ getProducts, products, setProducts, page, setPage,isEmpty,favoriteList,getFavoriteList,addToFavoriteList}}>
      {children}
    </ProductApiContext.Provider>
  );
}
