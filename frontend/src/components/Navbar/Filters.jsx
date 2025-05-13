import React, { useState, useEffect } from "react";
import styles from "./Filters.module.css";
import { FaMapMarkerAlt, FaSlidersH, FaInfoCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setFilters } from "../../Slice/propertiesSlice";

const Filters = () => {
  const dispatch = useDispatch();
  const [filters, setLocalFilters] = useState({
    type: "buy",
    location: "",
    propertyType: "all",
    beds: "1",
    baths: "1",
  });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setLocalFilters((prev) => {
      const updatedFilters = { ...prev, [name]: value };
      dispatch(setFilters(updatedFilters)); // Dispatch on every change
      return updatedFilters;
    });
  };

  useEffect(() => {
    dispatch(setFilters(filters)); // Dispatch whenever filters change
  }, [filters, dispatch]);

  return (
    <div className={styles.filtersContainer}>
      <div className={styles.container}>
        <div className={styles.filterRow}>
          <select
            name="type"
            className={styles.dropdownSelect}
            value={filters.type}
            onChange={handleFilterChange}
          >
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>

          <div className={styles.inputBox}>
            <FaMapMarkerAlt className={styles.icon} />
             <input
              type="text"
              name="location"
              placeholder="Enter location"
              value={filters.location}
              onChange={handleFilterChange}
              style={{width: "100%" , height: "100%" , border: "none", outline: "none"}}
            /> 
          </div>

          <div className={styles.optionButtons}>
            {["all", "ready", "off-plan"].map((type) => (
              <button
                key={type}
                className={filters.propertyType === type ? styles.active : ""}
                onClick={() =>
                  setLocalFilters((prev) => {
                    const updatedFilters = { ...prev, propertyType: type };
                    dispatch(setFilters(updatedFilters));
                    return updatedFilters;
                  })
                }
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>

          <select
            name="beds"
            className={styles.dropdownSelect}
            value={filters.beds}
            onChange={handleFilterChange}
          >
            <option value="1">1 Bed</option>
            <option value="2">2 Beds</option>
            <option value="3">3 Beds</option>
          </select>

          <select
            name="baths"
            className={styles.dropdownSelect}
            value={filters.baths}
            onChange={handleFilterChange}
          >
            <option value="1">1 Bath</option>
            <option value="2">2 Baths</option>
            <option value="3">3 Baths</option>
          </select>

          <button className={styles.moreFilters}>
            <FaSlidersH />
          </button>
        </div>

        <div className={styles.filterRow}>
          <button className={styles.infoButton}>
            TruCheck™ listings first <FaInfoCircle />
          </button>
          <button className={styles.infoButton}>
            Properties with floor plans <FaInfoCircle />
          </button>
          <span className={styles.saveSearch}>Save Search</span>
        </div>
      </div>
    </div>
  );
};

export default Filters;