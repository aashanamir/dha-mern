import React, { useEffect, useState } from "react";
import axios from "axios";
import PropertyTable from "./PropertyTable.jsx";
import styles from "./PropertyPage.module.css";
import { BASEURL } from "../../../API/Api.js";
import { Link } from "react-router-dom";

const PropertyPage = () => {
  const [properties, setProperties] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: "",
    subcategory: "",
    minPrice: "",
    maxPrice: "",
  });
  const [sortOrder, setSortOrder] = useState("asc"); 

  useEffect(() => {
    fetchProperties();
    fetchCategories();
    fetchSubcategories();
  }, []);

  // Fetch all properties with filters and sorting
  const fetchProperties = async () => {
    try {
      const { data } = await axios.get(`${BASEURL}v1/property`, {
        params: {
          ...filters,
          sortBy: "price",
          sortOrder,
        },
      });
      setProperties(data.properties);
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(`${BASEURL}v1/category`);
      setCategories(data.categories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  // Fetch all subcategories
  const fetchSubcategories = async () => {
    try {
      const { data } = await axios.get(`${BASEURL}v1/subcategory`);
      setSubcategories(data.subcategories);
    } catch (error) {
      console.error("Failed to fetch subcategories:", error);
    }
  };

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  // Apply filters
  const applyFilters = () => {
    fetchProperties();
  };

  // Handle sort order change
  const handleSortOrderChange = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    fetchProperties();
  };

  // Handle delete property
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this property?")) {
      try {
        await axios.delete(`${BASEURL}v1/property/${id}`);
        fetchProperties(); // Refresh the properties list
      } catch (error) {
        console.error("Failed to delete property:", error);
      }
    }
  };

  return (
    <div className={`container ${styles.pageContainer}`}>
      <h1 className="my-4">Properties</h1>

      <Link to={'/admin/properties/create'} className="btn btn-secondary">Create New Property</Link>

      {/* Filters Section */}
      <div className={`card mb-4 ${styles.filtersCard}`}>
        <div className="card-body">
          <h5 className="card-title">Filters</h5>
          <div className="row">
            <div className="col-md-3">
              <select
                className="form-control"
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <select
                className="form-control"
                name="subcategory"
                value={filters.subcategory}
                onChange={handleFilterChange}
              >
                <option value="">Select Subcategory</option>
                {subcategories.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Min Price"
                name="minPrice"
                value={filters.minPrice}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-2">
              <input
                type="number"
                className="form-control"
                placeholder="Max Price"
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-2">
              <button
                className="btn btn-primary w-100"
                onClick={applyFilters}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Sort Button */}
      <div className="mb-4">
        <button
          className="btn btn-secondary"
          onClick={handleSortOrderChange}
        >
          Sort by Price ({sortOrder === "asc" ? "Low to High" : "High to Low"})
        </button>
      </div>

      {/* Properties Table */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <PropertyTable
          properties={properties}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default PropertyPage;