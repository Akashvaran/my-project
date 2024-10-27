import { useState } from "react";
import { OrderProducts } from "../allorders/Userorder";
import { Addtocart } from "./Addtocart";
import "./Maincart.css";

export const Maincart = () => {
  const [activeComponent, setActiveComponent] = useState("addCart");

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  return (
    <div className="maincart-container">
      <ul className="maincart-button-group">
        <li
          className={`maincart-tab-button ${activeComponent === "addCart" ? "active" : ""}`}
          onClick={() => handleComponentChange("addCart")}
        >
          Cart Product
        </li>
        <li
          className={`maincart-tab-button ${activeComponent === "orderProduct" ? "active" : ""}`}
          onClick={() => handleComponentChange("orderProduct")}
        >
          Order Product
        </li>
      </ul>

      <div className="maincart-component-display">
        {activeComponent === "addCart" && <Addtocart />}
        {activeComponent === "orderProduct" && <OrderProducts />}
      </div>
    </div>
  );
};

