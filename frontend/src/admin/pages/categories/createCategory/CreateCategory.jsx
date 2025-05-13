import React, { useState } from "react";
import styles from "./CreateCategory.module.css";
import axios from "axios";
import { BASEURL } from "../../../../API/Api";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("image", image);

    try {
      const { data } = await axios.post(BASEURL + "v1/category/", formData, {
        headers: {
          "Content-Type": "multipart/form-data", 
        },
        withCredentials: true,
      });
      alert(data.message);
      setName("");
      setImage(null);
    }catch(e){
      console.log(e)
      alert("Failed to create category")
    }
  };

  return (
    <div className="container mt-4">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className={`p-4 shadow-lg ${styles.card}`}>
            <h3 className="text-center mb-3">Create Category</h3>
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
                <label className="form-label">Category Image</label>
                <input
                  type="file"
                  className="form-control"
                  onChange={(e) => setImage(e.target.files[0])}
                  required
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className={`btn btn-primary w-100 ${styles.button}`}>
                Create Category
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateCategory;
