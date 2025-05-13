import React from "react";
import styles from "./SubcategoryPage.module.css";

const SubcategoryTable = ({ subcategories, onEdit, onDelete }) => {
  return (
    <table className={`table table-bordered ${styles.table}`}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {subcategories.map((subcategory) => (
          <tr key={subcategory._id}>
            <td>{subcategory.name}</td>
            <td>{subcategory.category?.name}</td>
            <td>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => onEdit(subcategory)}
              >
                Edit
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => onDelete(subcategory._id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SubcategoryTable;