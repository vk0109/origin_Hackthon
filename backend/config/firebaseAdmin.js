const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");

const serviceAccount = require("../firebase-service-account.json");

const firebaseApp = initializeApp({
  credential: cert(serviceAccount),
});

const adminAuth = getAuth(firebaseApp);

module.exports = {
  firebaseApp,
  adminAuth,
};