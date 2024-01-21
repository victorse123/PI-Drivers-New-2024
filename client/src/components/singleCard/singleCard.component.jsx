/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import s from "./singleCard.module.css";

function SingleCard({driver, currentPage}) {
  const { id, forename, surname, image, teams, Teams, createdInDB } = driver;

  const DBteamsToString = () => {
    if (createdInDB === true) {
      return Teams.map((team) => team.name).join(", ");
    }

    if (createdInDB === false) {
      return teams;
    }
  };

  return (
    <NavLink className={s.CardContainer} to={`/driver/${id}?currentPage=${currentPage}`}>
      <div>
        <div className={s.cardImage}>
          <img src={image} alt="driver-image" />
        </div>
        <div className={s.cardHeader}>
            <h4>{`${forename} ${surname}`}</h4>
        </div>
        <p className={s.teamsTitle}>Escuderías</p>
        <p className={s.teams}>{DBteamsToString()}</p>
      </div>
    </NavLink>
  );
}

export default SingleCard;
