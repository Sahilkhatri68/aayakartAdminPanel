import "./App.css";
import MiniDrawer from "./components/Drawer";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import React from "react";

// import Login from "./components/Login";
import axios from "axios";
import Login from "./components/Login"; 

axios.defaults.withCredentials = true;

function App() {
  let navigate = useNavigate();

  const [logged, setLogged] = useState();
  React.useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_URL}/login/check_have_token`).then((response) => {
      setLogged(response.data);
    });
  }, []);

  console.log(process.env.REACT_APP_BACKEND_URL);
  return (
    <div className="App">
      {logged ? <MiniDrawer/> : <Login/>}
    </div>
  );
}

export default App;
