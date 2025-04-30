import React, { Component } from 'react';
import { Text, View, ScrollView, TextInput } from 'react-native';
import { Card, Icon } from '@rneui/themed';

import { baseUrl } from '../comun/comun';

import { connect } from 'react-redux';

import { postComentario, postFavorito } from '../redux/ActionCreators';

import { Rating } from 'react-native-ratings';
import { Button } from '@rneui/base';
import { Modal } from 'react-native';
import { useState } from 'react';

const mapStateToProps = state => {
  return {
    excursiones: state.excursiones,
    comentarios: state.comentarios,
    favoritos: state.favoritos,
  };
}

const mapDispatchToProps = dispatch => ({
  postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
  postComentario: (excursionId, valoracion, autor, comentario) => dispatch(postComentario(excursionId, valoracion, autor, comentario)),
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
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Icon
            raised
            reverse
            name={props.favorita ? 'heart' : 'heart-o'}
            type='font-awesome'
            color='#f50'
            onPress={() => props.favorita ? console.log('La excursión ya se encuentra entre las favoritas') : props.onPress()}
          />
          <Icon
            raised
            reverse
            name='pencil'
            type='font-awesome'
            color='blue'
            onPress={props.onRatingPress}
          />
        </View>
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

function ModalValoracion(props) {

  const {
    modalVisible, setModalVisible, gestionarComentario,
    excursionId, valoracion, autor, comentario,
    setValoracion, setAutor, setComentario, resetForm
  } = props;

  const cerrarModal = () => {
    setModalVisible(false);
    resetForm();
  };

  const enviarComentario = () => {
    gestionarComentario(excursionId, valoracion, autor, comentario);
    cerrarModal();
  };


  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(false);
        setValoracion(5);
        setAutor('');
        setComentario('');
      }}>
      <View style={{ margin: 20 }}>
        <Rating
          showRating
          startingValue={5}
          imageSize={30}
          onFinishRating={setValoracion}
        />
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: 10, gap: 10 }}>
          <Icon
            name='user'
            type='font-awesome'
            width={24}
            height={24}
          />
          <TextInput
            placeholder="Autor"
            value={autor}
            onChangeText={setAutor}
            style={{ borderBottomWidth: 1, borderColor: '#111', width: '80%' }}
          />
        </View>
        <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', margin: 10, gap: 10 }}>
          <Icon
            name='comment'
            type='font-awesome'
            width={24}
            height={24}
          />
          <TextInput
            placeholder="Comentario"
            value={comentario}
            onChangeText={setComentario}
            style={{ borderBottomWidth: 1, borderColor: '#111', width: '80%' }}
          />
        </View>
        <View style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10, marginTop: 20 }}>
          <Button
            title="Enviar"
            buttonStyle={{ backgroundColor: '#eee' }}
            titleStyle={{ color: 'blue' }}
            onPress={enviarComentario}
          />
          <Button
            title={"Cancelar"}
            buttonStyle={{ backgroundColor: '#eee' }}
            titleStyle={{ color: 'blue' }}
            onPress={cerrarModal}
          />
        </View>
      </View>
    </Modal>
  );
}

class DetalleExcursion extends Component {

  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
      valoracion: 5,
      autor: '',
      comentario: '',
    };
  }

  toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  gestionarComentario = (excursionId, valoracion, autor, comentario) => {
    this.props.postComentario(excursionId, valoracion, autor, comentario);
  }

  marcarFavorito(excursionId) {
    this.props.postFavorito(excursionId);
  };

  resetForm() {
    this.setState({
      valoracion: 5,
      autor: '',
      comentario: '',
      dia: '',
      modalVisible: false
    });
  }

  render() {

    const { excursionId } = this.props.route.params;
    return (
      <ScrollView>
        <RenderExcursion
          excursion={this.props.excursiones.excursiones[+excursionId]}
          favorita={this.props.favoritos.favoritos.some(el => el === excursionId)}
          onPress={() => this.marcarFavorito(excursionId)}
          onRatingPress={() => this.toggleModal()}
        />

        <RenderComentario
          comentarios={this.props.comentarios.comentarios.filter((comentario) => comentario.excursionId === excursionId)} />

        <ModalValoracion
          setModalVisible={this.toggleModal}
          modalVisible={this.state.modalVisible}
          gestionarComentario={this.gestionarComentario}
          excursionId={excursionId}
          valoracion={this.state.valoracion}
          autor={this.state.autor}
          comentario={this.state.comentario}
          setValoracion={(v) => this.setState({ valoracion: v })}
          setAutor={(a) => this.setState({ autor: a })}
          setComentario={(c) => this.setState({ comentario: c })}
          resetForm={() => this.resetForm()}
        />
      </ScrollView>
    );
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);