import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'; // Librería para conectar con SpringBoot

function App() {
  const [message, setMessage] = useState(''); // Estado para almacenar la respuesta del backend

  // Para conectar con Spring Boot al API REST por el puerto 8080
  useEffect(() => {
    axios.get('http://localhost:8080/api/welcome')
      .then(response => {
        // Accede al valor usando la clave "mensaje"
        console.log('Respuesta del backend:', response.data);
        setMessage(response.data.mensaje); // Ahora accede a "mensaje" en el objeto
      })
      .catch(error => console.error('Error al conectar con el backend:', error));
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hola Mundo</p>
        <p>Respuesta del backend: {message}</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
