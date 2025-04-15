import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card } from '@rneui/themed';
import { CONTACTO } from '../comun/contacto';

const contacto = CONTACTO[0];

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

  render() {

    return (
      <ScrollView>
        <RenderItem item={contacto} />
      </ScrollView>
    );
  }
}

export default Contacto;