import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import styles from "./home.module.scss";
import Widget from "../../components/widget/Widget";
import RecentHistory from "../recentHistory/RecentHistory";

const Home = () => {
  return (
    <div className={styles.home}>
      <Sidebar />
      <div className={styles.homeContainer}>
        <Navbar />
        <div className={styles.widgets}>
          <Widget type="user" />
          <Widget type="order" />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <RecentHistory />
      </div>
    </div>
  );
};

export default Home;
