/* eslint-disable no-useless-escape */
const validate = (input) => {
  let errors = {}
  const dobRegex = /^\d{4}\/(0?[1-9]|1[012])\/(0?[1-9]|[12][0-9]|3[01])$/;
  
  !input.forename
    ? errors = { ...errors, forename: "Ingresa un nombre" }
    : errors = { ...errors, forename: "" }
  
  !input.surname
    ? errors = { ...errors, surname: "Ingresa un apellido" }
    : errors = { ...errors, surname: "" }
  
  !input.nationality
    ? errors = { ...errors, nationality: "Selecciona una nacionalidad" }
    : errors = { ...errors, nationality: "" }
  
  errors.dob = !dobRegex.test(input.dob)
    ? errors = { ...errors, dob: "Ingresa una fecha correcta en el formato AAAA/MM/DD" }
    : errors = { ...errors, dob: "" }
  
  !input.teams
    ? errors = { ...errors, teams: "Selecciona los equipos" }
    : errors = { ...errors, teams: "" }
  

  return errors
}

export default validate;