import React, { useEffect, useState } from "react";
import { getUserFullDetails} from "../api/api";
import "../index.css";

const Header = () => {
  const [user, setUser] = useState("");

  getUserFullDetails().then((res) => {
    setUser(res.name);
  })

  return (
    <>
      <div className="wrapper-header">
        <div>Otter Space</div>
        <div className="hello-user">
          Hello {user}
        </div>
      </div>
    </>
  );
};

export default Header;
