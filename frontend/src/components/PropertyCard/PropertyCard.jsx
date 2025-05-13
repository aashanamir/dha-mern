import React from "react";
import Slider from "react-slick";
import styles from "./PropertyCard.module.css";
import { FaBed, FaBath, FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail, MdCall } from "react-icons/md";
import { FaWhatsapp } from "react-icons/fa";
import { IMAGEURL } from "../../API/Api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const PropertyCard = ({ property }) => {

  console.log(property);
  
  const images = property?.images?.length
    ? property?.images
    : ["/assets/images/property-1.jpeg"];

    const settings = {
      dots: images.length > 1, // Show dots only if multiple images
      infinite: images.length > 1,
      speed: 800,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: images.length > 1,
      autoplaySpeed: 3000,
      arrows: images.length > 1,
      adaptiveHeight: true,
      customPaging: (i) => <div className={styles.customDot} />,
      appendDots: (dots) => (
        <div className={styles.dotsContainer}>
          <ul style={{ margin: "0px", padding: "0px" }}> {dots} </ul>
        </div>
      ),
    };
    
    

  return (
    <div className={styles.card}>
      {/* Image Carousel */}
      <div className={styles.imageContainer}>
        <Slider {...settings}>
          {images.map((img, index) => (
            <div key={index} className={styles.imageWrapper}>
              <img
                src={IMAGEURL + img}
                alt={`Property ${index + 1}`}
                className={styles.propertyImage}
              />
            </div>
          ))}
        </Slider>

        {/* Badges */}
        <div className={styles.badges}>
          <span className={styles.badge}>TruCheck™</span>
          <span className={styles.badge}>Off-Plan</span>
          <span className={styles.badge}>Initial Sale</span>
        </div>
        <div className={styles.favorite}>&hearts;</div>
      </div>

      {/* Property Details */}
      <div className={styles.details}>
        <h2 className={styles.price}>
          {property?.currency?.code} <strong>{property?.price?.toLocaleString() || "N/A"}</strong>
        </h2>
        <div className={styles.specs}>
          <span>{property?.type?.name || "Unknown Type"}</span>
          <span className={styles.detailsNormal}>|</span>
          <FaBed /> {property?.bedrooms?.count || 0}
          <span className={styles.detailsNormal}>|</span>
          <FaBath /> {property?.bathrooms?.count || 0}
          <span className={styles.detailsNormal}>|</span>
          <span>
            Area: <span>{property?.area || 0} sqft</span>
          </span>
        </div>
        <p className={styles.description}>
          {property?.label || "No description available."}
        </p>
        <p className={styles.location}>
          <FaMapMarkerAlt /> {property?.location || "Unknown Location"}
        </p>
        <div className={styles.authenticity}>
          Property authenticity was validated on <strong>18th of March</strong>
        </div>
        <div className={styles.extraInfo}>
          <div className={styles.tag}>
            HANDOVER <strong>Q1 2026</strong>
          </div>
          <div className={styles.tag}>
            PAYMENT PLAN <strong>60/40</strong>
          </div>
        </div>
        <div className={styles.contactButtons}>
          <button className={styles.email}>
            <MdEmail /> Email
          </button>
          <button className={styles.call}>
            <MdCall /> Call
          </button>
          <button className={styles.whatsapp}>
            <FaWhatsapp />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
