import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {
    findUserByEmail,
    findUserById,
    registerPatient,
    registerProfessional
} from "../services/auth.service.js";


//Patient----------------------------------------------
export const registerPatientController = async (req, res, next) => {

    try {

        const {
            firstName,
            lastName,
            email,
            password,
            phone,
            dateOfBirth,
            identificationNumber
        } = req.body;

        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            });
        };

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await registerPatient({
            firstName,
            lastName,
            email,
            hashedPassword,
            phone,
            dateOfBirth: new Date(dateOfBirth),
            identificationNumber
        });

        return res.status(201).json({

            message: "Patient registered successfully",

            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                patientProfile: user.patientProfile
            }

        });

    } catch (error) {
        next(error)

    }

};

//Professional------------------------------------------
export const registerProfessionalController = async (req, res, next) => {

    try {

        const {
            firstName,
            lastName,
            email,
            password,
            licenseNumber,
            dateOfBirth,
            identificationNumber
        } = req.body;


        const existingUser = await findUserByEmail(email);

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            });
        }


        const hashedPassword = await bcrypt.hash(password, 10);


        const user = await registerProfessional({
            firstName,
            lastName,
            email,
            hashedPassword,
            licenseNumber,
            dateOfBirth: new Date(dateOfBirth),
            identificationNumber
        });


        return res.status(201).json({

            message: "Professional registered successfully",

            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                professionalProfile: user.professionalProfile
            }

        });


    } catch (error) {

        next(error);

    }

};



//login user--------------------------------------
export const loginController = async (req, res, next) => {

    try {

        const { email, password } = req.body;


        const user = await findUserByEmail(email);


        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }


        const passwordIsValid = await bcrypt.compare(
            password,
            user.passwordHash
        );


        if (!passwordIsValid) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }


        if (!user.isActive) {
            return res.status(403).json({
                message: "User account is inactive",
            });
        }


        const token = jwt.sign(

            {
                id: user.id,
                email: user.email,
                role: user.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "2h"
            }

        );


        return res.status(200).json({

            message: "Login successful",

            token,

            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
            },

        });


    } catch (error) {

        next(error);

    }

};


//Profile----------------------------------------
export const profileController = async (req, res, next) => {

    try {

        const { id } = req.user;


        const user = await findUserById(id);


        if (!user) {
            return res.status(404).json({
                message: "Profile not found"
            });
        }


        return res.status(200).json({

            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role,
                isActive: user.isActive,
            },

            profile:
                user.role === "PATIENT"
                    ? user.patientProfile
                    : user.professionalProfile

        });


    } catch (error) {

        next(error);

    }

};