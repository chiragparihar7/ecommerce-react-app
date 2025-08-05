import { useEffect, useState } from "react";
import DataService from "../../../config/DataService";
import { API } from "../../../config/API";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartQuantities, setCartQuantities] = useState({});
  const userToken = useSelector((state) => state.user.token);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await DataService(userToken).get(API.USER_GET_ALL_PRODUCTS);
        setProducts(res.data.products || []);
      } catch (error) {
        console.error("❌ Failed to fetch products", error?.response?.data || error.message);
        toast.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [userToken]);

  const handleAddToCart = async (e, productId) => {
    e.stopPropagation();
    try {
      const res = await DataService(userToken).post(API.ADD_TO_CART, {
        productId,
        quantity: 1,
      });
      const itemId = res.data.cartItemId || productId;
      setCartQuantities((prev) => ({
        ...prev,
        [productId]: { quantity: 1, itemId },
      }));
      toast.success("Added to cart ✅");
    } catch (error) {
      console.error("❌ Add to cart failed:", error.response?.data || error.message);
      toast.error("Failed to add to cart");
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
     if (newQuantity < 1) return;
     try {
       await DataService(userToken).patch(API.USER_CART_UPDATE(itemId), {
         quantity: newQuantity,
       });
       fetchCart();
     } catch (err) {
       console.error("❌ Update quantity error:", err?.response?.data || err.message);
     }
   };

  const increment = (e, productId) => {
    e.stopPropagation();
    const currentQty = cartQuantities[productId]?.quantity || 1;
    updateQuantity(cartQuantities[productId]?.itemId, currentQty + 1);
  };

  const decrement = (e, productId) => {
    e.stopPropagation();
    const currentQty = cartQuantities[productId]?.quantity || 1;
    if (currentQty > 1) {
      updateQuantity(productId, currentQty - 1);
    }
  };

  const goToProductDetail = (id) => {
    navigate(`/products/${id}`);
  };

  return (
    <section className="px-6 py-10 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">🛍️ Our Products</h2>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-white p-4 rounded-lg shadow animate-pulse">
              <div className="h-48 bg-gray-200 rounded mb-4"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-300 rounded w-1/2 mb-4"></div>
              <div className="h-8 bg-gray-200 rounded w-full"></div>
            </div>
          ))}
        </div>
      ) : products.length === 0 ? (
        <p className="text-gray-500">No products available</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => {
            const quantity = cartQuantities[product._id]?.quantity || 0;
            const imageUrl =
              product.images?.length > 0
                ? `${API.BASE_URL}/${product.images[0].replace(/^\/+/, "")}`
                : "https://via.placeholder.com/300x200";

            return (
              <div
                key={product._id}
                onClick={() => goToProductDetail(product._id)}
                className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition cursor-pointer"
              >
                <div className="relative w-full pb-[75%] bg-gray-100 rounded-md overflow-hidden mb-3">
                  <img
                    src={imageUrl}
                    alt={product.name}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                  />
                </div>

                <h3 className="text-lg font-semibold hover:underline">{product.name}</h3>
                <p className="text-gray-600 text-sm truncate">{product.description}</p>
                <p className="mt-2 text-blue-600 font-bold">₹{product.price}</p>

                <div className="mt-4">
                  {quantity === 0 ? (
                    <button
                      className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                      onClick={(e) => handleAddToCart(e, product._id)}
                    >
                      Add to Cart
                    </button>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <button
                        className="bg-gray-300 px-2 py-1 rounded text-xl"
                        onClick={(e) => decrement(e, product._id)}
                      >
                        -
                      </button>
                      <span className="text-lg font-semibold">{quantity}</span>
                      <button
                        className="bg-gray-300 px-2 py-1 rounded text-xl"
                        onClick={(e) => increment(e, product._id)}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};

export default ProductList;
