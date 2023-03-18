import React from "react";
import notFoundImg from "../../Assets/Images/notFound.png";

function ErrorPage() {
  return (
    <div style={{ textAlign: "center" }}>
      <img style={{ width: "40%" }} src={notFoundImg} alt="" />
    </div>
  );
}

export default ErrorPage;
