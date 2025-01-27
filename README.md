Tripleten web_project_around_react

El proyecto esta desarrollado con los siguientes componentes hooks,react,vite,javascript, html 5 y css, diseñado en 3 dimensiones estandar 1280px,880px y 320px totalmente responsiva. La pagina consta de un blog de fotos de lugares muy conocidos de un usuario. En funcionalidad el usuario puedo editar campos como nombre e descripcion mediante popus que cuentan con un formulario totalmente centrado y fijado. Tambien puedo cerrar los popus. Se actualizo con cambios sobre el agregar tarjetas con información registrada por el usuario, permite eliminar las tarjetas y la nueva funcionalidad dar like a cada tarjeta. Actualmente el proyecto cuenta con funcionalidades de like,eliminar y crear tarjetas. De igual forma visualizar cada tarjeta individualmente y validación de campos de entrada de cada formulario. Por ultimo, se ordeno el proyecto mediante el uso de clases para las tarjetas y validaciones de campos de entradas.

Tecnicas y Tecnologias utilizadas: Figma una herramienta donde nos enseñan como se debe distribuir la pagina web y sus elementos. Cuenta con version online y en escritorio. Git hub es una plataforma de desarrollo colaborativo basada en Git, un sistema de control de versiones. GitHub proporciona herramientas y servicios que facilitan la colaboración en proyectos de desarrollo de software. Vscode es un editor de código fuente gratuito y de código abierto desarrollado por Microsoft. Metodologia BEM divide la interfaz de usuario en bloques independientes para crear componentes escalables y reutilizables. Tinypng es un servicio en línea que se utiliza para comprimir imágenes, reduciendo su tamaño de archivo sin comprometer significativamente la calidad visual. Javascript es un lenguaje de programacion que te permite implementar funciones mas complejas en paginas web. React y vite. El uso de hooks como useState,useEffect,useRef y useContext, para poder realizar modificaiones de estado,obtencion de valores y tambien aplicar cambios a demas hijos debajo de un contexto. Por ultimo, uso de api para poder hacer cambios de perfil y tarjetas en la pagina web desde un servidor.

https://jorgemarcalaya.github.io/web_project_around_react/

---

Instrucciones para desplegar el proyecto en vite

---

Tener en consideracion las siguientes indicaciones y comandos para desplegar el proyecto en vite:
-- Crear un nuevo proyecto con Vite, en el directorio actual que te encuentres:
npm create vite@latest .
-- Instalar las dependencias
npm i
-- Luego añade el fla "--open" a tus scripts en package.json, con el fin que el proyecto abra una nueva pestaña automaticamente.
"dev" : "vite --open"
-- Actualiza el archivo vite.config.json para establecer el puerto 3000, ya que este es el puerto que utilizan los revisores de codigo
-- Levanta el servidor de desarrollo
npm run dev
-- Desplegar la aplicacion en produccion
npm run build
