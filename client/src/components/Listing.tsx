import React from "react";
import ImageCarousel from "./ImageCarousel";
import "./styles.css";

interface ListingProps {
  data: {
    id: number;
    title: string;
    imageUrl: string[];
  }[];
  loading: boolean;
}

const Listing: React.FC<ListingProps> = ({ data, loading }) => {
  return (
    <div style={{ padding: "5px 0" }}>
      {loading ? (
        <div style={{ fontSize: 22 }}>Loading...</div>
      ) : (
        <div className="listContainer">
          {data.map((item) => (
            <div key={item.id} style={{ display: "block" }}>
              <ImageCarousel images={item.imageUrl} />
              <h2 className="title">{item.title}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Listing;
