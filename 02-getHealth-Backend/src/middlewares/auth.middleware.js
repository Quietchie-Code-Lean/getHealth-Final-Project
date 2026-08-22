const isNonEmptyString = (value) => {
    return typeof value === "string" && value.trim() !== "";
};


export const credentialsMiddleware = (req, res, next) => {

    const { email, password } = req.body;

    if (!isNonEmptyString(email) || !isNonEmptyString(password)) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    req.body.email = email.trim().toLowerCase();

    next();

};


export const registerPatientMiddleware = (req, res, next) => {

    const { firstName, lastName, email, password } = req.body;

    if (!isNonEmptyString(firstName) || !isNonEmptyString(lastName)) {
        return res.status(400).json({
            message: "First name and last name are required"
        });
    }

    if (!isNonEmptyString(email) || !isNonEmptyString(password)) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    req.body.firstName = firstName.trim();
    req.body.lastName = lastName.trim();
    req.body.email = email.trim().toLowerCase();

    next();

};


export const registerProfessionalMiddleware = (req, res, next) => {

    const {
        firstName,
        lastName,
        email,
        password,
        licenseNumber,
        specialityId
    } = req.body;

    if (!isNonEmptyString(firstName) || !isNonEmptyString(lastName)) {
        return res.status(400).json({
            message: "First name and last name are required"
        });
    }

    if (!isNonEmptyString(email) || !isNonEmptyString(password)) {
        return res.status(400).json({
            message: "Email and password are required"
        });
    }

    if (!isNonEmptyString(licenseNumber)) {
        return res.status(400).json({
            message: "License number is required"
        });
    }

    const parsedSpecialityId = Number(specialityId);

    if (!Number.isInteger(parsedSpecialityId) || parsedSpecialityId <= 0) {
        return res.status(400).json({
            message: "A valid specialityId is required"
        });
    }

    req.body.firstName = firstName.trim();
    req.body.lastName = lastName.trim();
    req.body.email = email.trim().toLowerCase();
    req.body.licenseNumber = licenseNumber.trim();
    req.body.specialityId = parsedSpecialityId;

    next();

};
