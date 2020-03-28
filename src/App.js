import React, { Component } from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Error from './components/Error';
import Clima from './components/Clima';


class App extends Component {

  state = {
    error : '',
    consulta : {},
    resultado : {}
  }

  componentDidUpdate(prevProps, prevState) {

    if(prevState.consulta != this.state.consulta) {
      this.consultarApi();
    }

    
  }

  componentDidMount() {
    this.setState({
      error : false
    })
  }

  consultarApi = () => {
    const {ciudad, pais} = this.state.consulta;
    if(!ciudad || !pais) return null;

    //Leer url y agregar API key
    const appId = '982f80a568359ebe8e5fe670e1edaa0c'
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`

    //query con fetch api
    fetch(url)
      .then(respuesta => {
        return respuesta.json();
      })
      .then(datos => {
        this.setState({
          resultado : datos
        })
      })
      .catch(error => {
        console.log(error)
      })

  }

  datosConsulta = respuesta => {

    if(respuesta.ciudad === '' || respuesta.pais === '') {
      this.setState({
        error : true
      })
    } else {
      this.setState({
        error : false,
        consulta : respuesta
      })
    }

  }

  render() {

    const error  = this.state.error;

    let resultado;

    if(error) {
      resultado = <Error mensaje='Ambos campos son obligatorios'/>
    } else {
      resultado = <Clima resultado={this.state.resultado} />
    }

    return (
      <div className="app">
        <Header
          titulo='Clima'
        />
        <Formulario
          datosConsulta={this.datosConsulta}
        />
        {resultado}
      </div>
    );
  }
}

export default App;
