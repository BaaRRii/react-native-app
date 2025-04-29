import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Card, Icon } from '@rneui/themed';

import { baseUrl } from '../comun/comun';

import { connect } from 'react-redux';

import { postFavorito } from '../redux/ActionCreators';

const mapStateToProps = state => {
  return {
    excursiones: state.excursiones,
    comentarios: state.comentarios,
    favoritos: state.favoritos,
  };
}

const mapDispatchToProps = dispatch => ({
  postFavorito: (excursionId) => dispatch(postFavorito(excursionId))
});

function RenderExcursion(props) {

  const excursion = props.excursion;

  if (excursion != null) {
    return (
      <Card>
        <Card.Divider />
        <View style={{ position: 'relative' }}>
          <Card.Image source={{ uri: baseUrl + excursion.imagen }} />
          <Text style={{ color: 'white', fontSize: 34, fontWeight: 'bold', textAlign: 'center', position: 'absolute', top: 10, left: 0, right: 0 }}>
            {excursion.nombre}
          </Text>
        </View>
        <Text style={{ margin: 20 }}>
          {excursion.descripcion}
        </Text>
        <Icon
          raised
          reverse
          name={props.favorita ? 'heart' : 'heart-o'}
          type='font-awesome'
          color='#f50'
          onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
        />
      </Card>
    );
  }
  else {
    return (<View></View>);
  }
}

function RenderComentario(props) {
  const comentarios = props.comentarios;
  return (
    <Card>
      <Card.Title>Comentarios</Card.Title>
      <Card.Divider />
      {comentarios.map((comentario) => {
        return (
          <View key={comentario.id} style={{ margin: 10 }}>
            <Text style={{ fontSize: 18 }}>{comentario.comentario}</Text>
            <Text style={{ fontSize: 14 }}>{comentario.valoracion + " Stars"}</Text>
            <Text style={{ fontSize: 14 }}>
              {"-- " + comentario.autor + ", " + new Date(comentario.dia.replaceAll(" ", "")).toLocaleDateString('es-ES', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }) + ", " +
                new Date(comentario.dia.replaceAll(" ", "")).toLocaleTimeString('es-ES', {
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}
            </Text>
          </View>
        );
      })}
    </Card>
  );
}

class DetalleExcursion extends Component {

  marcarFavorito(excursionId) {
    this.props.postFavorito(excursionId);
  };

  render() {

    const { excursionId } = this.props.route.params;
    return (
      <ScrollView>
        <RenderExcursion
          excursion={this.props.excursiones.excursiones[+excursionId]}
          favorita={this.props.favoritos.favoritos.some(el => el === excursionId)}
          onPress={() => this.marcarFavorito(excursionId)} />
        <RenderComentario
          comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)} />
      </ScrollView>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);