# Release de TS Components

Para lanzar una nueva release de los TS Components, se deben realizar los siguientes pasos, preferiblemente estando ubicado en la rama `master` del repositorio:

1. **Actualizar las versiones** de `components.js` y `components.css` importadas al nombre del release a lanzar, en los archivos:
 	- *webCodeBuilders.ts*
 	- *ts-components.md*
	- *examples.md*
	- *layout.md*
 	- *graphic.md*
 	- *card.md*
2. **Actualizar los JSFiddles** de los archivos *graphic.md* y *card.md*:
	1. Actualizar las versiones de `components.js` y `components.css` usadas en dichos fiddles
	2. Guardar los fiddles, de manera que se les asigne un nuevo hash con los cambios persistidos
	3. Reemplazar las URL de dichos fiddles en los archivos .md
3. **Generar los nuevos archivos de CSS y JS** de la carpeta `dist`, ejecutando `make release-components` desde el directorio raíz del repositorio
4. **Compilar los archivos de la documentación** (si es que hubo cambios en la misma), ejecutando `make docs` desde el directorio raíz del repositorio
	- Es posible, previo a esto, ver cómo quedaría la documentación en http://127.0.0.1:8000/docs/, si se ejecuta desde el directorio raíz del repositorio el comando `make servedocs`
5. **Hacer el release desde GitHub**:
	1. Agregar todos los cambios, ejecutando `git add .` desde el directorio raíz
	2. Confirmar los mismos, ejecutando `git commit -m "Pre-release para versión <miVersion> de TSComponents"`
	3. Subirlos al repositorio global, ejecutando `git push`
	4. Desde la web de GitHub, crear una nueva release y asociarla a `master` para que tome los últimos cambios (los recién pusheados). En lo posible, detallar los cambios agregados al realizar la release, y seguir los patrones "Versión _n_ de TSComponents" para el nombre descriptivo de la misma y `ts_components_n` para su identificador.
6. **Realizar el deploy al ambiente de desarrollo**, para que la documentación ya refleje los cambios realizados:
	1. Ejecutar `npm run build-docs`desde el directorio raíz del repositorio
	2. Ejecutar `make build`desde el directorio raíz del repositorio
	3. Agregar los cambios, commitear y pushear todo a master (preferentemente con el mensaje "Deploy a GitHub Pages"), tal como en el paso v.
---
# Release del Explorer
Para lanzar una nueva release del TS Explorer, se deben realizar los siguientes pasos, preferiblemente estando ubicado en la rama `master` del repositorio:

1. **Actualizar las versiones** de `main.js` y `main.css` importadas al nombre del release a lanzar, en el archivo _ts-explorer.md_
2. **Actualizar el JSFiddle** del archivo _ts-explorer.md_
	1. Actualizar las versiones del tag del Explorer de todos los archivos buscados por CDN en el fiddle
	2. Guardar el fiddle, de manera que se le asigne un nuevo hash con los cambios persistidos
	3. Reemplazar la URL de dichos fiddles en el archivo .md
3. **Generar los nuevos archivos de CSS y JS** de la carpeta `dist`, ejecutando `make release` desde el directorio raíz del repositorio
4. **Compilar los archivos de la documentación** (si es que hubo cambios en la misma), ejecutando `make docs` desde el directorio raíz del repositorio
	- Es posible, previo a esto, ver cómo quedaría la documentación en http://127.0.0.1:8000/docs/, si se ejecuta desde el directorio raíz del repositorio el comando `make servedocs`
5. **Hacer el release desde GitHub**:
	1. Agregar todos los cambios, ejecutando `git add .` desde el directorio raíz
	2. Confirmar los mismos, ejecutando `git commit -m "Pre-release para versión <miVersion> del Explorer`
	3. Subirlos al repositorio global, ejecutando `git push`
	4. Desde la web de GitHub, crear una nueva release y asociarla a `master` para que tome los últimos cambios (los recién pusheados). En lo posible, detallar los cambios agregados al realizar la release, y seguir los patrones "Versión _n_ del Explorer" para el nombre descriptivo de la misma y `n` para su identificador.
6. **Realizar el deploy al ambiente de desarrollo**, para que la documentación ya refleje los cambios realizados:
	1. Ejecutar `npm run build-docs`desde el directorio raíz del repositorio
	2. Ejecutar `make build`desde el directorio raíz del repositorio
	3. Agregar los cambios, commitear y pushear todo a master (preferentemente con el mensaje "Deploy a GitHub Pages"), tal como en el paso iii.