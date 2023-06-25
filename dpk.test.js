const { deterministicPartitionKey } = require("./dpk");
const crypto = require("crypto");

const HASH_ALGORITHM = 'sha3-512';
const HASH_ENCODING = 'hex';

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
  it("Returns the event partition key when valid", () => {
    const event = { partitionKey: 'valid-partition-key' };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(event.partitionKey);
  });
  it("Returns the hash of the event partition key when it's bigger than MAX_PARTITION_KEY_LENGTH", () => {
    const event = { partitionKey: 'valid-partition-key'.repeat(20) };
    const eventHash = crypto
      .createHash(HASH_ALGORITHM)
      .update(event.partitionKey)
      .digest(HASH_ENCODING);
                      
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(eventHash);
  });
  it("Returns the hash of the event when no partitionKey is provided", () => {
    const event = 'valid-event-key';
    const eventHash = crypto
      .createHash(HASH_ALGORITHM)
      .update(JSON.stringify(event))
      .digest(HASH_ENCODING);
                      
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(eventHash);
  });
  it("Returns the event partition key as String when it isn't a String", () => {
    const event = { partitionKey: 123456 };
    const trivialKey = deterministicPartitionKey(event);
    expect(trivialKey).toBe(JSON.stringify(event.partitionKey));
  });
});
