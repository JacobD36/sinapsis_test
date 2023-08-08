# Establecer la imagen base de Node.js
FROM node:18.16.0

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar los archivos necesarios
COPY package.json package-lock.json /app/
COPY dist /app/dist

# Instalar las dependencias
RUN npm install --production

# Exponer el puerto 3000
EXPOSE 3000

# Comando para ejecutar la aplicación
CMD ["npm", "start"]