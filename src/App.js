import React, { useState, useEffect } from 'react';
import Header from './componentes/Header';
import Formulario from './componentes/Formulario';
import Error from './componentes/Error';
import Clima from './componentes/Clima';

function App() {

  //State principal
  const [ciudad, guardarCiudad] = useState('');
  const [pais, guardarPais] = useState('');
  const [error, guardarError] = useState(false);
  const [resultado, guardarResultado] = useState({});

  useEffect(() => {
    //Prevenir ejecución
    if(ciudad === '') return;

    const consultarAPI = async () => {
      const appId = '50118244a912bda804b88b4938d15144'
  
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
  
      //Consultar la URL
      const respuesta = await fetch(url);
      const resultado = await respuesta.json();
  
      guardarResultado(resultado);
    }

    consultarAPI();
  }, [ciudad, pais]);

  const datosConsulta = datos => {
    //Validar que ambos datos estén
    if(datos.ciudad === '' || datos.pais === '') {
      guardarError(true);
      return;
    }

    //Ciudad y pais existen, agregarlos al state
    guardarCiudad(datos.ciudad);
    guardarPais(datos.pais);
    guardarError(false);
  }

  //Cargar un componente condicionalmente
  let componente;

  if(error){
    //Hay un error, mostrarlo
    componente = <Error mensaje='Ambos campos son obligatorios'/>
  }else if(resultado.cod === "404") {
    componente = <Error mensaje="La ciudad no existe"/>
  } else {
    //Mostrar el clima
    componente = <Clima resultado={resultado}/>;
  }

  return (
    <div className="App">
      <Header
        titulo='Clima React App'
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col s12 m6">
              <Formulario
                datosConsulta={datosConsulta}
              />
            </div>
            <div className="col s12 m6">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
