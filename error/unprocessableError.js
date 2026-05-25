class UnprocessableError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 422;
    this.name = "Unprocessable";
  }
}

module.exports = UnprocessableError;
