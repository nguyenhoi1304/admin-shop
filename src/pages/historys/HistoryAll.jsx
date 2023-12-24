import { useEffect, useState } from "react";
import Datatable from "../../components/datastable/DataTable";
import styles from "./HistoryAll.module.scss";
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
    <div className={styles.home}>
      <Sidebar />
      <div className={styles.homeContainer}>
        <h1 style={{ textAlign: "left" }}>Orders All</h1>
        {data && <Datatable data={data} />}
      </div>
    </div>
  );
};

export default HistoryAll;
