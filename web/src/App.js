import React from 'react';
import api from './services/api';
import DevItem from './componets/DevItem';
import DevForm from './componets/DevForm';

import './global.css';
import './App.css';
import './Main.css';
import './Sidebar.css';

class App extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmitDev = this.handleSubmitDev.bind(this);
    this.handleClickUpdateDev = this.handleClickUpdateDev.bind(this);
    this.handleRemoveDev = this.handleRemoveDev.bind(this);

    const devTo = {
      _id: '',
      github_username: '',
      techs: '',
      latitude: '',
      longitude: '',
    }

    this.state = { devs: [], dev: devTo };
  }

  componentDidMount() {

    api.get('devs')
      .then((response) => {
        this.setState({ devs: response.data });
      })
      .catch((e) => {
        console.error(e);
      });

  }

  clearForm() {

    const devTo = {
      _id: '',
      github_username: '',
      techs: '',
      latitude: this.state.dev.latitude,
      longitude: this.state.dev.longitude,
    }

    this.setState({ dev: devTo });
  }

  async handleSubmitDev(dev) {
    if (!dev._id) {
      const response = await api.post('/devs', dev);
      if (!response.error && !response.data.error) {
        this.setState({ devs: [...this.state.devs, response.data] });
        this.clearForm();
      } else {
        console.error(response.error);
      }
    } else {
      const response = await api.put(`/devs/${dev._id}`, dev);
      if (!response.error && !response.data.error) {
        this.setState({ devs: this.state.devs.map((d) => (d._id === dev._id) ? response.data : d) });
        this.clearForm();
      } else {
        console.error(response.error);
      }
    }
  }

  handleClickUpdateDev(devAlterar) {
    this.setState({ dev: devAlterar });
  }

  async handleRemoveDev(id) {
    const response = await api.delete(`/devs/${id}`);

    if (!response.error) {
      this.setState({ devs: this.state.devs.filter(d => d._id !== id) });
    }
  }

  render() {

    return (
      <div id="app">
        <aside>
          <div>
            <strong>Cadastrar</strong>
            <div className="user-actions">
              <i className="fas fa-broom fa-2x" onClick={() => { this.clearForm() }} title="Limpar formulário" />
            </div>
          </div>
          <DevForm dev={this.state.dev} onSubmit={this.handleSubmitDev} />
        </aside>
        <main>
          <ul>
            {this.state.devs.map(dev => (
              <DevItem key={dev._id} dev={dev} onUpdate={this.handleClickUpdateDev} onDelete={this.handleRemoveDev} />
            ))}
          </ul>
        </main>
      </div >
    );
  }
}
export default App;
