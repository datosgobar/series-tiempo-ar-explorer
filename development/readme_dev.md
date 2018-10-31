# Series Tiempo Ar Explorer

## Setup

### Requerimientos

Este proyecto requiere Node v8.9.4 o superior (npm v6.0.0).

Puede ser instalado con [nvm](https://github.com/creationix/nvm)

- Instalar node y npm. `nvm install 8.9.4`

O vía package manager:

- `curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -`
- `sudo apt-get install -y nodejs`


### Desarrollo

1. Instalar [hooks](https://github.com/icefox/git-hooks) `git hooks install`
1. Instalar dependencias: `npm install`
2. Iniciar web server `npm start`


Para mas info: [react documentation](react_doc.md)



### Problemas comunes
* `npm start`: Error al iniciar el server. 
Solución: ` echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`
* Para correr los tests de un archivo en particular: 
  - `npm test -- -- <name of describe>` [why the "--" magick incantation](https://stackoverflow.com/a/28775887)
