import React from 'react';

import './styles.css'

class DevForm extends React.Component {

  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeValue = this.handleChangeValue.bind(this);

    this.state = { dev: props.dev };
  }

  componentDidMount() {

    navigator.geolocation.getCurrentPosition(
      (position) => {

        const { latitude, longitude } = position.coords;

        let devTo = this.state.dev;
        devTo.latitude = latitude;
        devTo.longitude = longitude;
        this.setState({ dev: devTo });
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      });
  }

  static getDerivedStateFromProps(props) {
    return { dev: props.dev }
  }

  async handleSubmit(e) {
    e.preventDefault();
    await this.props.onSubmit(this.state.dev);
  }

  handleChangeValue(name, value) {
    let devTo = this.state.dev;
    devTo[name] = value;
    this.setState({ dev: devTo });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="input-block">
          <label htmlFor="github_username">Usuário do GitHub</label>
          <input name="github_username" id="github_username" required
            disabled={(this.state.dev._id) ? "disabled" : ""} 
            value={this.state.dev.github_username}
            onChange={e => this.handleChangeValue(e.target.name, e.target.value)} />
        </div>

        <div className="input-block">
          <label htmlFor="techs">Tecnologias</label>
          <input name="techs" id="techs" required
            value={this.state.dev.techs}
            onChange={e => this.handleChangeValue(e.target.name, e.target.value)} />
        </div>

        <div className="input-group">
          <div className="input-block">
            <label htmlFor="latitude">Latitude</label>
            <input name="latitude" id="latitude" type="number" required
              value={this.state.dev.latitude}
              onChange={e => this.handleChangeValue(e.target.name, e.target.value)} />
          </div>

          <div className="input-block">
            <label htmlFor="longitude">Longitude</label>
            <input name="longitude" id="longitude" type="number" required
              value={this.state.dev.longitude}
              onChange={e => this.handleChangeValue(e.target.name, e.target.value)} />
          </div>
        </div>

        <button type="submit">Salvar</button>
      </form>

    )
  }
}


export default DevForm;