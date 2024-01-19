import { Outlet } from "react-router-dom";
import "./App.css";
import Budget from "./components/Budget";
import SideBar from "./components/SideBar";
import Transaction from "./components/Transaction";

function App() {
  return (
    <div className="App">
      <SideBar></SideBar>
      <div className="p-4 sm:ml-64">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
