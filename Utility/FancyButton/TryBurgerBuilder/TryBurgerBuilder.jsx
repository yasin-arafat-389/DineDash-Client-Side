/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import "./TryBurgerBuilder.css";

const TryBurgerBuilder = ({ text }) => {
  return (
    <Link to="/burger-builder">
      <button className="tryburgerbuilder flex items-center gap-3">
        <img src="https://i.ibb.co/7Xx3VWB/burger.png" alt="" />{" "}
        <span className="text-sm md:text-lg">{text}</span>
      </button>
    </Link>
  );
};

export default TryBurgerBuilder;
