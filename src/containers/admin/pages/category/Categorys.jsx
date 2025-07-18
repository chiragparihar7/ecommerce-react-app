import React, { useState } from "react";
import Header from "../../../../components/Header";
import "./Category.css";

const Categorys = () => {
  const [categories, setCategories] = useState([
    {
      id: 1,
      name: "Electronics",
      description: "Devices like phones, laptops, TVs, etc.",
    },
    {
      id: 2,
      name: "Clothes",
      description: "Men's, women's, and kids' apparel.",
    },
    {
      id: 3,
      name: "Watch",
      description: "Wristwatches of all styles and brands.",
    },
    {
      id: 4,
      name: "Kitchen",
      description: "Cooking tools, utensils, and appliances.",
    },
  ]);

  const handleRemove = (id) => {
    const updated = categories.filter((cat) => cat.id !== id);
    setCategories(updated);
  };

  return (
    <>
      <Header />
      <div className="category-container">
        <div className="category-header">
          <h1>Category Management</h1>
          <button className="add-category-btn">+ Add Category</button>
        </div>

        <div className="category-table-wrapper">
          <table className="category-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Category</th>
                <th>Description</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={category.id}>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td>{category.description}</td>
                  <td>
                    <button
                      className="remove-btn"
                      onClick={() => handleRemove(category.id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center", padding: "20px" }}>
                    No categories available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Categorys;
