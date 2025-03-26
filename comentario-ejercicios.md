# Comentarios de los ejercicios

## Primeros pasos en React Native

- Se ha creado el punto de partida con Expo (instalamos Expo CLI).
- Utilizamos Expo GO para poder ver la aplicación en tiempo real en el móvil.
- Con npx expo start lanzamos la aplicación. Podemos ver en la terminal un código QR que podemos escanear con Expo GO
- Inicializamos el repositorio git y lo enlazamos con GitHub.
- Hacemos el primer commit "Primeros pasos en React Native".
- Inspeccionamos el código de la aplicación y podemos ver similitudes con un proyecto de React.
- Al modificar el texto en uno de los componentes de App.js podemos comprobar que los cambios surten efecto en la aplicación móvil.
- A modo de entender mejor como funcionan los componentes en React Native, leemos documentación adicional.

  - Se pueden definir estilos dentro del componente con StyleSheet.create o pasando los estilos como prop.
  - Los tamaños en React Native no tienen unidades, van en función de la densidad de píxeles.
  - Se pueden usar %
  - Se puede usar flexbox

## Componentes React Native

- Se han creado dos componentes (CampoBase y Calendario).
- Hay dos tipos de componentes: componentes funcionales (sin estado) y los que extienden la Clase *Component* (con estado)
- CampoBase tiene guardado en el estado las excursiones que importamos desde excursiones.js
- CampoBase le pasa las excursiones como prop al componente Calendario
- En el componente Calendario tenemos una función para renderizar los elementos del componente FlatList. Mostramos una imagen, el nombre y la descripción.
- Para pasarle las excursiones a la FlatList utilizamos el prop *data* y utilizamos el prop renderItem para pasarle la función que renderiza los items.
- Además cada item tiene que tener una *key* por lo que utilizamos el prop keyExtractor al que le tenemos que pasar un atributo único, en este caso el id de cada excursión.
- Finalmente, importamos el componente CampoBase en App.js.