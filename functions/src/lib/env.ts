import { defineString } from 'firebase-functions/params';

const EMAIL_API = defineString('EMAIL_API');
const EMAIL_API_PASSWORD = defineString('EMAIL_API_PASSWORD');
const TARGET_EMAIL = defineString('TARGET_EMAIL');

export { EMAIL_API, EMAIL_API_PASSWORD, TARGET_EMAIL };
