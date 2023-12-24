import styles from "./widget.module.scss";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountBalanceWalletOutlinedIcon from "@mui/icons-material/AccountBalanceWalletOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";

import { useEffect, useState } from "react";
import UserAPI from "../../API/UserAPI";
import HistoryAPI from "../../API/HistoryAPI";

const Widget = ({ type }) => {
  const [amountUser, setAmountUser] = useState();
  const [amountOrders, setAmountOrders] = useState();
  let data1;

  useEffect(() => {
    const getApiUser = async () => {
      const result = await UserAPI.getAllData();
      setAmountUser(result);
    };
    getApiUser();
  }, []);

  useEffect(() => {
    const getApiOrders = async () => {
      const result = await HistoryAPI.getHistoryOrderAPI();
      setAmountOrders(result);
    };
    getApiOrders();
  }, []);

  const number = [];
  amountOrders?.map((item) => {
    return number.push(item.total);
  });
  // Số lượng users
  const countUsers = amountUser?.length;

  // Số lượng order
  const countOrders = amountOrders?.length;

  //Tổng số danh thu
  let totalRevenue =
    number.length > 0 && number?.reduce((cur, prev) => cur + prev);
  //danh thu TB hằng tháng
  let AverageRevenue = (totalRevenue / 30).toFixed(3);

  //Chuyển đổi các thông tin số có dấu phẩy ngăn cách
  AverageRevenue = parseInt(AverageRevenue).toLocaleString();
  totalRevenue = parseInt(totalRevenue).toLocaleString();

  switch (type) {
    case "user":
      data1 = {
        title: "USERS",
        isMoney: false,
        countUsers: countUsers,
        icon: (
          <PersonOutlinedIcon
            className="icon"
            style={{
              color: "crimson",
              backgroundColor: "rgba(255, 0, 0, 0.2)",
            }}
          />
        ),
      };
      break;
    case "order":
      data1 = {
        title: "ORDERS",
        countOrders: countOrders,
        isMoney: false,
        icon: (
          <ShoppingCartOutlinedIcon
            className={styles.icon}
            style={{
              backgroundColor: "rgba(218, 165, 32, 0.2)",
              color: "goldenrod",
            }}
          />
        ),
      };
      break;
    case "earning":
      data1 = {
        title: "EARNINGS",
        totalRevenue: totalRevenue,
        isMoney: true,
        icon: (
          <MonetizationOnOutlinedIcon
            className={styles.icon}
            style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
          />
        ),
      };
      break;
    case "balance":
      data1 = {
        title: "EARNINGS OF MONTH",
        AverageRevenue: AverageRevenue,
        isMoney: true,
        icon: (
          <AccountBalanceWalletOutlinedIcon
            className={styles.icon}
            style={{
              backgroundColor: "rgba(128, 0, 128, 0.2)",
              color: "purple",
            }}
          />
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className={styles.widget}>
      <div className={styles.left}>
        <span className={styles.title}>{data1.title}</span>
        <span className={styles.counter}>
          {data1.isMoney && "$"} {data1.countUsers} {data1.countOrders}{" "}
          {data1.totalRevenue}
          {data1.AverageRevenue}
        </span>
        <span className={styles.link}>{data1.link}</span>
      </div>
      <div className={styles.right}>
        <div className={`${styles.percentage} ${styles.positive}`}></div>
        {data1.icon}
      </div>
    </div>
  );
};

export default Widget;
