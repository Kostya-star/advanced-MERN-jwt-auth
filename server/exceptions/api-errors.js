const createApiError = (status, message, errors = []) => {
  const error = new Error(message);
  error.status = status;
  error.errors = errors;
  return error;
}

const createUnauthorizedError = () => {
  return createApiError(401, 'The user is not authorized');
}

const createBadRequestError = (message, errors = []) => {
  return createApiError(400, message, errors);
}

module.exports = {
  createApiError,
  createUnauthorizedError,
  createBadRequestError
};

// module.exports = class ApiError extends Error {
//   status;
//   errors;

//   constructor(status, message, errors = []) {
//     super(message)
//     this.status = status
//     this.errors = errors
//   }

//   static UnauthorizedError() {
//     return new ApiError(401, 'The user is not unauthorized')
//   }

//   static BadRequest(message, errors = []) {
//     return new ApiError(400, message, errors)
//   }
// }