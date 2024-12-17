# AssecoSync🕐

**AssecoSync** es la solución ideal para gestionar el tiempo laboral en **Asseco**. Nuestra plataforma no solo facilita el registro horario, sino que también transforma la forma en que empleados y administradores gestionan vacaciones, ausencias y documentación laboral, promoviendo eficiencia y transparencia.

![Home AssecoSync](src/assets/images/screenshots/login.jpg)

---

## Estructura del proyecto📁

Hemos separado el proyecto en dos repositorios:

- **[AssecoSync Cliente](https://github.com/LorelizDev/AssecoSync_client)**: Se enfoca exclusivamente en la interfaz de usuario (UI), lógica de presentación y experiencia del usuario.

- **[AssecoSync API](https://github.com/LorelizDev/AssecoSync_API)**: Se encarga de la lógica de negocio, almacenamiento de datos, autenticación, autorizaciones, y comunicación con la base de datos.

---

## Índice📞

1. [Descripción General](#descripción-general✨)
2. [Visión](#visión🌟)
3. [Público Objetivo](#público-objetivo👥)
4. [Tecnologías Usadas](#tecnologías-usadas💻)
5. [Características Principales](#características-principales✨)
6. [Instalación](#instalación🛠️)
7. [Capturas de pantalla](#capturas-de-pantalla📸)
8. [Documentación](#documentación📚)
9. [Futuras Mejoras](#futuras-mejoras🚀)

---

## Descripción General✨

**AssecoSync** es una aplicación web responsive que simplifica la gestión del tiempo laboral para empleados y administradores de **Asseco**. Permite registrar jornadas laborales, gestionar ausencias y vacaciones, y consultar reportes detallados, todo desde una interfaz moderna y amigable.

**Objetivo:**
Crear una plataforma integral que optimice procesos administrativos, garantizando eficiencia en el registro horario y mejora en la experiencia de los usuarios.

**Alcance de la versión inicial:**

- Registro horario.
- Gestión de vacaciones y ausencias.
- Panel de administración para Admin.

---

## Visión🌟

Proporcionar una herramienta tecnológica eficiente que mejore la experiencia del personal de **Asseco**, ofreciendo una gestión laboral clara, fácil y transparente.

---

## Público Objetivo👥

- **Empleados:** Gestionar su jornada laboral y vacaciones.
- **Administradores:** Supervisar y analizar el tiempo laboral y aprobar/rechazar las solicitudes.

---

## Tecnologías Usadas💻

### Frontend:

- ![React](https://img.shields.io/badge/React-blue?style=for-the-badge&logo=react&logoColor=white): Biblioteca para construir interfaces interactivas.
- ![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white): Framework para diseño y estilos.
- ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white): Para solicitudes HTTP.
- ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white): Navegación en la aplicación.
- ![FullCalendar](https://img.shields.io/badge/FullCalendar-3E7B8B?style=for-the-badge&logo=calendar&logoColor=white): Biblioteca para integrar calendarios interactivos.
- ![React Calendar](https://img.shields.io/badge/React_Calendar-FF6F61?style=for-the-badge&logo=react&logoColor=white): Componente para gestionar eventos en el calendario.
- ![React Icons](https://img.shields.io/badge/React_Icons-EFC050?style=for-the-badge&logo=react&logoColor=white): Conjunto de iconos personalizables.
- ![React Toastify](https://img.shields.io/badge/React_Toastify-FFDD57?style=for-the-badge&logo=react&logoColor=white): Biblioteca para mostrar notificaciones emergentes.
- ![Zustand](https://img.shields.io/badge/Zustand-FF5722?style=for-the-badge&logo=redux&logoColor=white): Librería para el manejo del estado global.
- ![SweetAlert](https://img.shields.io/badge/SweetAlert-5CB85C?style=for-the-badge&logo=javascript&logoColor=white): Herramienta para mostrar alertas personalizadas.
- ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white): Herramienta para asegurar la calidad del código.
- ![Husky](https://img.shields.io/badge/Husky-000000?style=for-the-badge&logo=git&logoColor=white): Pre-commit hooks para mantener estándares en el código.
- ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=white): Formateador de código para mantener consistencia.

### Herramientas:

- ![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white): Pruebas unitarias.
- ![Jira](https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=jira&logoColor=white): Gestión de tareas y proyectos.
- ![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white): Diseño de interfaces y prototipos.

---

## Características Principales✨

- **Registro horario:** Entrada y salida con modalidades presencial o teletrabajo.
- **Calendario:** Visualización de jornadas, vacaciones y festivos.
- **Panel de administración:** Supervisión y gestión de fichajes.
- **Gestión de solicitudes:** Aprobación/rechazo de vacaciones y ausencias.

---

## Instalación🛠️

Sigue estos pasos para instalar y configurar el proyecto:

1. **Clona el repositorio**:

   ```bash
   git clone https://github.com/LorelizDev/AssecoSync_client.git
   ```

2. **Instalar dependencias**:

   ```bash
   npm install
   ```

3. **Ejecutar el proyecto**:

   ```bash
   npm run dev
   ```

---

## Capturas de Pantalla📸

### Admin Solicitudes

![Admin Solicitudes](src/assets/images/screenshots/admin-solicitudes.jpg)

### Calendario

![Calendario](src/assets/images/screenshots/calendar.jpg)

### Dashboard Admin

![Dashboard Admin](src/assets/images/screenshots/dashboard-admin.jpg)

### Dashboard

![Dashboard](src/assets/images/screenshots/dashboard.jpg)

### Solicitar Ausencias

![Solicitar Ausencias](src/assets/images/screenshots/solicitar-ausencias.jpg)

### Solicitar Vacaciones

![Solicitar Vacaciones](src/assets/images/screenshots/solicitar-vacaciones.jpg)

### Jira

![Jira](src/assets/images/screenshots/jira.jpg)

---

## Documentación📚

- [Documentación de Visión del Proyecto](src/docs/DOCUMENTO%20DE%20VISIÓN%20DEL%20PROYECTO.pdf)
- [Convención para la creación de ramas](src/docs/CONVENCION%20PARA%20LA%20CREACION%20DE%20RAMAS.pdf)
- [Plantilla de Prompts](src/docs/PLANTILLA%20DE%20PROMPTS.pdf)

---

## Futuras Mejoras🚀

- **Reportes avanzados:** Visualización gráfica de estadísticas laborales.
- **Integración con herramientas externas:** Sincronización con calendarios corporativos.
- **Gestor de roles:** Diferentes niveles de acceso y permisos.
- **Tests:** Finalizar los tests
- **Notificaciones:** Activar notificaciones sobre las solicitudes
- **Automatización fin de jornada:** Automatizar el control de jornada con notificaciones 30min antes de que acabe la jornada
- **Adjuntar Documentos:** Adjuntar documentos de justificantes para las ausencias

---

Gracias por confiar en **AssecoSync**. Nuestro compromiso es facilitar tu gestión laboral y optimizar tu tiempo. ¡Estamos para ayudarte!
