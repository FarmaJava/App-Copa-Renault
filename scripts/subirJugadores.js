const fs = require("fs");
const path = require("path");
const { GraphQLClient } = require("graphql-request");

// PEGÁ ACÁ TU URL DE DATACONNECT
const endpoint = "TU_ENDPOINT_GRAPHQL";

// Si requiere auth, agregamos headers después
const client = new GraphQLClient(endpoint);

async function subirArchivo(nombreArchivo) {
    const ruta = path.join(__dirname, nombreArchivo);
    const query = fs.readFileSync(ruta, "utf8");

    try {
        console.log(`Subiendo ${nombreArchivo}...`);
        await client.request(query);
        console.log(`✅ ${nombreArchivo} completado`);
    } catch (err) {
        console.error(`❌ Error en ${nombreArchivo}`);
        console.error(err.response?.errors || err.message);
    }
}
a
async function main() {
    for (let i = 1; i <= 8; i++) {
        await subirArchivo(`jugadores_${i}.graphql`);
    }

    console.log("🎉 Todos los jugadores fueron cargados");
}

main();