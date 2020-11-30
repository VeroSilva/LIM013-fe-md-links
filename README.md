# Markdown Links

## Índice

- [1. Diagrama de Flujo](#1-diagrama-de-flujo)
- [2. Board](#2-board)
- [3. Sobre la librería](#3-sobre-la-libreria)
- [4. Instalación](#4-instalacion)
- [5. Uso de la librería](#5-uso-de-la-libreria)
- [6. Autores](#6-entregables)

---

## 1. Diagrama de Flujo

![md-links](/home/baudin-silva/proyectos/LIM013-fe-md-links/md-links-flow.png)

## 2. Board

[Backlog del proyecto](https://github.com/VeroSilva/LIM013-fe-md-links/projects/1)

## 3. Sobre la librería

- Desarrollada en Node.js
- Implementa librería node-fetch ^2.6.1
- Implementa librería yargs ^16.1.1
- Implementa librería chalk ^4.1.0

## 4. Instalación

`$ npm install --global <VeroSilva>/md-links`

## 5. Uso de la librería

`md-links example/file.md` : Examina directorio/archivo y extrae sus enlaces.

`md-links example/file.md --validate` : Valida los enlaces encontrados mostrando el estatus de cada uno.

`md-links example/file.md --stats` : Genera estadísticas de los enlaces, ofrece un total de enlaces encontrados y cuántos de ellos son únicos.

`md-links example/file.md --stats --validate` : Genera estadísticas, agregando el valor de **Broken** con el total de enlaces rotos encontrados.

## 6. Autores

- **María Verónica Silva Barreto** - [VeroSilva](https://github.com/VeroSilva)
