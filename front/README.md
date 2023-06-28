
## Xepelin - Parte 1: Fronted

- Use NextJS [NextJS](https://nextjs.org/ "NestJS")
- Authentication with [Cognito](https://aws.amazon.com/es/cognito/ "Cognito")
- Amplify de AWS. [Amplify](https://docs.amplify.aws/ "NestJS")

### Objetivo

Desarrolla una aplicación de interfaz de usuario que permita a los usuarios abrir una nueva
cuenta
bancaria y realizar transacciones bancarias como depósitos y retiros.
1. La aplicación debe permitir a los usuarios introducir los detalles de su cuenta, como el nombre, el número de cuenta y el saldo inicial.
2. Los usuarios deben poder realizar depósitos y retiros, introduciendo el monto de la transacción y seleccionando el tipo de transacción.
3. La aplicación debe mostrar el balance actualizado de la cuenta después de cada transacción.
4. La aplicación debe trabajar con CSS in JS y state management.
5. Implementa pruebas unitarias con Jest y asegúrate de que la cobertura de las pruebas
sea mayor al 80%.
6. Incluye un archivo README que explique cómo ejecutar el código y las pruebas.

### Suposiciones & Consideraciones

- El desafío no hablaba si era necesario considerar multicuentas por parte del usuario, así que se opto que desde el frontend solo se pueda crear una cuenta, pero la API soporta multiples cuentas por usuario, lo que habilitaría si lo deseamos agregar ese feature.

- Decidí implementar Amplify debido a su capacidad para simplificar la implementación de componentes, autenticación y el uso de recursos en mi proyecto. Sin embargo, me encontré con un problema al intentar realizar pruebas utilizando Jest, ya que existen algunos problemas de compatibilidad entre Jest y Amplify. Resolver estos problemas requeriría más tiempo del que tenía disponible para el desafío en cuestión. Por lo tanto, tomé la decisión de completar la entrega con todas las funcionalidades requeridas, pero con la consideración de que las pruebas con Jest y Amplify no se encuentran implementadas. A pesar de este contratiempo, logré cumplir con los requisitos funcionales del proyecto de manera satisfactoria.

### Puesta en marcha

1 - Clone este resositorio e instale todas las dependencias del proyecto.

```bash
$ npm install
```
2. Copie .env.example to .env y releene los valores.
3. Run `$npm run dev` para iniciar el servidor en modo de desarrollo.
4. Abra su navegador en [http://localhost:3000](http://localhost:3000).

### Testing 
1. Run the project unit test `$npm run test`.