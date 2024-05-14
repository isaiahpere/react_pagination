import { useEffect, useState } from "react";

import { Products } from "./types/products";

import "./App.css";

type ProductsProps = {
  brand: string;
  category: string;
  description: string;
  discountPercentage: number;
  id: number;
  images: string[];
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  title: string;
};

function App() {
  const [products, setProducts] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState<Boolean>(false);
  const [page, setPage] = useState<number>(1);

  // fetching data from API
  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        let response = await fetch("https://dummyjson.com/products?limit=100");
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

  const handlePage = (pageNumber: number) => {
    console.log(pageNumber);
    setPage(pageNumber);
  };

  const handlePrev = () => {
    setPage((prev) => (prev - 1) % products.length);
  };

  const handleNext = () => {
    setPage((prev) => (prev + 1) % products.length);
  };

  if (products.length < 1) return null;

  return (
    <div className="App">
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <div className="products">
          {products.slice(page * 10 - 10, page * 10).map((item) => (
            <div key={item.id} className="product">
              <img src={item.thumbnail} alt={item.title} />
              <p>
                {item.title} - {item.id}
              </p>
            </div>
          ))}
        </div>
      )}
      {!isLoading && (
        <div className="pagination">
          <button
            onClick={handlePrev}
            disabled={page === 1}
            className={`${page === 1 ? "disabled" : ""}`}
          >
            Next
          </button>
          {[...Array(products.length / 10)].map((_, index) => (
            <button
              className={`page-number ${index + 1 === page ? "selected" : ""}`}
              key={`id - ${index + 1}`}
              onClick={() => handlePage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={handleNext}
            disabled={page === 10}
            className={`${page === 10 ? "disabled" : ""}`}
          >
            Prev
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
