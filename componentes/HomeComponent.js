import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card } from '@rneui/themed';

import { connect } from 'react-redux';

import { baseUrl } from '../comun/comun';

import { IndicadorActividad } from './IndicadorActividadComponent';

const mapStateToProps = state => {
  return {
    excursiones: state.excursiones,
    cabeceras: state.cabeceras,
    actividades: state.actividades
  };
}

function RenderItem(props) {

  if (props.isLoading) {
    return (
      <IndicadorActividad />
    );
  }
  else if (props.errMess) {
    return (
      <View>
        <Text>{props.errMess}</Text>
      </View>
    );
  }
  else {
    const item = props.item;

    if (item != null) {
      return (
        <Card>
          <Card.Divider />
          <View style={{ position: 'relative' }}>
            <Card.Image source={{ uri: baseUrl + item.imagen }} />
            <Text style={{ color: 'chocolate', fontSize: 34, fontWeight: 'bold', textAlign: 'center', position: 'absolute', top: 10, left: 0, right: 0 }}>
              {item.nombre}
            </Text>
          </View>
          <Text style={{ margin: 20 }}>
            {item.descripcion}
          </Text>
        </Card>
      );
    }
    else {
      return (<View></View>);
    }
  }

}

class Home extends Component {

  render() {

    return (
      <ScrollView>
        <RenderItem item={this.props.cabeceras.cabeceras.filter((cabecera) => cabecera.destacado)[0]}
          isLoading={this.props.cabeceras.isLoading}
          errMess={this.props.cabeceras.errMess} />
        <RenderItem item={this.props.excursiones.excursiones.filter((excursion) => excursion.destacado)[0]}
          isLoading={this.props.excursiones.isLoading}
          errMess={this.props.excursiones.errMess} />
        <RenderItem item={this.props.actividades.actividades.filter((actividad) => actividad.destacado)[0]}
          isLoading={this.props.actividades.isLoading}
          errMess={this.props.actividades.errMess} />
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps)(Home);