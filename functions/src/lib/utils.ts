import * as functions from 'firebase-functions';

const regionalFunctions = functions.region('asia-southeast2');

export { firestore } from 'firebase-admin';
export { functions, regionalFunctions };
