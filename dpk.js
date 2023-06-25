const crypto = require("crypto");

const HASH_ALGORITHM = 'sha3-512';
const HASH_ENCODING = 'hex';
const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

exports.deterministicPartitionKey = (event) => {
  let candidate = TRIVIAL_PARTITION_KEY;

  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidate = crypto.createHash(HASH_ALGORITHM).update(data).digest(HASH_ENCODING);
    }
  }

  if (typeof candidate !== "string") {
    candidate = JSON.stringify(candidate);
  }

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash(HASH_ALGORITHM).update(candidate).digest(HASH_ENCODING);
  }
  return candidate;
};