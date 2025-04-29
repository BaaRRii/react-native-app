import React, { Component } from 'react';
import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import { Text, ScrollView, View } from 'react-native';
import { Card } from '@rneui/themed';

// import { ACTIVIDADES } from '../comun/actividades';
import { connect } from 'react-redux';

import { ListItem, Avatar } from '@rneui/themed';
import { FlatList } from 'react-native';

import { HISTORIA } from '../comun/historia';
import { baseUrl } from '../comun/comun';

const historia = HISTORIA[0];

const mapStateToProps = state => {
  return {
    actividades: state.actividades,
  }
}

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

  render() {

    const renderActividadesItem = ({ item, index }) => {
      return (
        <ListItem
          key={index}
          bottomDivider>
          <Avatar source={{ uri: baseUrl + item.imagen }} />
          <ListItem.Content>
            <ListItem.Title>{item.nombre}</ListItem.Title>
            <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
          </ListItem.Content>
        </ListItem>
      );
    };

    const isLoading = this.props.actividades.isLoading
    const errMess = this.props.actividades.errMess

    if (isLoading) {
      return (
        <ScrollView>
          <Historia item={historia} />
          <Card>
            <Card.Title>{"Actividades y recursos"}</Card.Title>
            <Card.Divider />
            <IndicadorActividad />
          </Card>
        </ScrollView>
      )
    }
    else if (errMess) {
      return (
        <ScrollView>
          <Historia item={historia} />
          <Card>
            <Card.Title>{"Actividades y recursos"}</Card.Title>
            <Card.Divider />
            <Text>{errMess}</Text>
          </Card>
        </ScrollView>
      )
    }
    else {
      return (
        <ScrollView>
          <Historia item={historia} />
          <Card>
            <Card.Title>{"Actividades y recursos"}</Card.Title>
            <Card.Divider />
            <FlatList
              data={this.props.actividades.actividades}
              renderItem={renderActividadesItem}
              keyExtractor={item => item.id.toString()}
              scrollEnabled={false}
            />
          </Card>
        </ScrollView>
      )
    }
  }
}

export default connect(mapStateToProps)(QuienesSomos);