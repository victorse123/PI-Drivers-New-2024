/* eslint-disable react/prop-types */

import SingleCard from "../singleCard/singleCard.component.jsx";
import Pagination from "../../components/pagination/pagination.component.jsx";

import s from "./cardsContainer.module.css";
import { useSelector } from "react-redux";

export default function CardsContainer({drivers}) {
  const driversPerPage = 9;

  const currentPage = useSelector((state) => state.currentPage)

  const lastIndex = currentPage * driversPerPage  
  const firstIndex = lastIndex - driversPerPage  

  return (
    <div className={s.MainContainer}>
      <div className={s.CardsContainer}>
        {drivers?.map((driver) => (
          <SingleCard driver={driver} key={driver.id} />
        )).slice(firstIndex, lastIndex)}
      </div>
      <Pagination driversPerPage={driversPerPage} drivers={drivers} />
    </div>
  );
}
