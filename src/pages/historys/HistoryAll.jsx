import { useEffect, useState } from "react";
import Datatable from "../../components/datastable/DataTable";
import "./HistoryAll.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import HistoryAPI from "../../API/HistoryAPI";
const HistoryAll = () => {
  const [data, setData] = useState();
  useEffect(() => {
    const getHistoryAll = async () => {
      const result = await HistoryAPI.getHistoryOrderAPI();
      setData(result);
    };
    getHistoryAll();
  }, []);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <h1 style={{ textAlign: "left" }}>Orders All</h1>
        {data && <Datatable data={data} />}
      </div>
    </div>
  );
};

export default HistoryAll;
