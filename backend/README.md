# Xepelin - Parte 2: Backend

- REST API with [NestJS](https://docs.nestjs.com/ "NestJS") and [Prisma](https://www.prisma.io/ "Prisma")
- Authentication with [Cognito](https://aws.amazon.com/es/cognito/ "Cognito")

### Objetivo

Desarrollar con buenas practicas de arquitectura de software los siguientes endpoints:
1. POST /accounts: Crea una nueva cuenta bancaria. Este endpoint debería aceptar detalles de la cuenta como el nombre y el número de cuenta, y devolver un ID de cuenta.
2. GET /accounts/<id>/balance: Obtiene el balance de la cuenta bancaria.
3. POST /transactions: Realiza una transacción bancaria. Este endpoint debería
aceptar detalles de la transacción como el ID de la cuenta, el tipo de transacción (depósito o retiro) y el monto de la transacción.
Además, implementa un middleware que registre en la consola cada vez que se realiza un depósito de más de 10,000 US$.

### Suposiciones & Consideraciones

- EL desafío no hablaba de autentificación, pero di por sentado que era mandatorio contar con ello para resguardar todos los recursos, decidi implementar cognito como servicio de autentificación dado que a nivel frontend puedo utilizar amplify para manejar no solo la autentificación sino los recursos de manera eficiente y simple.

- Para la implementación del **event storage** utilice una tabla dentro de la misma base de datos a fines prácticos, Sin embargo, la arquitectura está diseñada para permitir una implementación independiente utilizando una base de datos NoSQL como DynamoDB, por ejemplo.

- En cuanto al objetivo del ejercicio, no se especificaba si un usuario podía tener una o varias cuentas. Tomando como referencia el enfoque de Stripe, se decidió avanzar hacia la posibilidad de que un usuario pueda tener múltiples cuentas (N cuentas, para ser precisos).


### API Documentation

Documentación de Swagger disponible en https://localhost:3000/api/docs


### Puesta en marcha

1 - Clone este resositorio e instale todas las dependencias del proyecto.

```bash
$ npm install
```
2. Copie .env.example to .env y releene los valores.
3. Run `$npm run start` para iniciar el servidor en modo de desarrollo.
4. Cree las tablas necesarias `$npx prisma migrate dev --name init`
5. Watch mode `$npm run start:dev`


### Testing 
1. Run the project unit test `$npm run test`.
2. Run the project e2e test `$npm run test:e2e`.

##### Consideraciones del testing
- Use supertest para probar los endpoints de las APIs.
- Use mysql con prisma como orm para testear a nivel e2e.

### Arquitectura en AWS

Si necesitamos escalar propondría la siguiente arquitectura con una API Getway para la caché y un orquestador para gestionar los contenedores. A su vez un Event Bus como EventBridge para manejar eventos.

![](https://github.com/mauriciosneira/xepelin/blob/main/backend/assets/approach-arquitectura-xepelin.png)

