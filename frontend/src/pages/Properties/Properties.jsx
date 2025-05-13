import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Properties.module.css";
import ListFilter from "../../components/ListFilter/ListFilter";
import PropertyCard from "../../components/PropertyCard/PropertyCard";
import Sidebar from "../../components/Sidebar/Sidebar";
import Pagination from "../../components/Pagination/Pagination";
import { fetchProperties } from "../../Slice/propertiesSlice";
import SketletonCard from "../../components/SkeletonCard/SkeletonCard";

const Properties = () => {
  const dispatch = useDispatch();
  const { properties, pagination, loading, filters } = useSelector((state) => state.property);
  const totalPages = pagination.totalPages;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchProperties(currentPage, filters));
  }, [dispatch, currentPage, filters]);

  return (
    <div className={styles.propertiesPage}>
      <div className={styles.propertiesPageMain}>
        <ListFilter />
        {/* <PropertyCard  />
        <PropertyCard  /> */}
        
        {loading ? (
          <div style={{width: "100%"}}>
            <SketletonCard />
            <SketletonCard />
            <SketletonCard />
          </div>
        ) : (
          properties.map((property) => (
            <PropertyCard key={property._id} property={property} />
          ))
        )}

        <div style={{ display: "flex", justifyContent: "center", width: "100%", margin: "20px 0" }}>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>
      <Sidebar />
    </div>
  );
};

export default Properties;