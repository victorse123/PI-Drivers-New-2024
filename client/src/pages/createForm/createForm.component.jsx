/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import s from "./createForm.module.css";
import { cleanShowNotFound, getTeams } from "../../redux/actions";
import { useEffect, useState } from "react";
import validate from "./validation";
import axios from 'axios';

function CreateForm({handleCloseForm}) {

  const dispatch = useDispatch()

  const [nationalities, setNationalities] = useState()
  const teams = useSelector((state) => state.teams);

  async function getNationalities() {
      try {
        const { data } = await axios.get(
          "http://localhost:3001/drivers/nationalities"
        );
        return setNationalities(data)
      } catch (error) {
        console.error(error);
      }
    }

  useEffect(() => {
    dispatch(getTeams());
    getNationalities();
    return (() => {
      dispatch(cleanShowNotFound());
    }
    )
  }, [dispatch]);
  
  const [driverData, setDriverData] = useState({
    forename: "",
    surname: "",
    description: "",
    image: "",
    nationality: "",
    dob: "",
    teams: [],
  });

  const [errors, setErrors] = useState({
    forename: "",
    surname: "",
    nationality: "",
    dob: "",
    teams: "",
  });

  const [selectedTeams, setSelectedTeams] = useState([])

  const handleValidation = (fieldName, value) => {
    const fieldErrors = validate({ [fieldName]: value }) 
    
    setErrors((errors) => ({
      ...errors,
      [fieldName]: fieldErrors[fieldName]
    }))
  }

  const handleChange = (e) => {
    
    e.preventDefault()

    if (e.target.name === 'teams') {
      setDriverData({
        ...driverData,
        teams:selectedTeams
      })
    } else {
      setDriverData({
        ...driverData,
        [e.target.name]: e.target.value,
      });
    }

    handleValidation(e.target.name, e.target.value)

  };

  const handleSelectedTeams = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map(option => option.value)

    setSelectedTeams(selectedOptions)

  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    const URL = "http://localhost:3001/drivers/";

    try {

      const { forename, surname, description, image, nationality, dob, teams } = driverData;

      const teamsToString = teams.join(', ')

      const data = {
        forename,
        surname,
        description,
        image,
        nationality,
        dob,
        teams: teamsToString,
      };

      const response = await axios.post(URL, data)

      if (response.status === 200) {
        window.alert("¡Piloto registrado exitosamente!");

        setDriverData({
          forename: "",
          surname: "",
          description: "",
          image: "",
          nationality: "",
          dob: "",
          teams: [],
        });
      }
    
      return response

    } catch (error) {
      console.error(error)
      throw new Error({error: error.message})
    }

  }

  const disableSubmitButton = () => {

    const formNoCompleted = Object.entries(driverData).some(
      ([key, value]) =>
        (typeof value === "string" || Array.isArray(value)) &&
        (value === "" || (Array.isArray(value) && value.length === 0)) &&
        key !== "image" &&
        key !== "description"

    );

    const formHasNoErrors = Object.entries(errors).some(
      ([key, value]) =>
        typeof value === "string" &&
        value === "" &&
        key !== "image" &&
        key !== "description"
    );  

    return formNoCompleted || !formHasNoErrors
    
  }

  return (
    <div>
      <div className={s.FormContainer}>
      <button className={s.closeButton} onClick={handleCloseForm}>X</button>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <legend>Registra un nuevo piloto</legend>
            <img className={s.logoF1} src="/F1white.svg" alt="F1_Logo" />
            <label htmlFor="">
              <span className={s.spanStar}>*</span>Nombre:
            </label>
            <input
              type="text"
              name="forename"
              placeholder="Ingresa el nombre"
              value={driverData.forename}
              onChange={handleChange}
              onBlur={handleChange}
              // className={`${errors.email ? s.inputWarning : ""}`}
            />
            <span className={s.textWarning}>{errors.forename}</span>
  
            <label htmlFor="">
              <span className={s.spanStar}>*</span>Apellido:{" "}
            </label>
            <input
              type="text"
              name="surname"
              placeholder="Ingresa el apellido"
              value={driverData.surname}
              onChange={handleChange}
              onBlur={handleChange}
              // className={`${errors.password ? s.inputWarning : ""}`}
            />
            <span className={s.textWarning}>{errors.surname}</span>
  
            <label htmlFor="">
              <span className={s.spanStar}>*</span>Nacionalidad:{" "}
            </label>
            <select
              type="text"
              name="nationality"
              value={driverData.nationality}
              onChange={handleChange}
              onBlur={handleChange}
              className={s.select}
            >
              <option disabled value="">
                Selecciona una nacionalidad
              </option>
              {nationalities?.map((nationality, index) => (
                <option key={index} value={nationality}>
                  {nationality}
                </option>
              ))}
            </select>
            <span className={s.textWarning}>{errors.nationality}</span>
  
            <label htmlFor="">Imagen: </label>
            <input
              type="text"
              name="image"
              placeholder="Ingresa la URL de la imagen"
              value={driverData.image}
              onChange={handleChange}
            />
  
            <label htmlFor="">
              <span className={s.spanStar}>*</span>Fecha de nacimiento:{" "}
            </label>
            <input
              type="text"
              name="dob"
              placeholder="AAAA / MM / DD"
              value={driverData.dob}
              onChange={handleChange}
              onBlur={handleChange}
            />
            <span className={s.textWarning}>{errors.dob}</span>
  
            <label htmlFor="">Descripción: </label>
            <input
              type="text"
              name="description"
              placeholder="Ingresa una breve descripción"
              value={driverData.description}
              onChange={handleChange}
            />
  
            <label htmlFor="">Escuderías: </label>
            <select
              multiple
              name="teams"
              value={selectedTeams}
              onChange={handleSelectedTeams}
              onBlur={handleChange}
              className={s.multipleSelect}
            >
              <option disabled defaultValue="">
                Selecciona las escuderías
              </option>
              {teams.map((team) => (
                <option key={team.id} value={team.name}>
                  {team.name}
                </option>
              ))}
            </select>
            <span className={s.textWarning}>{errors.teams}</span>
  
            <div>
              <button
                className={disableSubmitButton() ? s.submitButtonOff : s.submitButtonOn}
                type="submit"
                disabled={disableSubmitButton()}
                onClick={handleSubmit}
              >
                Crear piloto
              </button>
            </div>
          </fieldset>
        </form>
      </div>
  </div>
  );
}

export default CreateForm;
