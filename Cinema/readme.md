# Cinema Home

Pagina hecha con HTML, CSS y JavaScript, la cual está vinculada con la api de TheMovieDB.

## Autores
Maikel Villegas 
Juan Sarmiento
---

## Instalación

1. Clonar el repositorio.
2. Instalar la extensión "Live Server".
3. Pasar la carpeta a Visual Studio Code o abrir la terminal CMD en la ubicacion de la carpeta y escribir el comando "code ." para que abra sus archvios en Visual Studio Code, para luego haciendo uso de la extensión tener activo el proyecto.

## Uso

El proyecto cuenta con:

- Funciones DeBounce que son de tipo utilidad para evitar que el usuario spamee diferentes funciones.

- Un buscador con autocompletado(que sugiere resultados similares) que busca las peliculas, a partir de la API. Ademas, al buscar las películas saldran las peliculas, de lo contrario nos saldra un mensaje de aviso al no encontrar nada.

- Al buscar alguna película, nos permitira ver los detalles de la misma.

- Un banner tipo slider que contiene los mejores tv shows de la actualidad, a partir de la API.

- Una sección de Peliculas Populares/Cartelera que contiene las peliculas populares, en conjunto a un overlay cuando clickeas la imagen del poster de la película.

- Paginación para la sección de peliculas populares, a partir de las Previous(Atras) o Next(Siguiente), así como input de un numero de pagina para llevarte directamente a la que necesites.

- HTML y CSS, adaptado a responsive en varias resoluciones.

- Modo claro y oscuro dependiendo de lo que quiera el usuario.

- Boton Top para ir hacia la zona superior de la pagina en cualquier momento.

## HTML

El archivo index.html es la página principal del sitio web y contiene los siguientes componentes principales:

Cabecera (<header>): incluye un menú de navegación, un logo y un campo de búsqueda para buscar películas en la base de datos.
Contenido principal (<main>): incluye una sección para mostrar las películas de la cartelera y un botón para cambiar entre el modo claro y oscuro del sitio.
Slider (<section class="slider-section">): incluye un slider de imágenes para destacar algunas películas populares.
Cartelera (<section>): incluye una lista de películas de la cartelera y un paginador para navegar entre las diferentes páginas de resultados.
Pie de página (<footer>): incluye información sobre la página y los derechos de autor.

## Explicación de todo el script.js

## Seccion de Peliculas Populares:

Esta parte proporciona una interfaz de usuario para buscar y explorar películas populares utilizando la API themoviedb.org. Al cargar la página, se llama a la función cargasPelis() para mostrar las películas populares de la página actual. El número de página actual se almacena en la variable currentPage.

El usuario puede navegar entre páginas utilizando los botones "anterior" y "siguiente", o ingresando un número de página en el campo de entrada de página y presionando el botón "ir". La entrada del usuario se valida para asegurarse de que sea un número entero mayor que cero.

Al hacer clic en una imagen de película, se muestra una superposición que incluye la imagen del póster, el título de la película y una descripción. La descripción se obtiene de la API utilizando el ID de la película. La superposición se elimina al hacer clic en el botón "X".

El script utiliza la función debounce() para limitar la frecuencia de llamadas a la función cargasPelis() y para diferir la llamada a la función click en la imagen del póster para evitar que se produzcan múltiples llamadas en rápida sucesión.

## Sección de Busqueda:

El script es una aplicación web que permite a los usuarios realizar búsquedas de películas y ver información detallada sobre ellas. El script utiliza JavaScript para manipular el DOM y hacer solicitudes a la API de The Movie Database.

El script define dos funciones, "ocultarElementos" y "ocultarSlider", que se utilizan para ocultar elementos específicos de la página.

El script también define una constante para el campo de entrada de búsqueda y una función llamada "searchAutocomplete" que se utiliza para obtener sugerencias de autocompletado de la API de The Movie Database. La función utiliza axios para realizar solicitudes a la API en inglés y español y luego combina los resultados para mostrar sugerencias en ambos idiomas.

