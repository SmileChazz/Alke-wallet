# Alke Wallet 💳

Aplicación de billetera digital desarrollada como proyecto del Módulo 2 de Alkemy. Permite a los usuarios gestionar sus activos financieros de manera segura y conveniente desde el navegador.

---

## Descripción

Alke Wallet es un front-end dinámico que simula las funcionalidades básicas de una wallet digital: inicio de sesión, consulta de saldo, depósitos, transferencias entre contactos y visualización del historial de transacciones.

---

## Funcionalidades

- **Inicio de sesión:** Validación de credenciales con redirección al menú principal.
- **Menú principal:** Visualización del saldo disponible y acceso a las funcionalidades.
- **Depósitos:** Permite agregar fondos a la cuenta, actualizando el saldo en tiempo real.
- **Envío de dinero:** Simulación de transferencias a contactos registrados con validación de saldo suficiente.
- **Contactos:** Búsqueda con autocompletado y registro de nuevos contactos.
- **Historial de transacciones:** Registro completo de todos los movimientos realizados.

---

## Tecnologías utilizadas

- HTML5
- CSS3
- JavaScript
- Bootstrap 5
- jQuery
- localStorage (persistencia de datos en el navegador)

---

## Estructura del proyecto

```
Alke-wallet/
├── index.html
├── login.html
├── menu.html
├── deposit.html
├── sendmoney.html
├── transactions.html
├── css/
│   └── styles.css
└── js/
    └── app.js
```

---

## Credenciales de acceso

Para probar la aplicación usa las siguientes credenciales:

- **Correo:** usuario@alkewallet.com
- **Contraseña:** 123456

---

## Instalación y uso

1. Clona el repositorio:
   ```bash
   git clone https://github.com/SmileChazz/Alke-wallet.git
   ```
2. Abre el archivo `index.html` en tu navegador, clickeando iniciar sesión te redirigira al login.
3. Inicia sesión con las credenciales indicadas arriba.

No requiere instalación de dependencias ni servidor backend.

---

## Ramas del proyecto

| Rama                            | Descripción |
|---------------------------------|---------------------------------------|
| `master`                        | Código estable |
| `feature/login`                 | Funcionalidad de inicio de sesión |
| `feature/depositos`             | Gestión de saldo y depósitos |
| `feature/transacciones`         | Envío, recepción e historial de movimientos |

---

## Autor

Desarrollado por Silvia Rojas como parte del bootcamp de Alkemy — Módulo 2: Fundamentos del desarrollo Front-end.
