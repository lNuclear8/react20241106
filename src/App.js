import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios'; // Librería para conectar con SpringBoot

function App() {
  const [welcomeMessage, setWelcomeMessage] = useState(''); // Estado para almacenar la respuesta de /api/welcome
  const [persona, setPersona] = useState({ nombre: '', edad: '' }); // Estado para almacenar la respuesta de /api/crearPersona

  // Para conectar con Spring Boot al API REST por el puerto 8080
  useEffect(() => {
    // Hacemos ambas solicitudes simultáneamente con axios.all()
    axios.all([
      axios.get('http://localhost:8080/api/welcome'),
      axios.get('http://localhost:8080/api/crearPersona')
    ])
    .then(axios.spread((responseWelcome, responsePersona) => {
      // Primero manejamos la respuesta de la API /api/welcome
      console.log('Respuesta de welcome:', responseWelcome.data);
      setWelcomeMessage(responseWelcome.data.mensaje); // Actualizamos el mensaje de bienvenida

      // Luego manejamos la respuesta de la API /api/crearPersona
      console.log('Respuesta de crearPersona:', responsePersona.data);
      setPersona(responsePersona.data); // Actualizamos la persona
    }))
    .catch(error => console.error('Error al conectar con el backend:', error));
  }, []); // Solo se ejecuta una vez cuando el componente se monta

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hola Mundo</p>
        <p>Respuesta del backend (Welcome): {welcomeMessage}</p>
        <h2>Recibo a una persona en formato JSON desde el backend y es:</h2>
        <p>Nombre de la persona: {persona.nombre}</p>
        <p>Edad de la persona: {persona.edad}</p>
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
