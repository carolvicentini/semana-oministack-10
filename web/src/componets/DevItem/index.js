import React from 'react';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import './styles.css'

function DevItem({ dev, onUpdate, onDelete }) {

  function alterarDev(dev) {

    const devTo = {
      _id: dev._id,
      github_username: dev.github_username,
      techs: dev.techs.join(', '),
      latitude: dev.location.coordinates[1],
      longitude: dev.location.coordinates[0],
    };

    onUpdate(devTo);
  }

  async function excluirDev(id) {
    await onDelete(id);
  }

  function submitExclude(dev) {

    confirmAlert({
      title: 'Confirmar Excusão!',
      message: `Quer relamente remover o usuário ${dev.name}?`,
      buttons: [
        {
          label: 'Yes',
          onClick: () => excluirDev(dev._id)
        },
        {
          label: 'No',
          // onClick: () => alert('Click No')
        }
      ]
    });
  }

  return (
    <li className="dev-item">
      <header>
        <img src={dev.avatar_url} alt={dev.name} />
        <div className="user-info">
          <strong>{dev.name}</strong>
          <span>{dev.techs.join(',')}</span>
        </div>
        <div className="user-actions">
          <i className="far fa-edit" onClick={() => alterarDev(dev)}  title="Remover dev"/>
          <i className="far fa-trash-alt" onClick={() => { submitExclude(dev) }}  title="Alterar dev"/>
        </div>
      </header>
      <p>{dev.bio}</p>
      <a href={`https://github.com/${dev.github_username}`}>Acessar Perfil no GitHub</a>
      <br />
    </li>
  );
}

export default DevItem;