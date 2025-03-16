# ArchiApp-Server

## Description

Ce projet est le serveur de l'application ArchiApp. Il est réalisé en Node.js avec le framework Express.js. Il est déployé sur la plateforme Render.

## Fonctionnalités

- Envoi d'un message (GET /msg/post)
- Récupération des messages (GET /msg/getAll)
- Récupération d'un message par son id (GET /msg/get/[id])
- Récupérations du nombre de messages (GET /msg/nber)
- Suppression d'un message par son id (GET /msg/del/[id])

## Sturcture des messages et stockage

```json
{
  "pseudo": "Alice",
  "msg": "Hello, World!",
  "time": "2025-03-14T12:00:00Z"
}
```

Les messages sont stockés dans la variable `allMsgs`.

## Les liens utiles

- [Le dépôt GitHub du projet client](https://github.com/41ks/ArchiApp-Client.git)
- [Le dépôt GitHub du projet serveur](https://github.com/41ks/ArchiApp-Server.git)
- [Le lien vers le site web](https://archiapp-client.onrender.com/)
- [Le lien vers l'api](https://archiapp-server.onrender.com/)
