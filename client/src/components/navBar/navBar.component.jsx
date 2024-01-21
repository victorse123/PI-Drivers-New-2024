/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"; 

import s from "./navBar.module.css";
import { useDispatch } from "react-redux";
import { cleanFilteredDrivers } from "../../redux/actions";
import axios from "axios";
function NavBar({ onSearch, teams, teamsFilter, nationalityFilter, DBFilter, orderByName, orderByDOB, getAllDrivers, handleCreateButton }) {

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [localNationalities, setLocalNationalities] = useState([])
  const [filterValues, setFilterValues] = useState({
    team: "",
    nationality: "",
    dbFilter: "",
    orderByName: "",
    orderByDOB: "",
  });

  const [forceRender, setForceRender] = useState(true)

  async function getLocalNationalities () {
      try {
        const { data } = await axios.get(
          "http://localhost:3001/drivers/localnationalities"
        );
        return setLocalNationalities(data)
      } catch (error) {
        console.error(error);
      }
    }

  useEffect(() => {
    getLocalNationalities();
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      onSearch(name);
      setName("");
    }
  };

  const handleSubmit = () => {
    onSearch(name);
    setName("");
  }

  const handleSubmitAllDrivers = () => {    
    getAllDrivers();
  }
  
  const handleFilterByTeams = (e) => {
    const value = e.target.value
    setFilterValues((values) => ({...values, team: value}))
    teamsFilter(value)
  }

  const handleFilterByNationality = (e) => {
    const value = e.target.value
    setFilterValues((values) => ({...values, nationality: value}))
    nationalityFilter(value)
  }

  const handleFilterDB = (e) => {
    const value = e.target.value
    setFilterValues((values) => ({...values, dbFilter: value}))
    DBFilter(value)
  }

  const handleOrderByName = (e) => {
    const value = e.target.value
    setFilterValues((values) => ({...values, orderByName: value}))
    orderByName(value)
  }

  const handleOrderByDOB = (e) => {
    const value = e.target.value
    setFilterValues((values) => ({...values, orderByDOB: values}))
    orderByDOB(value)
  }

  const cleanFilters = () => {

    setForceRender(!forceRender)

    dispatch(cleanFilteredDrivers())
    setFilterValues({
      team: "",
      nationality: "",
      dbFilter: "",
      orderByName: "",
      orderByDOB: "",
    });
    teamsFilter("");
    nationalityFilter("");
    DBFilter("");
    orderByName("");
    orderByDOB("");
  }

  return (
    <div className={s.navContainer} key={forceRender}>
      <img src="/racingFlag.webp" alt="racingFlag" />
      <div className={s.searchContainer}>
        <div className={s.searchBar}>
          <input
            placeholder="Ingresa un nombre"
            type="text"
            onChange={handleChange}
            onKeyPress={handleKeyPress}
            value={name}
            className={s.searchInput}
          />
          <button className={s.navBarButton} type="submit" onClick={handleSubmit}>
            Buscar
          </button>
          <button className={s.navBarButton} type="submit" onClick={handleSubmitAllDrivers}>
            Todos
          </button>
          <button className={s.navBarButton} type="submit" onClick={handleCreateButton}>
            Crear nuevo
          </button>
        </div>
        <div className={s.filters}>
          <select onChange={handleFilterByNationality} defaultValue={filterValues.nationality}>
            <option disabled value="">
              Filtra por nacionalidad
            </option>
            {localNationalities?.map((nationality, key) => (
              <option key={key} value={nationality}>
                {nationality}
              </option>
            ))}
          </select>
          <select onChange={handleFilterByTeams} defaultValue={filterValues.team}>
            <option disabled value="">
              Filtra por escudería
            </option>
            {teams?.map((team) => (
              <option key={team.id} value={team.name}>
                {team.name}
              </option>
            ))}
          </select>
          <select onChange={handleFilterDB} defaultValue={filterValues.dbFilter}>
            <option disabled value="">
              En Base de Datos
            </option>
            <option value="Y">Sí</option>
            <option value="N">No</option>
          </select>
          <select onChange={handleOrderByName} defaultValue={filterValues.orderByName}>
            <option disabled value="">
              Ordenar alfabéticamente
            </option>
            <option value="A">↧</option>
            <option value="D">↥</option>
          </select>
          <select onChange={handleOrderByDOB} defaultValue={filterValues.orderByDOB}>
            <option disabled value="">
              Ordenar por nacimiento
            </option>
            <option value="A">↧</option>
            <option value="D">↥</option>
          </select>
        </div>
        <div className={s.cleanFilters}>
          <button className={s.navBarButton} type="submit" onClick={cleanFilters} >
            Limpiar filtros
          </button>
        </div>
      </div>
      <img className={s.rightFlag} src="/racingFlag.webp" alt="racingFlag" />
    </div>
  );
}

export default NavBar;
