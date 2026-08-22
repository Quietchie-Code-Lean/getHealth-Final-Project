import jwt from "jsonwebtoken";

export const validateTokenMiddleware = (req, res, next) => {

    try {

        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(401).json({
                message: "Token is required"
            });
        }

        const [type, token] = authorization.split(" ");

        if (type !== "Bearer" || !token) {
            return res.status(401).json({
                message: "Invalid token format"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = decoded;

        next();

    } catch (error) {

        return res.status(401).json({
            message: "Invalid or expired token"
        });

    }

};