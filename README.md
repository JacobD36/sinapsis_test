# SINOPSIS API REST TEST
***
## Introducción

El siguiente código responde a lo solicitado en la Prueba Técnica Backend Senior.

## NodeJS

Se utilizó NodeJS en su versión 18.16.0.

## Rutas y Endpoints

### Main API endpoint access:

```
    http://localhost:3000
```

### Rutas de acceso:

```
    Clientes: '/api/clients',
    Usuarios: '/api/users',
    Campañas: '/api/campaigns',
    Mensajes: '/api/messages',
```

### Documentación:

```
    http://localhost:3000/api-docs
```

### Acceso a la base de datos:

El acceso a la base de datos está definido en el archivo de variables de entorno .env en la raíz del proyecto.

### Variables de entorno

El archivo .env, el cual define las variables de entorno, define las siguientes variables globales:

```
    PORT=3000 // Puerto de acceso a la API
    DB_USER=root // Usuario de acceso a la base de datos
    DB_PASS=a2JqbmZxZnNmeTc5 // Contraseña de acceso a la base de datos
    DB_HOST=localhost // Host de acceso a la base de datos
    MYSQL_DATABASE=challenge_db 
    HOST_MACHINE_MYSQL_PORT=3306 // Puerto de acceso a la base de datos
```
En ellas se define el puerto de acceso a la API, el usuario y contraseña de acceso a la base de datos, el nombre de la base de datos y el puerto de acceso a la base de datos. Por defecto el nombre de la tabla que se utilizará será challenge_db, pero se puede cambiar en el archivo .env.

## Instalación

Para instalar el proyecto, se debe clonar el repositorio y ejecutar el siguiente comando en la raíz del proyecto:

```
    npm install
```

## Ejecución

Para ejecutar el proyecto, se debe ejecutar el siguiente comando en la raíz del proyecto:

```
    npm start
```

## Ejecución de pruebas unitarias

Para ejecutar las pruebas unitarias, se debe ejecutar el siguiente comando en la raíz del proyecto:

```
    npx jest
```

## Serverless Offline

Para ejecutar el proyecto en modo serverless offline, se debe ejecutar el siguiente comando en la raíz del proyecto:

```
    npm run offline
```

## Uso con Docker

Para desplegar el proyecto en un contenedor, se debe ejecutar el siguiente comando en la raíz del proyecto:

```
    docker-compose up -d --build
```

## Pruebas en Postman

Se incluye el archivo ChallengeAPI.postman_collection.json en la raíz del proyecto, el cual contiene las pruebas y endpoints establecidos y clasificados, con información de muestra realizadas en Postman.


## Scripts SQL

Se incluyen los scripts correspondientes al diseño de la base de datos en el archivo challenge_db.sql en la raíz del proyecto. Los scripts incluyen data de muestra.

## Autor
* **Jaime Arturo Pérez Frias** - *Desarrollador Backend*