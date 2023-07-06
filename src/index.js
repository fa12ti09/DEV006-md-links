const { checkPath, itsAbsolute, convertAbsolute, fileDirectory, extensionsMd, readMD, extraerLinks, validateLinks } = require('./funciones.js');

const mdLinks = (path, options) => {
  let filepath; // Variable global para almacenar el filepath

  return new Promise((resolve, reject) => {
    itsAbsolute(path)
      .then((absolutePath) => {
        filepath = absolutePath; // Asignar el valor del filepath a la variable global
        return checkPath(absolutePath);
      })
      .then((path) => {
        return extensionsMd(path);
      })
      .then((isMD) => {
        if (!isMD) {
          throw new Error('La extensión del archivo no es .md');
        }
        return fileDirectory(path);
      })
      .then((routeType) => {
        //console.log('Tipo de ruta:', routeType);

        return readMD(path);
      })
      .then((data) => {
        const resultLinks = extraerLinks(data, filepath);
  

        if (options && options.validate) {
          return validateLinks(resultLinks)
            .then((validatedLinks) => {
              return validatedLinks;
            })
            .catch((error) => {
              console.error('Error en la validación de los enlaces:', error);
              return resultLinks;
            });
        } else {
          return resultLinks;
        }
      })
      .then((links) => {
        return resolve(links);
      })
      .catch((error) => {
        console.error(error);
        return reject('Esto está fallando');
      });
  });
};

const path = 'C:\\Users\\Sara Copado\\DEV006-md-links\\src\\prueba.md';
const options = { validate: true };

mdLinks(path, options)
  .then((data) => {
    if (Array.isArray(data)) {
      console.log('Data', data);
    } else {
      console.log('Error: El resultado no es un arreglo');
    }
  })
  .catch((error) => {
    console.log('error',error);
});
/*checkPath('src/funciones.js')
  .then(() => {
    // La promesa se resolvió correctamente, no es necesario mostrar nuevamente en consola
  })
  .catch(() => {
     // Mostrar en consola en caso de rechazo
  });

  itsAbsolute('C:\\Users\\Sara Copado\\DEV006-md-links\src')
   .then(resultado => {
    console.log(resultado); // true 
  })
  .catch(error => {
    console.error(error);
  });

   itsAbsolute('src\\funciones.js')
   .then(resultado => {
    console.log(resultado); // false
   })
   .catch(error => {
    console.error(error);
   });

   

   convertAbsolute('src\\funciones.js')
  .then(routeConvertAbsolute => {
    console.log(routeConvertAbsolute); // false
  })
  .catch(error => {
    console.error(error);
  });

  fileDirectory('C:\\Users\\Sara Copado\\Desktop\\pruebas')
  .then(type => console.log(`La ruta es un ${type}.`))
  .catch(error => console.log('Error al verificar la ruta;' , error));

  fileDirectory('C:\\Users\\Sara Copado\\Desktop\\pruebas\\baby-steps.js')
  .then(type => console.log(`La ruta es un ${type}.`))
  .catch(error => console.log('Error al verificar la ruta;' , error));

  
  extensionsMd('C:\\Users\\Sara Copado\\DEV006-md-links\\README.md')
  .then(esMD => {
    if(esMD) {
      console.log('El archivo es MD');
    } else {
      console.log('El archivo no es MD')
    }
  })
.catch(error => {
  console.log('Error al verificar el archivo' , error)
})

readMD('C:\\Users\\Sara Copado\\DEV006-md-links\\README.md')
  .then((datos) => {
      return extraerLinks(datos);
  })
  .then((links) => {
    console.log('Links Extraidos' , links);
  })
  .catch((error) => {
    console.error('error al extraer los enlaces', error);
  });*/
   module.exports = {
    mdLinks
   };