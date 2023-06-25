const crypto = require("crypto");

const HASH_ALGORITHM = 'sha3-512';
const HASH_ENCODING = 'hex';
const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

const createHash = (data) => {
  return crypto.createHash(HASH_ALGORITHM).update(data).digest(HASH_ENCODING);
};

const getDataAsString = (data) => {
  return (typeof data !== "string") ? JSON.stringify(data) : data;
}

exports.deterministicPartitionKey = (event) => {
  let candidate = TRIVIAL_PARTITION_KEY;

  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      candidate = createHash(JSON.stringify(event));
    }

    candidate = getDataAsString(candidate);
  
    if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
      candidate = createHash(candidate);
    }
  }
  
  return candidate;
};