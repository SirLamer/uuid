import crypto from 'crypto';
import v1 from './v1';

// Inspired from: https://github.com/kurttheviking/uuid-with-v6-js/blob/master/index.js

function v6(options = {}) {
  const noRandom = options?.noRandom || false;
  const raw = v1();
  const prefix = `${raw.substring(15, 18)}${raw.substring(9, 13)}${raw.substring(
    0,
    5
  )}6${raw.substring(5, 8)}`;
  const prefixFormatted = `${prefix.substr(0, 8)}-${prefix.substr(8, 4)}-${prefix.substr(12)}`;

  if (noRandom) {
    return `${prefixFormatted}${raw.substr(18)}`;
  }

  const random = crypto.randomBytes(8).toString('hex');

  return `${prefixFormatted}-${random.substring(0, 4)}-${random.substring(4)}`;
}

export default v6;
