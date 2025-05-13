import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./CreatePropertyPage.module.css";
import { BASEURL } from "../../../API/Api";

const CreatePropertyPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "Temp Desc", // Added default description as per your validation
    location: "",
    currency: "",
    price: "",
    isPriceEnabled: true,
    type: "",
    purpose: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    label: "",
    category: "",
    subcategory: "",
    images: [],
    files: null,
    isFeatured: false,
    isActive: true,
    agent: "",
  });
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [bedRooms, setBedRooms] = useState([]);
  const [bathRooms, setBathRooms] = useState([]);
  const [purpose, setPurpose] = useState([]);
  const [propertyType, setPropertyType] = useState([]);
  const [currency, setCurrency] = useState([]);
  // Fetch categories and subcategories on component mount
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await axios.get(`${BASEURL}v1/category`);
        setCategories(categoriesResponse.data.categories);

        const subcategoriesResponse = await axios.get(
          `${BASEURL}v1/subcategory`
        );
        setSubcategories(subcategoriesResponse.data.subcategories);

        const bedRoomsResponse = await axios.get(
          `${BASEURL}v1/allSubRoutes/bedrooms`
        );
        setBedRooms(bedRoomsResponse.data.bedrooms);

        const bathRoomsResponse = await axios.get(
          `${BASEURL}v1/allSubRoutes/bathrooms`
        );
        setBathRooms(bathRoomsResponse.data.bathrooms);
        const purposeResponse = await axios.get(
          `${BASEURL}v1/allSubRoutes/purposes`
        );
        setPurpose(purposeResponse.data.purposes);
        const propertyTypeResponse = await axios.get(
          `${BASEURL}v1/allSubRoutes/types`
        );
        setPropertyType(propertyTypeResponse.data.types);

        const currencyResponse = await axios.get(
          `${BASEURL}v1/allSubRoutes/currencies`
        );
        setCurrency(currencyResponse.data.currencies);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file uploads
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    console.log("Selected Files:", files); // Log selected files
    setFormData({ ...formData, [name]: files });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate required fields
    if (
      !formData.name ||
      !formData.location ||
      !formData.price ||
      !formData.type ||
      !formData.purpose ||
      !formData.bedrooms ||
      !formData.bathrooms ||
      !formData.area ||
      !formData.category ||
      !formData.subcategory ||
      formData.images.length === 0 ||
      !formData.currency
    ) {
      setError(
        "Please fill all required fields and upload at least one image."
      );
      setLoading(false);
      return;
    }

    const data = new FormData();

    // Append all form fields
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("location", formData.location);
    data.append("currency", formData.currency);
    data.append("price", formData.price);
    data.append("isPriceEnabled", formData.isPriceEnabled);
    data.append("type", formData.type);
    data.append("purpose", formData.purpose);
    data.append("bedrooms", formData.bedrooms);
    data.append("bathrooms", formData.bathrooms);
    data.append("area", formData.area);
    data.append("label", formData.label);
    data.append("category", formData.category);
    data.append("subcategory", formData.subcategory);
    data.append("isFeatured", formData.isFeatured);
    data.append("isActive", formData.isActive);
    data.append("agent", formData.agent);

    // Append images
    Array.from(formData.images).forEach((file) => {
      data.append("images", file);
    });

    // Append PDF file if exists
    if (formData.files) {
      data.append("files", formData.files[0]);
    }

    try {
      await axios.post(`${BASEURL}v1/property`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Property created successfully!");
      navigate("/admin/properties");
    } catch (error) {
      console.error("Failed to create property:", error);
      setError("Failed to create property. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`container ${styles.pageContainer}`}>
      <h1 className="my-4">Create New Property</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        {/* Required Fields */}
        <div className="row">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Name *"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Location *"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <select
              className="form-control mb-3"
              name="currency"
              value={formData.currency}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Currency *</option>
              {currency.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.code}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <input
              type="number"
              className="form-control mb-3"
              placeholder="Price *"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-4 d-flex align-items-center">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                name="isPriceEnabled"
                checked={formData.isPriceEnabled}
                onChange={handleInputChange}
                id="priceEnabled"
              />
              <label className="form-check-label" htmlFor="priceEnabled">
                Price Enabled
              </label>
            </div>
          </div>
          <div className="col-md-4">
            <select
              className="form-control mb-3"
              name="purpose"
              value={formData.purpose}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Purpose *</option>
              {purpose.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <select
              className="form-control mb-3"
              name="type"
              value={formData.type}
              onChange={handleInputChange}
              required
            >
              <option value="">Property Type *</option>
              {propertyType.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <select
              className="form-control mb-3"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Bedrooms *</option>
              {bedRooms.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.count}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <select
              className="form-control mb-3"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Bathrooms *</option>
              {bathRooms.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.count}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <input
              type="number"
              className="form-control mb-3"
              placeholder="Area (sq ft) *"
              name="area"
              value={formData.area}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-6">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Label"
              name="label"
              value={formData.label}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <select
              className="form-control mb-3"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Category *</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <select
              className="form-control mb-3"
              name="subcategory"
              value={formData.subcategory}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Subcategory *</option>
              {subcategories.map((sub) => (
                <option key={sub._id} value={sub._id}>
                  {sub.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <input
              type="file"
              className="form-control mb-3"
              name="images"
              onChange={handleFileChange}
              multiple
              required
            />
            <small className="text-muted">
              * At least one image is required
            </small>
          </div>
          <div className="col-md-6">
            <input
              type="file"
              className="form-control mb-3"
              name="files"
              onChange={handleFileChange}
            />
            <small className="text-muted">PDF file (optional)</small>
          </div>
        </div>
        <button type="submit" className="btn btn-success" disabled={loading}>
          {loading ? "Creating..." : "Create Property"}
        </button>
      </form>
    </div>
  );
};

export default CreatePropertyPage;
