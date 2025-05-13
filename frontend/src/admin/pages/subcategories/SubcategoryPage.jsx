import React, { useEffect, useState } from "react";
import axios from "axios";
import SubcategoryTable from "./SubcategoryTable";
import styles from "./SubcategoryPage.module.css";
import { BASEURL } from "../../../API/Api";
import Pagination from "../../../components/Pagination/Pagination";

const SubcategoryPage = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [editId, setEditId] = useState(null); // Track the subcategory being edited
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  // Fetch all subcategories and categories on component mount
  useEffect(() => {
    fetchSubcategories(currentPage);
    fetchCategories();
  }, [currentPage]);

  // Fetch all subcategories
  const fetchSubcategories = async (page = 1) => {
    try {
      const { data } = await axios.get(
        BASEURL + `v1/subcategory?page=${page}&limit=${limit}`
      );
      console.log(data);

      setSubcategories(data.subcategories);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Failed to fetch subcategories:", error);
    }
  };

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const { data } = await axios.get(BASEURL + "v1/category");
      setCategories(data.categories);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  // Handle form submission (create or update subcategory)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const subcategoryData = { name, category };

    try {
      if (editId) {
        // Update existing subcategory
        await axios.put(BASEURL + `v1/subcategory/${editId}`, subcategoryData);
        setEditId(null); // Reset edit mode
      } else {
        // Create new subcategory
        await axios.post(BASEURL + "v1/subcategory", subcategoryData);
      }

      // Refresh the subcategories list
      fetchSubcategories();

      // Clear the form
      setName("");
      setCategory("");
    } catch (error) {
      console.error("Failed to save subcategory:", error);
    }
  };

  // Handle edit button click
  const handleEdit = (subcategory) => {
    setName(subcategory.name);
    setCategory(subcategory.category._id);
    setEditId(subcategory._id);
  };

  // Handle delete button click
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this subcategory?")) {
      try {
        await axios.delete(BASEURL + `v1/subcategory/${id}`);
        fetchSubcategories(); // Refresh the subcategories list
      } catch (error) {
        console.error("Failed to delete subcategory:", error);
      }
    }
  };

  return (
    <div className={`container ${styles.pageContainer}`}>
      <h1 className="my-4">Subcategories</h1>

      {/* Create/Edit Subcategory Form */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="row">
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Subcategory Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="col-md-4">
            <select
              className="form-control"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-4">
            <button type="submit" className="btn btn-primary w-100">
              {editId ? "Update Subcategory" : "Create Subcategory"}
            </button>
          </div>
        </div>
      </form>

      {/* Subcategories Table */}
      <SubcategoryTable
        subcategories={subcategories}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      {pagination.totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pagination={pagination}
        />
      )}
    </div>
  );
};

export default SubcategoryPage;