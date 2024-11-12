# Utilizar una imagen oficial de Node.js como base
FROM node:12

# Crear un directorio de trabajo
WORKDIR /app

# Copiar el package.json y package-lock.json si existen
COPY package*.json ./

# Instalar npm versión específica y Angular CLI globalmente
RUN npm install -g npm@6.13 \
    && npm install -g @angular/cli@8

# Copiar el resto del código de la aplicación
COPY . .

# Instalar dependencias del proyecto
RUN npm install

# Exponer el puerto que usa ng serve
EXPOSE 4200

# Comando para iniciar la aplicación en modo desarrollo
CMD ["ng", "serve", "--host", "0.0.0.0"]
