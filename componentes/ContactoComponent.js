import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card } from '@rneui/themed';
import { CONTACTO } from '../comun/contacto';

function RenderItem(props) {

  const item = props.item;

  if (item != null) {
    return (
      <Card>
        <Card.Title>{item.nombre}</Card.Title>
        <Card.Divider />
        <Text style={{ margin: 20 }}>
          {item.mensaje}
        </Text>
        <Text style={{ marginLeft: 20, marginRight: 20, marginBottom: 20 }}>
          {item.telefono}
        </Text>
        <Text style={{ marginLeft: 20, marginRight: 20, marginBottom: 20 }}>
          {item.email}
        </Text>
      </Card>
    );
  }
  else {
    return (<View></View>);
  }
}

class Contacto extends Component {

  constructor(props) {
    super(props);
    this.state = {
      contacto: CONTACTO,
    };
  }

  render() {

    return (
      <ScrollView>
        <RenderItem item={this.state.contacto[0]} />
      </ScrollView>
    );
  }
}

export default Contacto;