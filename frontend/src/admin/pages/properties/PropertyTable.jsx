import React from "react";
import styles from "./PropertyPage.module.css";
import { IMAGEURL } from "../../../API/Api";

const PropertyTable = ({ properties, onDelete }) => {
  return (
    <table className={`table table-bordered ${styles.table}`}>
      <thead>
        <tr>
          <th>Image</th>
          <th>Name</th>
          <th>Location</th>
          <th>Price</th>
          <th>Category</th>
          <th>Subcategory</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {properties.map((property) => (
          <tr key={property._id}>
            <td><img width={80} src={IMAGEURL + property.images[0]} alt="" /></td>
            <td>{property.name}</td>
            <td>{property.location}</td>
            <td>Rs:{property.price}</td>
            <td>{property.category?.name}</td>
            <td>{property.subcategory?.name}</td>
            <td>
              {/* <button
                className="btn btn-sm btn-warning me-2"
                onClick={()=>{
                  window.location.href = `/admin/properties/edit/${property._id}`
                }}
              >
                Edit
              </button> */}
              <button
                className="btn btn-sm btn-danger"
                onClick={() => onDelete(property._id)}
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

export default PropertyTable;