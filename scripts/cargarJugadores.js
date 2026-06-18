import fs from "fs";
import { initializeApp } from "firebase/app";
import { jugadorInsert } from "../src/dataconnect-generated/esm/index.esm.js";

const firebaseConfig = {
  apiKey: "AIzaSyBTihwyMyHz_BODY33l3tfsnpdjxwF0pYQ",
  authDomain: "copa-renualt-app.firebaseapp.com",
  projectId: "copa-renualt-app",
  storageBucket: "copa-renualt-app.firebasestorage.app",
  messagingSenderId: "640305985431",
  appId: "1:640305985431:web:f9eec6883bae45c31bf6d2",
  measurementId: "G-FR0NWDTV6M"
};

initializeApp(firebaseConfig);

const jugadoresObj = JSON.parse(fs.readFileSync("./jugadores.json", "utf8"));
const jugadores = Object.values(jugadoresObj);

const ES_DUPLICADO = (msg = "") =>
  msg.includes("already exists") ||
  msg.includes("duplicate") ||
  msg.includes("unique") ||
  msg.includes("ALREADY_EXISTS");

async function main() {
  console.log(`🚀 Procesando ${jugadores.length} jugadores...`);

  let insertados = 0;
  let yaExistian = 0;
  let errores = 0;
  const fallos = [];

  for (const j of jugadores) {
    try {
      await jugadorInsert(j);
      console.log(`✔  insertado: ${j.nombre}`);
      insertados++;

    } catch (e) {
      if (ES_DUPLICADO(e.message)) {
        console.log(`⏭  ya existe: ${j.nombre}`);
        yaExistian++;
      } else {
        console.log(`❌  error real: ${j.nombre} — ${e.message}`);
        fallos.push({ jugador: j, error: e.message });
        errores++;
      }
    }

    await new Promise((r) => setTimeout(r, 80));
  }

  console.log("\n────────────────────────");
  console.log(`✅ Insertados nuevos : ${insertados}`);
  console.log(`⏭  Ya existían      : ${yaExistian}`);
  console.log(`❌ Errores reales    : ${errores}`);

  if (fallos.length > 0) {
    fs.writeFileSync("./fallos.json", JSON.stringify(fallos, null, 2));
    console.log("\n⚠️  Revisá fallos.json para ver los que fallaron de verdad");
  } else {
    console.log("\n🎉 Sin errores reales. Todo procesado correctamente.");
  }
}

main();