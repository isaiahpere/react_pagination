import { useEffect, useState } from "react";

import { ProductsType } from "./types/products";

import "./App.css";
import Product from "./components/product";
import Pagination from "./components/pagination";

function App() {
  const [products, setProducts] = useState<ProductsType[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        let response = await fetch("https://dummyjson.com/products?limit=95");
        let data = await response.json();
        if (data && data?.products) {
          setProducts(data.products);
        }
        setIsLoading(false);
      } catch (error) {
        console.log("[ERROR FETCHING DATA]", error);
      }
    };

    fetchData();
  }, []);

  const scrollTopPage = () => {
    window.scrollTo(0, 0);
  };

  const handlePage = (pageNumber: number) => {
    console.log(pageNumber);
    setPage(pageNumber);
    scrollTopPage();
  };

  const handlePrev = () => {
    setPage((prev) => (prev - 1) % products.length);
    scrollTopPage();
  };

  const handleNext = () => {
    setPage((prev) => (prev + 1) % products.length);
    scrollTopPage();
  };

  if (products.length < 1) return null;

  return (
    <div className="App">
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <div className="products">
          <Product items={products} currentPage={page} />
        </div>
      )}
      {!isLoading && (
        <Pagination
          currentPage={page}
          handleNextPage={handleNext}
          handlePrevPage={handlePrev}
          handlePagechange={handlePage}
          items={products}
        />
      )}
    </div>
  );
}

export default App;
