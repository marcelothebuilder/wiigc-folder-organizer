# Welcome to wiigc-folder-organizer 👋
![Version](https://img.shields.io/badge/version-0.0.1-blue.svg?cacheSeconds=2592000)
[![License: GPLv3](https://img.shields.io/badge/License-GPLv3-yellow.svg)](#)
[![Twitter: marcelopaixaor](https://img.shields.io/twitter/follow/marcelopaixaor.svg?style=social)](https://twitter.com/marcelopaixaor)

> Rename folders adding titleid

> HIGHLY UNTESTED!

> use at your own risk, done in less than two hours without tests and error handling

## Objective

Turn this:
```sh
marcelo@marcelo-notebook:/media/marcelo/GameCube$ tree
.
├── 1080° avalanche
│   └── blablaba.iso
├── alien hominid
│   └── wrongname.iso
├── animal crossing
│   └── qdqww.iso
├── baten kaitos! eternal wings and the lost ocean
│   ├── disc2.iso
│   └── game.iso
├── baten kaitos origins
│   ├── disc2.iso
│   └── game.iso
└── battalion wars
    └── shouldbenamedgame.iso
```

Into this:
```sh
marcelo@marcelo-notebook:/media/marcelo/GameCube$ tree
.
├── 1080° Avalanche [GTEE01]
│   └── game.iso
├── Alien Hominid [GAHEGG]
│   └── game.iso
├── Animal Crossing [GAFE01]
│   └── game.iso
├── Baten Kaitos! Eternal Wings and the Lost Ocean [GKBPAF]
│   ├── disc2.iso
│   └── game.iso
├── Baten Kaitos Origins [GK4E01]
│   ├── disc2.iso
│   └── game.iso
└── Battalion Wars [G8WE01]
    └── game.iso

```

For better organization with Nintendont and USB Loader GX.

## Install

```sh
npm install
```

## Usage

```sh
node index.js "<backups location>";
```

## Run tests

```sh
npm run test
```

## Author

👤 **Marcelo Paixão Resende (marcelothebuilder)**

* Website: https://br.linkedin.com/in/marcelopaixaoresende
* Twitter: [@marcelopaixaor](https://twitter.com/marcelopaixaor)
* Github: [@marcelothebuilder](https://github.com/marcelothebuilder)
* LinkedIn: [@marcelopaixaoresende](https://linkedin.com/in/marcelopaixaoresende)

## Show your support

Give a ⭐️ if this project helped you!


***
_This README was generated with ❤️ by [readme-md-generator](https://github.com/kefranabg/readme-md-generator)_