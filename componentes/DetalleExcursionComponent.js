import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Card } from '@rneui/themed';
import { EXCURSIONES } from '../comun/excursiones';

function RenderExcursion(props) {

  const excursion = props.excursion;

  if (excursion != null) {
    return (
      <Card>
        <Card.Divider />
        <View style={{ position: 'relative' }}>
          <Card.Image source={require('./imagenes/40Años.png')}></Card.Image>
          <Text style={{ color: 'chocolate', fontSize: 34, fontWeight: 'bold', textAlign: 'center', position: 'absolute', top: 10, left: 0, right: 0 }}>
            {excursion.nombre}
          </Text>
        </View>
        <Text style={{ margin: 20 }}>
          {excursion.descripcion}
        </Text>
      </Card>
    );
  }
  else {
    return (<View></View>);
  }
}

class DetalleExcursion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      excursiones: EXCURSIONES
    };
  }

  render() {
    const { excursionId } = this.props.route.params;
    return (<RenderExcursion excursion={this.state.excursiones[+excursionId]} />);
  }
}

export default DetalleExcursion;