class ErrorHandler extends Error {
    constructor(message = "Something Went Wrong", errors = [], statusCode) {
        super(message);
        this.statusCode = statusCode ? statusCode : 500;
        this.message = message;
        this.errors = errors;
        this.success = false;
        Error.captureStackTrace(this, this.constructor);
    }
}

export default ErrorHandler;