// eslint-disable-next-line no-unused-vars
import axios from 'axios'
import { useParams } from "react-router-dom";
import s from "./detail.module.css";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { setSearched } from '../../redux/actions.js';

function Detail() {
  const { id } = useParams();
  const [driver, setDriver] = useState({})
  const [isLoading, setIsLoading] = useState(true);
  const [nationalityFlag, setNationalityFlag] = useState("")

  const dispatch = useDispatch()

  async function getNationalityFlag(id) {
      try {
        const { data } = await axios.get(
          `http://localhost:3001/drivers/flag/${id}`
        );

        return setNationalityFlag(data)
      } catch (error) {
        console.error(error);
      }
  }
  
  useEffect(() => {
    const fetchDriverData = () => {

      setIsLoading(true)
      
      getNationalityFlag(id)
        .then(() => {
          return axios.get(`http://localhost:3001/drivers/${id}`);
        })
        .then((response) => {
          setDriver(response.data);
          setIsLoading(false)
        })
        .catch((error) => {
          console.error(error);
          setIsLoading(false)
        })
    }

    fetchDriverData();
    
    return () => {
      setNationalityFlag("");
    };
  }, [id]);

  const DBteamsToString = () => {

    if (driver.createdInDB === true) {
      return driver.Teams.map((team) => team.name).join(', ');
    }
    
    if (driver.createdInDB === false) {
      return driver.teams
    }
  }

  function handleCloseDetail () {
    dispatch(setSearched(false))
  } 
  
  return (
    <div className={s.MainContainer}>
      <div className={s.DetailContainer}>
        <NavLink to="/home" className={s.closeButton} onClick={handleCloseDetail}>
          X
        </NavLink>
        

        {isLoading
          ? <img className={ s.loadingGIF } src="/loading.gif" alt="loadingGIF" />
          : (
          <>
            <div className={s.leftColumn}>
              <img src={driver?.image} alt={driver?.forename} />
            </div>
            <div className={s.rightColumn}>
              <h2 className={s.driverName}>{`${driver?.forename} ${driver?.surname}`}</h2>
              {nationalityFlag && (
                <img
                  className={s.flag}
                  src={nationalityFlag}
                  alt={driver?.nationality}
                />
              )}
              <span className={s.nationalityName}>{driver.nationality}</span>
              <p className={s.infoTitle}>Nacimiento</p>
              <p>{driver?.dob}</p>
              <p className={s.infoTitle}>Escuderías</p>
              <p>{DBteamsToString()}</p>
              <p className={s.infoTitle}>Información</p>
              <p className={s.driverDescription}>{driver?.description}</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Detail;
