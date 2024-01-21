/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import s from './driverNotFound.module.css'
import { useSelector } from 'react-redux';

function DriverNotFound({ handleCreateButton }) {
  const [isLoading, setIsLoading] = useState(false);
  const showNotFound = useSelector((state) => state.showNotFound)

  useEffect(() => {
    
    setIsLoading(true);

    setTimeout(() => { 
      setIsLoading(false);
    }, 500)

  }, [showNotFound]);

  return (
    <div className={s.container}>
      {isLoading ? (
        <img className={s.loadingGIF} src="/loading.gif" alt="loadingGIF" />
      ) : (
        <>
          <img
            className={s.driverNotFoundImg}
            src="/notFoundPilot.png"
            alt="Sad F1 pilot"
          />
          <h1 className={s.title}>Piloto no encontrado</h1>
          <button className={s.createButton} onClick={handleCreateButton}>
            Crear piloto
          </button>
        </>
      )}
    </div>
  );
}

export default DriverNotFound;