import React, { useState, useEffect } from "react";
import styles from "./EditCategory.module.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { BASEURL } from "../../../../API/Api";

const EditCategory = () => {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);
  const [existingImage, setExistingImage] = useState("");

  // Fetch category details
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data } = await axios.put(`${BASEURL}v1/category/${id}`, {
          withCredentials: true,
        });
        console.log(data);
        
        setName(data.category.name);
        setExistingImage(data.category.name);
      } catch (error) {
        console.error("Error fetching category:", error);
      }
    };

    fetchCategory();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    if (image) formData.append("image", image); 

    try {
      const { data } = await axios.put(`${BASEURL}v1/category/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      alert(data.message);
    } catch (error) {
      console.error("Error updating category:", error);
      alert("Failed to update category");
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className={`p-4 shadow-lg ${styles.card}`}>
            <h3 className="text-center mb-3">Edit Category</h3>
            <form onSubmit={handleSubmit}>
              {/* Category Name */}
              <div className="mb-3">
                <label className="form-label">Category Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter category name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              {/* Image Upload */}
              <div className="mb-3">
                <label className="form-label">Change Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className={`btn btn-success w-100 ${styles.button}`}>
                Update Category
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;