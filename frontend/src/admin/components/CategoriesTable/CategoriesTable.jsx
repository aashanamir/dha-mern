import React from "react";
import styles from "./CategoriesTable.module.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IMAGEURL } from "../../../API/Api";

const CategoriesTable = ({ categories, onEdit, onDelete }) => {
  return (
    <div className={`container ${styles.tableContainer}`}>
      <table className="table table-striped table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length > 0 ? (
            categories.map((category, index) => (
              <tr key={category._id}>
                <td>{index + 1}</td>
                <td>
                  <img
                    src={IMAGEURL + category.image}
                    alt={category.name}
                    className={styles.categoryImage}
                  />
                </td>
                <td>{category.name}</td>
                <td>
                  <Link to={`/admin/category/edit/${category._id}`} className="btn btn-primary me-2">
                    <FaEdit /> Edit
                  </Link>
                  <button
                    className="btn btn-danger"
                    onClick={() => onDelete(category._id)}
                  >
                    <FaTrash /> Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No categories found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoriesTable;