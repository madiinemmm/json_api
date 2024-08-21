import { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { axiosClient } from "../utils/axiosClient";

function Home() {
  const titleRef = useRef();
  const priceRef = useRef();
  const { user } = useSelector((state) => state.user);
  const [products, setProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);

  useEffect(() => {
    if (user) {
      axiosClient
        .get("/products")
        .then((response) => {
          setProducts(response.data.data);
        })
        .catch((error) => console.log(error));
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const title = titleRef.current.value;
    const price = priceRef.current.value;

    if (title && price) {
      axiosClient
        .post("/products", { title, price })
        .then((response) => {
         
          setProducts([...products, response.data]);
          
         
          titleRef.current.value = "";
          priceRef.current.value = "";
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleDelete = (id) => {
    axiosClient
      .delete(`/products/${id}`)
      .then(() => {
       
        setProducts(products.filter((product) => product.id !== id));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-2">
          <input
            type="text"
            ref={titleRef}
            placeholder="Product Title"
            className="border p-2 rounded"
          />
        </div>
        <div className="mb-2">
          <input
            type="number"
            ref={priceRef}
            placeholder="Product Price"
            className="border p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded"
        >
          Add Product
        </button>
      </form>

      <h2 className="text-xl mb-4">Existing Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="border p-4 rounded shadow-md relative"
          >
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p>Price: ${product.price}</p>
            <button
              onClick={() => handleDelete(product.id)}
              className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded"
            >
              Delete
            </button> 
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