La función "autocomplete" se utiliza para mostrar las sugerencias de autocompletado en la página. La función crea una lista de elementos que coinciden con el valor del campo de entrada y muestra sugerencias en una lista desplegable debajo del campo de entrada. Cuando el usuario selecciona una sugerencia, la función cierra la lista de sugerencias y realiza una búsqueda de películas con la sugerencia seleccionada.

La función "buscarPelisDebounced": esta función se utiliza para buscar películas en la API de The Movie Database y mostrar información detallada sobre cada película que coincide con la consulta de búsqueda del usuario.

La función "debounce": esta función se utiliza para controlar la frecuencia con la que se realizan las solicitudes a la API de The Movie Database y evitar la sobrecarga del servidor.

La función "detallesPeliDebounced": esta función se utiliza para obtener información detallada sobre una película específica en la API de The Movie Database y mostrarla en la página.

La función "detallesPeli": esta función también se utiliza para obtener información detallada sobre una película específica en la API de The Movie Database, pero utiliza la función "debounce" para controlar la frecuencia de las solicitudes a la API.

Los selectores de eventos: estos selectores se utilizan para detectar las acciones del usuario, como enviar un formulario de búsqueda o hacer clic en un botón para obtener información detallada sobre una película. Cuando se detecta una acción, se llama a la función correspondiente para realizar la tarea necesaria.

## Función del Button Top:

En si, implementa un botón de "volver arriba" que aparece en la página cuando el usuario se desplaza hacia abajo y le permite volver a la parte superior de la página con un solo clic. Utiliza la función "scrollFunction" para detectar la posición del desplazamiento del usuario y mostrar u ocultar el botón en consecuencia. 

## Función del Loader:

La función "showLoader": esta función muestra el indicador de carga. La función obtiene el elemento del DOM que tiene el ID "contenedor_carga" y establece su visibilidad y opacidad en "visible" y "1", respectivamente.

La función "hideLoader": esta función oculta el indicador de carga. La función obtiene el mismo elemento del DOM y establece su visibilidad y opacidad en "hidden" y "0", respectivamente.

La función "onload": esta función se llama cuando la página ha terminado de cargarse. La función obtiene el elemento del DOM que tiene el ID "contenedor_carga" y establece su visibilidad y opacidad en "hidden" y "0", respectivamente, para ocultar el indicador de carga.

## Funcion del Header:

En si, el script hace que cuando el usuario hace clic en el botón del menú, se muestra el menú y se ocultan el botón de menú y el botón de búsqueda. Cuando el usuario hace clic en el botón de cancelar, se oculta el menú y se muestran el botón de menú y el botón de búsqueda. Cuando el usuario hace clic en el botón de búsqueda, se muestra el formulario de búsqueda y se oculta el botón de búsqueda. 

## Función del Slider-Banner:

El script obtiene información de la API de The Movie Database para mostrar las series de televisión mejor calificadas en un slider. Utiliza la función "fetch" para obtener los datos, realiza verificaciones y procesa los datos para mostrarlos en el slider. Además, se agregan eventos de clic para permitir que el usuario navegue por las diferentes series de televisión.

## Función del Scroll-Reveal.JS:

Utiliza la biblioteca ScrollReveal.js para agregar animaciones a todos los elementos "div" en la página web. Se configura con opciones personalizadas que definen la duración, la dirección y la distancia de la animación.

## Librerias usadas
El código HTML utiliza varias librerías y frameworks para agregar funcionalidades y estilos predefinidos al sitio web:

scrollreveal.js: es una librería que permite animar elementos en el sitio web al hacer scrolling, es decir, cuando el usuario baja o sube en la página.

font-awesome: es una librería de iconos que proporciona una amplia variedad de iconos vectoriales para utilizar en el sitio web.

axios: es una librería de JavaScript que permite realizar peticiones HTTP a servidores, por ejemplo, para obtener datos de una API.

