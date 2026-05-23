class InternalServiceError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
    this.name = "Internal Service Error";
  }
}

module.exports = InternalServiceError;
