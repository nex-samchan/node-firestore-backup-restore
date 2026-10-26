'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.constructDocumentReference = exports.getFireApp = undefined;

var _colors = require('colors');

var _colors2 = _interopRequireDefault(_colors);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _app = require('firebase-admin/app');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Initializes and returns a Firebase Admin App.
var getFireApp = function getFireApp(credentialsPath, appName) {
  try {
    var credentialsBuffer = _fs2.default.readFileSync(credentialsPath);
    var credentials = JSON.parse(credentialsBuffer.toString());
    return (0, _app.initializeApp)({
      credential: (0, _app.cert)(credentials)
    }, appName || credentialsPath);
  } catch (error) {
    console.log(_colors2.default.bold(_colors2.default.red('Unable to read: ')) + _colors2.default.bold(credentialsPath) + ' - ' + error);
    return error;
  }
};

// Recreate a reference in the destination Firestore from its exported path.
//
// firestore is a Firestore instance. referencePath accepts the public path
// string and the legacy serialized segments object.
// Helper functions to work with Firestore instances
var constructDocumentReference = function constructDocumentReference(firestore, referencePath) {
  if (!firestore || !referencePath) return;

  var path = typeof referencePath === 'string' ? referencePath : referencePath.path || (referencePath.segments || []).join('/');
  if (!path) return;

  return firestore.doc(path);
};

exports.getFireApp = getFireApp;
exports.constructDocumentReference = constructDocumentReference;