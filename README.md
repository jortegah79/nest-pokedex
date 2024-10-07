<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  # EJECUTAR EN DESARROLLO
  
  1. Clonar el repositorio.
  2. Ejecutar  ```  npm install  ```
  3. Tener Nest CLi instalado 
  ``` npm i -g @nestjs/cli  ```
  4. Levantar la base de datos 
  ```  docker compose up -d ```
  5. Clonar el archivo __.env.template__ y renombrar la copia a __.env__
  6. Llenar las variables de entorno definidas en el ```.env ```
  7. Ejecutar la apliación en dev:
  ``` nest start -w ```
  8. Reconstruir los datos de la base de datos mediante la semilla 
  ```
  http://localhost:3000/api/v2/seed
  ```

  ## STACK USADO

  * MongoDB
  * Nestjs