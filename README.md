
## Xepelin - Docker Compose

### Requisitos generales

1. Debes asegurarte de que el código sea de alta calidad, fácil de mantener y cumpla con los principios de diseño y buenas prácticas
2. El Sistema completo debe poder levantarse en local mediante el uso de docker-compose.

### Consideraciones
Si se Desea utilizar docker compose simplemente debe de seguir esta guía, de otro modo dentro de cada proyecto va a poder encontrar un Read.me particular para trabajar en cada uno de ellos sin la necesidad de la utilización de docker.

- [Frontend](https:/// "Frontend")
- [Backend](https:/// "Backend")

### Puesta en marcha

1 - Primero hay que correr el siguiente comando.

```bash
$ docker-compose up --build -V
```
2 - Para conectarnos a MySql

```bash
$ docker-compose exec db /bin/bash
$ mysql -h localhost -u user -puser
```
3 - Cree las tablas necesarias
```bash
$docker-compose exec api npx prisma migrate dev --name init
```
Nos conectamos al contenedor con la instrucción docker-compose exec api y luego podemos ejecutar el comando que deseemos.



### Testing 
1. Run the project unit test `docker-compose exec api run test`
2. Run the project e2e test `$docker-compose exec apin run test:e2e`