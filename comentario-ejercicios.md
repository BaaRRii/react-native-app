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

## Componentes funcionales en React Native

- Se ha creado el componente DetalleExcursion. Realmente en este componente tenemos otro componente llamado RenderExcursion. Ambos son funcionales (no tienen estado).

  - RenderExcursion toma como prop una excursion. Si no se le pasa ninguna excursion (tendríamos un valor null), va a devolver una View vacía, sin contenido. En el caso de que sí se le pase una excursión, va a mostrar la información de la excursión en un Componente *Card* utilizando *Card.Title*, *Card.Image* y *Text*.
  - DetalleExcursión utiliza RenderExcursion pasandole como prop una excursion (que a su vez también recibe como prop).

- Se ha modificado el componente Campobase con los siguientes cambios:

  - En el estado ahora se guarda también llamado seleccionExcursion que servirá para almacenar el id de la excursión de la que queremos ver el detalle.
  - Para actualizar seleccionExcursion (que está en el estado) vamos a utilizar una función llamada onSeleccionExcursion la cual obtiene como parámetro un id y simplemente asigna ese valor a la variable del estado.
  - Importamos el componente DetalleExcursion y lo añadimos al principio, antes del Calendario.
  - Cuando no haya ninguna excursion seleccionada DetalleExcursion solo va a mostrar una View vacía y no va a afectar al resto del contenido, sin embargo, cuando seleccionemos una excursión, va a aparecer una *Card* encima del calendario (se va a mover el contenido del calendario hacia abajo)
  - Se define un prop llamado onPress en el calendario con una función que va a hacer que se actualice el valor de la seleccion con el id que le llega como parametro.

- En el componente calendario definimos que cuando se presione (onPress) un *ListItem* vamos a utilzar la funcion que le llega como prop con el id del item.
- Es importante distinguir, en este caso, entre el evento onPress del *ListItem* y la función onPress que definimos en Campobase
- El flujo quedaría de la siguiente manera:
  1. El usuario presiona una excursión de la FlatList
  2. El evento onPress del ListItem correspondiente detecta este gesto y llama a la función onPress que le llega como prop
  3. La función onPress de Campobase actualiza el estado con el id de la excursión seleccionada
  4. DetalleExcursion recibe la excursión seleccionada como prop (gracias al filter)
  5. RenderExcursion recibe la excursión como prop y muestra los detalles en una *Card*
