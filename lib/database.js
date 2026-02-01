/**
 * Firestore Database Configuration
 * Initializes and exports Firestore instance
 */

const admin = require('firebase-admin');
const config = require('./config');
const logger = require('./logger');

let firestore = null;

// Initialize Firebase App
const initializeApp = () => {
  if (admin.apps.length === 0) {
    try {
      const firebaseConfig = {};

      if (config.firestore.projectId) {
        firebaseConfig.projectId = config.firestore.projectId;
      }

      if (config.firestore.credentials) {
         firebaseConfig.credential = admin.credential.cert(config.firestore.credentials);
      } else if (config.firestore.keyFilename) {
        firebaseConfig.credential = admin.credential.cert(config.firestore.keyFilename);
      } else {
        logger.warn('⚠️  No specific credentials provided, using default application credentials');
        firebaseConfig.credential = admin.credential.applicationDefault();
      }
      
      if (config.firestore.databaseId && config.firestore.databaseId !== '(default)') {
         firebaseConfig.databaseURL = `https://${config.firestore.projectId}.firebaseio.com`;
         // Note: Multi-database support in Admin SDK is accessed via admin.app().firestore(dbId)
         // treating databaseId in config specially
      }

      admin.initializeApp(firebaseConfig);
      logger.info('✅ Firebase app initialized successfully');
    } catch (error) {
      logger.error('❌ Firebase initialization error:', error.message);
      throw error;
    }
  }
};

/**
 * Initialize Firestore connection
 */
const initializeFirestore = async () => {
  try {
    initializeApp();
    
    // Get Firestore instance
    // Support for named databases
    if (config.firestore.databaseId && config.firestore.databaseId !== '(default)') {
        firestore = admin.firestore(admin.app(), config.firestore.databaseId);
        logger.info(`📊 Using Database ID: ${config.firestore.databaseId}`);
    } else {
        firestore = admin.firestore();
    }

    // Set settings if needed (ignoring errors if not relevant for Admin SDK)
    try {
        firestore.settings({ ignoreUndefinedProperties: true });
    } catch (e) {
        // ignore
    }

    // Test the connection
    try {
      const collections = await firestore.listCollections();
      logger.info(`✅ Firestore connected successfully. Found ${collections.length} collections.`);
    } catch (testError) {
      logger.error('❌ Firestore connection test failed:', testError.message);
      throw testError;
    }

    return firestore;
  } catch (error) {
    logger.error('❌ Firestore connection error:', error.message);
    throw error;
  }
};

/**
 * Get Firestore instance
 */
const getFirestore = () => {
  if (!firestore) {
    // If not initialized, try to initialize synchronously (might fail if async init needed for some creds, but generally Admin SDK is sync init)
    initializeApp();
    if (config.firestore.databaseId && config.firestore.databaseId !== '(default)') {
        firestore = admin.firestore(admin.app(), config.firestore.databaseId);
    } else {
        firestore = admin.firestore();
    }
  }
  return firestore;
};

/**
 * Close Firestore connection
 * Note: Firebase Admin SDK doesn't have a direct terminate method for the default app in the same way,
 * but currently we keep it around. We can delete the app if really needed.
 */
const closeFirestore = async () => {
   // Usually not necessary for Admin SDK in a server environment?
   // But we can delete the app to clean up.
   if (admin.apps.length > 0) {
       await Promise.all(admin.apps.map(app => app.delete()));
       firestore = null;
       logger.info('Firebase connection closed');
   }
};

module.exports = {
  getFirestore,
  initializeFirestore,
  closeFirestore
};
