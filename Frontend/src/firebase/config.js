import { initializeApp } from "firebase/app";

// Configuración del proyecto Firebase: copa-renualt-app
const firebaseConfig = {
  apiKey: "AIzaSyBTihwyMyHz_BODY33l3tfsnpdjxwF0pYQ",
  authDomain: "copa-renualt-app.firebaseapp.com",
  projectId: "copa-renualt-app",
  storageBucket: "copa-renualt-app.firebasestorage.app",
  messagingSenderId: "640305985431",
  appId: "1:640305985431:web:f9eec6883bae45c31bf6d2",
  measurementId: "G-FR0NWDTV6M"
};

// Inicializa Firebase y exporta la app para usarla en otros módulos
const app = initializeApp(firebaseConfig);

export default app;