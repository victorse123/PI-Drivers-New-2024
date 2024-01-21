import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDrivers, getDriverByName, getTeams, filterByTeams, createdInDB, setOrderByName, setOrderByDOB, cleanFilteredDrivers, cleanShowNotFound, setCurrentPage, setSearched, filterNationality } from "../../redux/actions.js";

import CardsContainer from "../../components/cardsContainer/cardsContainer.component.jsx";
import NavBar from "../../components/navBar/navBar.component.jsx";
import CreateForm from "../createForm/createForm.component.jsx";
import DriverNotFound from "../../components/driverNotFound/driverNotFound.component.jsx";

import s from "./home.module.css";

function Home() {

  const dispatch = useDispatch();
  
  const [showForm, setShowForm] = useState(false)

  const searched = useSelector((state) => state.searched)
  const showNotFound = useSelector((state) => state.showNotFound)
  const drivers = useSelector((state) => state.drivers);
  const filteredDrivers = useSelector((state) => state.filteredDrivers);
  const teams = useSelector((state) => state.teams);

  function onSearch(name) {
    if (name) {
      setShowForm(false)
      dispatch(cleanShowNotFound())
      dispatch(cleanFilteredDrivers())
      dispatch(getDriverByName(name));
      dispatch(setSearched(true))
    } else {
      dispatch(setSearched(false))
    }
  }

  function submitAllDrivers() {
    dispatch(cleanFilteredDrivers())
    dispatch(getDrivers());
    dispatch(cleanShowNotFound())
    dispatch(setSearched(false))
    dispatch(setCurrentPage())
    setShowForm(false)
  }

  function filterByTeam(team) {
    if (team) {
      dispatch(filterByTeams(team))
      dispatch(setSearched(true))
    } else {
      dispatch(setSearched(false))
    }
  }

  function filterByNationality(nationality) {
    dispatch(filterNationality(nationality));
    dispatch(setSearched(true));

  }
  
  function filterByDB(boolean) {
    if (boolean) {
      dispatch(createdInDB(boolean))
      dispatch(setSearched(true))
    } else {
      dispatch(setSearched(false))
    }
  }

  function orderByName(order) {
    if (order) {
      dispatch(setOrderByName(order))
      dispatch(setSearched(false))
    } else {
      dispatch(setSearched(false))
    }
  }

  function orderByDOB(order) {
    if (order) {
      dispatch(setOrderByDOB(order))
      dispatch(setSearched(true))
    } else {
      dispatch(setSearched(false))
    }
  }

  function handleCreateButton () {
    setShowForm(true)
    dispatch(cleanShowNotFound())
    dispatch(getDrivers())
  }

  function handleCloseForm () {
    setShowForm(false)
    submitAllDrivers()
  }

  useEffect(() => {
    
    if (filteredDrivers.length === 0) {
      dispatch(getDrivers())
    } else {
      dispatch(setSearched(true))
    }
    
    dispatch(getTeams())

    // return (() => {
    // dispatch((cleanFilteredDrivers()))
    // })

  }, [dispatch])
  
  return (  
    <div className={s.mainContent}>
      <NavBar onSearch={onSearch} teams={teams} teamsFilter={filterByTeam} nationalityFilter={filterByNationality} DBFilter={filterByDB} orderByName={orderByName} orderByDOB={orderByDOB} getAllDrivers={submitAllDrivers} handleCreateButton={handleCreateButton} handleCloseForm={handleCloseForm} />
      {showForm
        ? (<CreateForm  handleCloseForm={handleCloseForm} />)
        : showNotFound
          ? (<DriverNotFound handleCreateButton={handleCreateButton}/>)
          : (<CardsContainer drivers={searched === true ? filteredDrivers : drivers} />)
      }
    </div>)
  
}

export default Home;
