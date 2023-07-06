const fs = require('fs');
const path = require('path');
const axios = require('axios');

const checkPath = (route) => {
  return new Promise((resolve, reject) => {
    const pathExist = fs.existsSync(route);
    if (pathExist) {
      resolve(route);
    } else {
      reject('La ruta no existe');
    }
  });
};

const itsAbsolute = (route) => {
  return new Promise((resolve, reject) => {
    const routeAbsolute = path.isAbsolute(route);
    if (!routeAbsolute) {
      const routeConvertAbsolute = path.resolve(route);
      resolve(routeConvertAbsolute);
    }
    resolve(route);
  });
};

const convertAbsolute = (route) => {
  return new Promise((resolve) => {
    const routeConvertAbsolute = path.resolve(route);
    resolve(routeConvertAbsolute);
  });
};

const fileDirectory = (route) => {
  return new Promise((resolve, reject) => {
    fs.stat(route, (error, stats) => {
      if (error) {
        reject(new Error('La ruta no es ni un archivo ni un directorio'));
        return;
      }
      if (stats.isFile()) {
        resolve('archivo');
      } else if (stats.isDirectory()) {
        resolve('directorio');
      }
    });
  });
};

const extensionsMd = (route) => {
  return new Promise((resolve, reject) => {
    const extension = path.extname(route);
    resolve(extension === '.md');
  });
};

const readMD = (route) => {
  return new Promise((resolve, reject) => {
    fs.readFile(route, 'utf-8', (error, datos) => {
      if (error) {
        reject(error);
      } else {
        resolve(datos);
      }
    });
  });
};

const extraerLinks = (content, filePath) => {
 /*  return new Promise((resolve, reject) => { */
    const regExtract = /\[([^\]]+)\]\((http[s]?:\/\/[^\)]+)\)/g;
    const links = [];
    let match;

    while ((match = regExtract.exec(content)) !== null) {
      const text = match[1];
      const URL = match[2];
      links.push({ href: URL, text: text, file: filePath });
    }
 return links;
 /*    if (links.length > 0) {

      resolve(links);
    } else {
      reject(new Error('No se encontraron enlaces'));
    }
  }); */
};

const validateLinks = (links) => {
  //   if (!Array.isArray(links)) {
  //   return Promise.reject(new Error('La variable links no es un arreglo'));
  // }
  
    const linkPromises = links.map(link => {
      return axios.get(link.href)
        .then(response => {
          return {
            href: link.href,
            text: link.text,
            file: link.file,
            status: response.status,
            ok: response.statusText
          };
        })
        .catch(error => {
          return {
            href: link.href,
            text: link.text,
            file: link.file,
            status: error.response ? error.response.status : null,
            ok: 'fail'
          };
        });
    });
  
    return Promise.all(linkPromises);
  };
  
module.exports = {
    checkPath,
    itsAbsolute,
    convertAbsolute,
    fileDirectory,
    extensionsMd,
    readMD,
    extraerLinks,
    validateLinks
};

