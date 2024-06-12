<h1 align="center"> Crypto Investment App </h1>

<p align="center">This project was created as a demonstration of my skills</p><br/>

<p align="center">
  <a href="#-technologies">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-project">Project</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-execution">Execution</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-demo">Demo</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

</p>

<br>

<p align="center">
  <img alt="Registration Form" src=".github/cover.png" width="100%">
</p>

## 🚀 Technologies

This project was developed using the following technologies and standards:

- React Native
- Typescript
- Zustand
- React Reanimated 2x
- React Native Animatable
- Websockets

## 💻 Project

this project was inspired by the layout of the Nomad Global app [Nomad](https://www.nomadglobal.com/en) and by Binance Exchange [Binance](https://www.binance.com/en)

## 💬 Explanation

This application has been divided into 2 folders `backend` and `frontend`

  - Backend
    - It is a simple `Node.js` server that calls the `Binance public API` and serves on a local address on port 3001.

  - Frontend
    - It is a `React Native` application built using the `Expo SDK 50`, consumes the backend API and has connections to `Binance Websockets` to update the charts in `real time`

## ⚙️ Execution


1 - Install dependencies and run the backend.
```sh
cd backend && yarn && node src/server.js
```

you will see something similar to this:
<img alt="Registration Form" src=".github/server-running.png" width="100%">

2 - Now you need to run the frontend
```sh
cd frontend && yarn && yarn start
```

you will see something similar to this:

<img alt="Registration Form" src=".github/expo.png" width="100%">

3 - You can simulate on your own iOS or Android device by installing Expo Go on your device

[Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en&pli=1)
or
[Play Store](https://apps.apple.com/br/app/expo-go/id982107779) 

**[Optional]** 

If you have a simulator on your macbook or notebook you can simply `press "a"` to simulate Android or `press "i"` to simulate iOS

## 🖥 Demo

You  can see a preview [HERE](https://drive.google.com/file/d/1UnrewuY2QXkFVwzm_lNmRsWg1GW6kWj9/view?usp=sharing)

---


