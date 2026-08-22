export const errorMiddleware = (err, req, res, next) => {

    console.error(err);

    if (err.code === "P2002") {
        return res.status(409).json({
            message: "A record with this unique value already exists",
        });
    }

    const statusCode = err.statusCode || err.status || 500;

    return res.status(statusCode).json({
        message: err.message || "Internal server error",
    });

};
