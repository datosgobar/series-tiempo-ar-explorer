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
2. Iniciar web server `make watch` para levantar el servidor en localhost:3000

### Desarrollo de componentes exportables

Se puede iniciar un servidor web para servir un dashboard que utiliza los componentes exportables usando `make components-watch`


Para mas info: [react documentation](react_doc.md)



### Problemas comunes
* `npm start`: Error al iniciar el server. 
Solución: ` echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`
* Para correr los tests de un archivo en particular: 
  - `npm test -- -- <name of describe>` [why the "--" magick incantation](https://stackoverflow.com/a/28775887)


### Debugging en VS code

Usar esta launch configuration

```
    {
        "name": "Debug Jest Tests",
        "type": "node",
        "request": "launch",
        "runtimeArgs": ["--inspect-brk", "${workspaceRoot}/scripts/test.js", "--runInBand", "--env=jsdom"],
        "port": 9229,
        "console": "integratedTerminal",
        "internalConsoleOptions": "neverOpen"
    }
```