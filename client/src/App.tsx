import React, { useState, useEffect, useCallback } from "react";
import Listing from "./components/Listing";
import Pagination from "./components/Pagination";

interface IData {
  totalItems: number;
  totalPages: number;
  pageSize: number;
  items: IScapedData[];
}
interface IScapedData {
  id: number;
  title: string;
  imageUrl: string[];
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [data, setData] = useState<IData>({
    totalItems: 500,
    totalPages: 25,
    pageSize: 20,
    items: [],
  });
  const [loading, setLoading] = useState(false);

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const req = await fetch(`/api/scrapedData?page=${currentPage}`);
      const res: IData = await req.json();
      setData(res);
      console.log("====================================");
      console.log("res:: ", res);
      console.log("====================================");
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [currentPage]);

  useEffect(() => {
    getData();
  }, [getData]);

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>Scraped Flats (Sell)</h1>
      <Listing data={data.items} loading={loading} />
      <Pagination
        totalPages={data.totalPages}
        currentPage={currentPage}
        onPageChange={handlePageClick}
      />
    </div>
  );
};

export default App;
