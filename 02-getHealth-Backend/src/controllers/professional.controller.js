import {
  getProfessionalsService,
  getProfessionalByIdService,
  findProfessionalByIdService,
  updateProfessionalService,
  updateProfessionalStatusService,
} from "../services/professional.service.js";





export const getProfessionalsController = async (req, res, next) => {
    try {
        // API query parameters:
        // Express receives query parameters as strings.
        const { specialty_id, is_active } = req.query;

        // Internal variables follow our Prisma/schema naming.
        let specialityId;
        let isActive;

        // ------------------------------------------------
        // VALIDATE speciality_id
        // ------------------------------------------------

        if (specialty_id !== undefined) {
            // API gives us a String.
            // Prisma expects an Int.
            specialityId = Number(specialty_id);

            if (!Number.isInteger(specialityId) || specialityId <= 0) {
                const error = new Error(
                    "specialty_id must be a valid positive integer",
                );

                error.statusCode = 400;

                throw error;
            }
        }

        // ------------------------------------------------
        // VALIDATE is_active
        // ------------------------------------------------

        if (is_active !== undefined) {

            // Query values arrive as strings. Accept only: "true" / "false"
            if (is_active !== "true" && is_active !== "false") {

                const error = new Error("is_active must be true or false");

                error.statusCode = 400;

                throw error;
            }

            // Convert String → Boolean
            isActive = is_active === "true";
        }

        // ------------------------------------------------
        // CALL SERVICE
        // ------------------------------------------------

        const professionals = await getProfessionalsService({
            specialityId,
            isActive,
        });

        // ------------------------------------------------
        // FORMAT API RESPONSE
        // ------------------------------------------------

        const formattedProfessionals = professionals.map((professional) => {
            const profile = professional.professionalProfile;

            return {
                // ProfessionalProfile.id
                id: profile?.id,
                // User.id
                user_id: professional.id,
                first_name: professional.firstName,
                last_name: professional.lastName,
                license_number: profile?.licenseNumber,

                // biography does not currently exist in ProfessionalProfile. Once biography is added to schema.prisma
                // biography: profile?.biography
                biography: null,
                approval_status: profile?.approvalStatus,
                specialties:
                    profile?.professionalSpecialties.map((professionalSpeciality) => ({
                        id: professionalSpeciality.speciality.id,
                        name: professionalSpeciality.speciality.name,

                    })) ?? [],
            };
        });

        // ------------------------------------------------
        // RESPONSE
        // ------------------------------------------------

        return res.status(200).json({
            professionals: formattedProfessionals,
        });
    } catch (error) {
        // Pass errors to our global error middleware.
        next(error);
    }
};


export const getProfessionalByIdController = async ( req, res, next ) => {

    try {

        // Route params arrive as strings.
        const { id } = req.params;

        // Convert String to Number
        const professionalId = Number(id);


        // ------------------------------------------------
        // VALIDATE PROFESSIONAL ID
        // ------------------------------------------------

        if (!Number.isInteger(professionalId) || professionalId <= 0) {

            const error = new Error("Invalid professional id");

            error.statusCode = 400;

            throw error;
        }


        // ------------------------------------------------
        // CALL SERVICE
        // ------------------------------------------------

        const professional = await getProfessionalByIdService(professionalId);

        // ------------------------------------------------
        // PROFESSIONAL NOT FOUND
        // ------------------------------------------------

        if (!professional) {

            const error = new Error("Professional not found");

            error.statusCode = 404;

            throw error;
        }


        // ------------------------------------------------
        // FORMAT API RESPONSE
        // ------------------------------------------------

        const formattedProfessional = {

            // ProfessionalProfile.id
            id: professional.id,

            // User.id
            user_id: professional.user.id,
            first_name: professional.user.firstName,
            last_name: professional.user.lastName,
            license_number: professional.licenseNumber,

            // biography does not currently exist in the schema.prisma.
            biography: null,

            approval_status: professional.approvalStatus,
            specialties:
                professional.professionalSpecialties.map(
                    (professionalSpeciality) => ({
                        id:
                            professionalSpeciality
                                .speciality
                                .id,
                        name:
                            professionalSpeciality
                                .speciality
                                .name,
                    })
                ),

        };


        // ------------------------------------------------
        // RESPONSE
        // ------------------------------------------------

        return res.status(200).json({
            professional:
                formattedProfessional,
        });

    } catch (error) {

        next(error);

    }

};


