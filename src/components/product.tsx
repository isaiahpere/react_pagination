import { ProductsType } from "../types/products";

interface ProductProp {
  items: ProductsType[];
  currentPage: number;
}

const Product = ({ items, currentPage }: ProductProp) => {
  console.log(currentPage);

  return (
    <>
      {items.slice(currentPage * 10 - 10, currentPage * 10).map((item) => (
        <div key={item.id} className="product">
          <img src={item.thumbnail} alt={item.title} />
          <p>
            {item.title} - {item.id}
          </p>
        </div>
      ))}
    </>
  );
};

export default Product;
