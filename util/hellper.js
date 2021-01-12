//Add helper functions

// Helper Functions

// Helper to throw error 
exports.throwError = (text, status, errorArray = []) => {
    const error = new Error(text);
    error.statusCode = status;
    error.data = errorArray;
    throw error;
  };

// Helper function to catch error
exports.catchError = (err, next) => {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  };
  