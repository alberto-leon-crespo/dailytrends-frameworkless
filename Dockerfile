# Selecciona la imagen base
FROM node:16

# Define el directorio de trabajo en el contenedor Docker
WORKDIR /usr/src/app

# Copia el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instala las dependencias del proyecto
RUN npm install

# Copia el resto del código fuente del proyecto al directorio de trabajo
COPY ./dist ./dist

# Expone el puerto en el que la aplicación va a ejecutarse
EXPOSE 3000

# Define el comando para ejecutar la aplicación
CMD [ "npm", "run", "start" ]