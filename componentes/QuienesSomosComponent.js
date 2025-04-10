import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card } from '@rneui/themed';
import { ACTIVIDADES } from '../comun/actividades';
import { HISTORIA } from '../comun/historia';
import { ListItem, Avatar } from '@rneui/themed';
import { FlatList } from 'react-native';

function Historia(props) {

  const item = props.item;

  if (item != null) {
    return (
      <Card>
        <Card.Title>{item.nombre}</Card.Title>
        <Card.Divider />
        <Text style={{ margin: 20 }}>
          {item.mensaje}
        </Text>
      </Card>
    );
  }
  else {
    return (<View></View>);
  }
}

class QuienesSomos extends Component {

  constructor(props) {
    super(props);
    this.state = {
      actividades: ACTIVIDADES,
      historia: HISTORIA,
    };
  }



  render() {


    const renderActividadesItem = ({ item, index }) => {
      return (
        <ListItem
          key={index}
          bottomDivider>
          <Avatar source={require('./imagenes/40Años.png')} />
          <ListItem.Content>
            <ListItem.Title>{item.nombre}</ListItem.Title>
            <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      );
    };

    return (
      <ScrollView>
        <Historia item={this.state.historia[0]} />
        <Card>
          <Card.Title>{"Actividades y recursos"}</Card.Title>
          <Card.Divider />
          <FlatList
            data={this.state.actividades}
            renderItem={renderActividadesItem}
            keyExtractor={item => item.id.toString()}
            scrollEnabled={false}
          />
        </Card>
      </ScrollView>
    );
  }
}

export default QuienesSomos;