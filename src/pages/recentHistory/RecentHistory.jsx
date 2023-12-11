import { useEffect, useState } from "react";
import Datatable from "../../components/datastable/DataTable";
import "./RecentHistory.scss";
import HistoryAPI from "../../API/HistoryAPI";

const RecentHistory = (props) => {
  const [data, setData] = useState();

  useEffect(() => {
    const getRecentHistory = async () => {
      const result = await HistoryAPI.getHistoryOrderAPI();

      //Lấy ra 10 giao dịch gần nhất từ dưới lên
      setData(result.slice(-10));
    };
    getRecentHistory();
  }, []);

  return (
    <div className="listContainer">
      <h1 style={{ textAlign: "left", marginTop: "20px" }}>
        10 Recent Transactions
      </h1>
      <Datatable data={data} />
    </div>
  );
};

export default RecentHistory;
