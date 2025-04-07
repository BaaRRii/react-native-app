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

- **Tiempo aproximado para realizar la tarea: 30 mins**

## Componentes React Native

- Se han creado dos componentes (CampoBase y Calendario).
- Hay dos tipos de componentes: componentes funcionales (sin estado) y los que extienden la Clase *Component* (con estado)
- CampoBase tiene guardado en el estado las excursiones que importamos desde excursiones.js
- CampoBase le pasa las excursiones como prop al componente Calendario
- En el componente Calendario tenemos una función para renderizar los elementos del componente FlatList. Mostramos una imagen, el nombre y la descripción.
- Para pasarle las excursiones a la FlatList utilizamos el prop *data* y utilizamos el prop renderItem para pasarle la función que renderiza los items.
- Además cada item tiene que tener una *key* por lo que utilizamos el prop keyExtractor al que le tenemos que pasar un atributo único, en este caso el id de cada excursión.
- Finalmente, importamos el componente CampoBase en App.js.
- **Tiempo aproximado para realizar la tarea: 20 mins**

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
- **Tiempo aproximado para realizar la tarea: 30 mins**

## Stack Navigation

- El NavigationContainer se va a encargar de mostrar el contenido en base a rutas.
- Las Screens básicamente asocian una ruta (un nombre) con un componente, opcionalmente se puede añadir un titulo u otras opciones.
- Cuando navegamos a una ruta podemos añadir una serie de parámetros:
  - Por ejemplo, para acceder al detalle de las excursiones podemos navegar haciendo:
  
    ```javascript
    navigate('DetalleExcursion', { excursionId: item.id })
    ```

    Donde le pasamos el id de la excursion en un objeto JSON.
  - Para recuperar el parámetro en la ruta del detalle tenemos que acceder al campo route de los props:

    ```javascript
    const { excursionId } = this.props.route.params;
    ```

- **Tiempo aproximado para realizar la tarea: 20 mins**

## Drawer Navigation

- Hemos añadido un nuevo sistema de navegación a la aplicación basado en un drawer.
- De este modo vamos a poder seleccionar de entre dos componentes: CampoBase y Calendario (éste componente a su vez tiene un sistema de navegación basado en Stack).
- Parecido al anterior sistema vamos a definir el navigator que se va a encargar de la navegación y las Screens que se van a encargar de asociar un nombre con un componente.
- El componente Home también tiene navegación de tipo Stack aunque solo tenga una ruta (una screen), probablemente en el futuro queramos añadir nuevas pantallas a las que poder acceder desde Home.
- Dentro del NavigationContainer solo podemos tener un navegador, utilizamos el DrawerNavigator como el navegador principal y dentro de los componentes a los que podemos acceder con el Drawer Tendremos otros Navigators.
- Como curiosidad, si accedemos a Calendario desde el Drawer veremos la lista de actividades. Podemos usar el drawer para volver a CampoBase. Si una vez estamos en Calendario accedemos al detalle de una de las excursiones y volvemos a CampoBase, la siguiente vez que accedamos a través del Drawer a Calendario, accederemos al Detalle y no a la lista de actividades.
- **Tiempo aproximado para realizar la tarea: 36 mins**

## Ejercicio Componentes y Navegación

- Se ha creado el componente Contacto con una ScrollView con un solo elemento que se renderiza gracias a un componente auxiliar llamado RenderItem. Esto puede ser útil si en el futuro se quiere añadir más de una tarjeta de contacto
- Del mismo modo que en ejercicios anteriores (aunque no se haya específicado para éste) se ha creado un archivo contacto.js con la información de contacto. Esto es útil para saber éxactamente donde están los datos (por si hubiera que cambiarlos) y por si en el futuro se quieren agregar nuevas tarjetas de contacto.
- En el segundo componente tenemos dos Cards:
  - La primera se renderiza con un componente funcional llamado Historia
  - La segunda se renderiza con un componente de clase.
- Para poder scrollear el componente entero (no solo la lista de actividades) sin caer en problemas de incompatibilidad entre ScrollView y FlatList (los dos son scrolleables) se ha utilizado scrollEnabled={false}.
- Para poner el título de los elementos por encima de la imagen he utilizado una View con position: relative y dentro he añadido la imagen y el titulo con position: absolute y estilos especificos para que parezca un titulo.
- **Tiempo aproximado para realizar la tarea: 40 mins**
