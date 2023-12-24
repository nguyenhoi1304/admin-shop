import React, { useEffect, useState } from "react";
import styles from "./Usersall.module.scss";
import UserAPI from "../../API/UserAPI";
import Sidebar from "../../components/sidebar/Sidebar";
const Usersall = () => {
  const tables = ["Id", "Name", "Password", "Email", "role"];
  const [data, setData] = useState();
  const [page, setPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState();
  const limit = 3;
  useEffect(() => {
    const fetchApiUsers = async () => {
      const users = await UserAPI.getAllData(page, limit);
      setData(users.users);
      setTotalUsers(users.totalUsers);
    };
    fetchApiUsers();
  }, [page]);

  //Làm tròn tổng số
  const totalPage = Math.ceil(totalUsers / limit);

  let indexPage = [];
  //Tạo ra số nút bấm cho từng trang
  for (var i = 1; i <= totalPage; i++) {
    indexPage.push(parseInt(i));
  }

  return (
    <div className={styles.home}>
      <Sidebar />
      <div className={styles.homeContainer}>
        <section style={{ marginTop: "50px" }}>
          <hr />
          <div className={styles.title_hotel}>
            <h1>User List</h1>
          </div>
          <table className={styles.table}>
            <tr>
              {tables.map((item) => (
                <th>{item}</th>
              ))}
            </tr>
            {data?.map((item, index) => (
              <tr key={index}>
                <td>{item._id}</td>
                <td>{item.fullName}</td>
                <td>{item.password}</td>
                <td>{item.email}</td>
                <td>{item.role}</td>
              </tr>
            ))}
          </table>
        </section>
        {data && (
          <div className={styles.btn_move}>
            <button
              className={styles.btn_prev}
              onClick={() => setPage(parseInt(page) - 1)}
              disabled={parseInt(page) === 1}
            >
              prev
            </button>
            {indexPage &&
              indexPage.map((number) => (
                <>
                  <button
                    className={
                      number === parseInt(page)
                        ? styles["page_item_users"] + " " + styles.active
                        : styles["page_item_users"]
                    }
                    name={number}
                    onClick={(e) => {
                      setPage(e.target.value);
                    }}
                    value={number}
                  >
                    {number}
                  </button>
                </>
              ))}
            <button
              className={styles.btn_next}
              onClick={() => setPage(parseInt(page) + 1)}
              disabled={parseInt(page) === totalPage}
            >
              next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Usersall;
