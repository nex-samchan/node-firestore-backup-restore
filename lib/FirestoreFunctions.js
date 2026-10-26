// Helper functions to work with Firestore instances
import colors from 'colors';
import fs from 'fs';
import { cert, initializeApp } from 'firebase-admin/app';

// Initializes and returns a Firebase Admin App.
const getFireApp = (credentialsPath: string, appName?: string): Object => {
  try {
    const credentialsBuffer = fs.readFileSync(credentialsPath);
    const credentials = JSON.parse(credentialsBuffer.toString());
    return initializeApp(
      {
        credential: cert(credentials)
      },
      appName || credentialsPath
    );
  } catch (error) {
    console.log(
      colors.bold(colors.red('Unable to read: ')) +
        colors.bold(credentialsPath) +
        ' - ' +
        error
    );
    return error;
  }
};

// Recreate a reference in the destination Firestore from its exported path.
//
// firestore is a Firestore instance. referencePath accepts the public path
// string and the legacy serialized segments object.
const constructDocumentReference = (
  firestore: Object,
  referencePath: Object
): Object => {
  if (!firestore || !referencePath) return;

  const path = typeof referencePath === 'string'
    ? referencePath
    : referencePath.path || (referencePath.segments || []).join('/');
  if (!path) return;

  return firestore.doc(path);
};

export { getFireApp, constructDocumentReference };
