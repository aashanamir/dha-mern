import React, { useEffect, useState } from "react";
import axios from "axios";
import CategoriesTable from "../../components/CategoriesTable/CategoriesTable";
import { BASEURL } from "../../../API/Api";
import Pagination from "../../../components/Pagination/Pagination";
import { Link, useNavigate  } from "react-router-dom";

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5;

  const navigate = useNavigate();

  const fetchAllCategories = async (page = 1) => {
    try {
      const { data } = await axios.get(
        `${BASEURL}v1/category?page=${page}&limit=${limit}`,
        {
          withCredentials: true,
        }
      );

      setCategories(data.categories);
      setPagination(data.pagination);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchAllCategories(currentPage);
  }, [currentPage]);


  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await axios.delete(`${BASEURL}v1/category/${id}`, {
          withCredentials: true,
        });
        fetchAllCategories(currentPage); // Refresh data
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  return (
    <div className="container mt-4">
      <div className="row mb-4">
      <h2>All Categories</h2>
      <Link to="/admin/category/create" className="btn btn-primary">
        Create Category
      </Link>
      </div>
      <CategoriesTable
        categories={categories}
        onDelete={handleDelete}
      />

      {/* Pagination Component */}
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

export default AllCategories;
