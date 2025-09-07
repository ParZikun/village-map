const admin = require('firebase-admin');

// Load environment variables securely from Vercel.
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_JSON);
const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG_JSON);

if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
}

export default async function handler(req, res) {
    try {
        const uid = `anonymous_user_${Date.now()}`;
        const customToken = await admin.auth().createCustomToken(uid);

        res.status(200).json({ token: customToken, firebaseConfig });
    } catch (error) {
        console.error('Error creating custom token:', error);
        res.status(500).json({ error: 'Failed to create custom token.' });
    }
}
