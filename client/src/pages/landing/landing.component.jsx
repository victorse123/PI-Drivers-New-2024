// eslint-disable-next-line no-unused-vars
import { NavLink } from "react-router-dom";
import s from "./landing.module.css";

function Landing() {
  return (
    <div className={s.background}>
      <div className={s.content}>
        <img src="/F1white.svg" alt="F1_Logo" />
        <h1 className={s.title}>La aplicación para conocer más acerca de los pilotos más importantes en la historia de la Fórmula 1</h1>
        <span>Powered By: JuanDev</span>
        <NavLink exact to="/home">
          <button className={s.landingButton}>Ingresa</button>
        </NavLink>
      </div>
    </div>
  );
}

export default Landing;
