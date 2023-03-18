import ContentLoader from "react-content-loader";
import classes from "./MyLoader.module.css";

const MyLoader = () => (
  <div className={classes.gameItem}>
    <ContentLoader
      viewBox="0 0 100 100"
      backgroundColor="#aaa"
      foregroundColor="#7a8288"
    >
      {/* Only SVG shapes */}
      {/* <rect x="0" y="0" rx="5" ry="5" width="70" height="70" />
    <rect x="80" y="17" rx="4" ry="4" width="300" height="13" />
    <rect x="80" y="40" rx="3" ry="3" width="250" height="10" /> */}
      <rect x="0" y="0" rx="5" ry="5" width="100" height="99" />
    </ContentLoader>
  </div>
);

export default MyLoader;
