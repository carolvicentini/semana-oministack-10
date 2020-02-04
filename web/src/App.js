import React, { useState, useEffect } from 'react';
import api from './services/api';
import DevItem from './componets/DevItem';
import DevForm from './componets/DevForm';

import './global.css';
import './App.css';
import './Main.css';
import './Sidebar.css';

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('devs');

      setDevs(response.data);
    };

    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post('/devs', data);
    setDevs([...devs, response.data]);
  }

  async function handleRemoveDev(id) {
    const response = await api.delete(`/devs/${id}`);

    if (!response.error) {
      setDevs(devs.filter(d => d._id !== id));
    }
  }

  return (

    <div id="app">

      <script src='https://kit.fontawesome.com/a076d05399.js'></script>
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} onDelete={handleRemoveDev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
