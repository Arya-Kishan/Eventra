import ErrorHandler from "./ErrorHandler.js";

const AsyncHandler = (func, errorMessage = "Something Went Wrong ") => {
    return (req, res, next) => {
        func(req, res, next).catch((error) => {
            next(new ErrorHandler(errorMessage, error, 400));
        })
    }
}

export default AsyncHandler;