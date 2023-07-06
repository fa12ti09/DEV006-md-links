# Markdown Links

## Índice

* [1. Resumen del proyecto](#1-Resumen-del-proyecto)

* [2. Esquema de llaves](#2-Esquema-de-llaves)

* [3. Planeación y Organización](#4-Planeación-y-Organizacióne)


***


## 1.-Resumen del proyecto

En este proyecto realice una libreria para leer archivos md.

En esta oportunidad nos alejamos un poco del navegador para construir un
programa que se ejecute usando Node.js. Aprenderemos sobre procesos
(`process.env`, `process.argv`, ...), cómo interactuar con el sistema archivos,
cómo hacer consultas de red, etc.

[Node.js](https://nodejs.org/es/) es un entorno de ejecución para JavaScript
construido con el [motor de JavaScript V8 de Chrome](https://developers.google.com/v8/).
Esto nos va a permitir ejecutar JavaScript en el entorno del sistema operativo,
ya sea tu máquina o un servidor, lo cual nos abre las puertas para poder
interactuar con el sistema en sí, archivos, redes, etc.

Diseñar tu propia librería es una experiencia fundamental para cualquier
desarrolladora porque que te obliga a pensar en la interfaz (API) de tus
_módulos_ y cómo será usado por otras developers. Debes tener especial
consideración en peculiaridades del lenguaje, convenciones y buenas prácticas.

***

## Esquema de llaves
![esquemallaves1](https://github.com/fa12ti09/DEV006-md-links/assets/127429394/aa34177e-adc8-4bf0-94fa-cde2998028c1)
![esquemallaves2](https://github.com/fa12ti09/DEV006-md-links/assets/127429394/91a0166c-c616-410a-86c0-340b3b4fc99b)
![esquemasllaves3](https://github.com/fa12ti09/DEV006-md-links/assets/127429394/132a628d-186d-4000-8ffe-be38f0e9dd02)


 * JavaScript API
El módulo debe poder importarse en otros scripts de Node.js y debe ofrecer la siguiente interfaz:

mdLinks(path, options)
Argumentos
path: Ruta absoluta o relativa al archivo o directorio. Si la ruta pasada es relativa, debe resolverse como relativa al directorio desde donde se invoca node - current working directory).
options: Un objeto con únicamente la siguiente propiedad:
validate: Booleano que determina si se desea validar los links encontrados.
Valor de retorno
La función debe retornar una promesa (Promise) que resuelva a un arreglo (Array) de objetos (Object), donde cada objeto representa un link y contiene las siguientes propiedades

Con validate:false :

href: URL encontrada.
text: Texto que aparecía dentro del link (<a>).
file: Ruta del archivo donde se encontró el link.
Con validate:true :

href: URL encontrada.
text: Texto que aparecía dentro del link (<a>).
file: Ruta del archivo donde se encontró el link.
status: Código de respuesta HTTP.
ok: Mensaje fail en caso de fallo u ok en caso de éxito.
Ejemplo (resultados como comentarios)
const mdLinks = require("md-links");

mdLinks("./some/example.md")
  .then(links => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);

mdLinks("./some/example.md", { validate: true })
  .then(links => {
    // => [{ href, text, file, status, ok }, ...]
  })
  .catch(console.error);

mdLinks("./some/dir")
  .then(links => {
    // => [{ href, text, file }, ...]
  })
  .catch(console.error);
## Resultado 
### True
![true](https://github.com/fa12ti09/DEV006-md-links/assets/127429394/2c8dfb3e-be5b-4002-b777-576296bc605b)

### False
![false](https://github.com/fa12ti09/DEV006-md-links/assets/127429394/1511f13d-03a1-4119-a78a-6f5c87cba2a5)



#### Planeación y Organización
![trellomd](https://github.com/fa12ti09/DEV006-md-links/assets/127429394/615dc153-e0cc-45e0-8f77-5ae35f8f802b)











