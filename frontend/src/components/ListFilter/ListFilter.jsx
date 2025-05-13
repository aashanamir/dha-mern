import React from "react";
import styles from "./ListFilter.module.css";
import { FaList } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setFilters } from "../../Slice/propertiesSlice";

const ListFilter = () => {
  const dispatch = useDispatch();

  const handleSortChange = (e) => {
    dispatch(setFilters({ sortBy: e.target.value })); // Dispatch sorting change
  };

  return (
    <div className={styles.listFilterContainer}>
      <h2 className={styles.heading}>Properties for sale in UAE</h2>
      <div className={styles.controls}>
        <div></div>
        <div className={styles.viewButtons}>
          <select
            className={`${styles.dropdownSelect} ${styles.active}`}
            onChange={handleSortChange}
          >
            <option value="price-low-high">Price: Low to High</option>
            <option value="price-high-low">Price: High to Low</option>
          </select>
          <button className={`${styles.viewButton}`}>
            <FaList /> List
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListFilter;