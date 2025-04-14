import React, { Component } from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Card, Icon } from '@rneui/themed';
import { EXCURSIONES } from '../comun/excursiones';
import { COMENTARIOS } from '../comun/comentarios';
import { baseUrl } from '../comun/comun';

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
  constructor(props) {
    super(props);
    this.state = {
      excursiones: EXCURSIONES,
      comentarios: COMENTARIOS,
      favoritos: [],
    };
  }

  marcarFavorito(excursionId) {
    this.setState({ favoritos: this.state.favoritos.concat(excursionId) });
  };

  render() {


    const { excursionId } = this.props.route.params;
    return (
      <ScrollView>
        <RenderExcursion excursion={this.state.excursiones[+excursionId]} favorita={this.state.favoritos.some(e => e === excursionId)} onPress={() => this.marcarFavorito(excursionId)} />
        <RenderComentario
          comentarios={this.state.comentarios.filter((comentario) => comentario.excursionId === excursionId)} />
      </ScrollView>
    );
  }
}


export default DetalleExcursion;