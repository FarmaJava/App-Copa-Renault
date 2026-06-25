import { getAuth } from "firebase/auth";
import app from "./config";

// Instancia compartida de autenticación de Firebase
const auth = getAuth(app);

export default auth;