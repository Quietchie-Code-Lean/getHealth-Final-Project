import {
  getProfessionalsService,
  getProfessionalByIdService,
  findProfessionalByIdService,
  updateProfessionalService,
  updateProfessionalStatusService,
  findSpecialityByIdService,
  findProfessionalSpecialityService,
  addProfessionalSpecialityService,
  removeProfessionalSpecialityService
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


export const updateProfessionalController = async ( req, res, next) => {

  try {

    // ---------------------------------------------
    // ROUTE PARAM
    // ---------------------------------------------

    const { id } = req.params;

    const professionalId = Number(id);

    // Validate ProfessionalProfile.id
    if (!Number.isInteger(professionalId) || professionalId <= 0) {

      const error = new Error("Invalid professional id");

      error.statusCode = 400;

      throw error;

    }


    // ---------------------------------------------
    // AUTHENTICATED USER
    // ---------------------------------------------

    // Provided by validateTokenMiddleware.
    const authenticatedUser = req.user;


    // Only PROFESSIONAL and ADMIN can use this endpoint.
    if (authenticatedUser.role !== "PROFESSIONAL" && authenticatedUser.role !== "ADMIN") {

      const error = new Error("Forbidden");

      error.statusCode = 403;

      throw error;

    }


    // ---------------------------------------------
    // FIND PROFESSIONAL PROFILE
    // ---------------------------------------------

    const professional = await findProfessionalByIdService(professionalId);


    if (!professional) {

      const error = new Error("Professional not found");

      error.statusCode = 404;

      throw error;

    }


    // ---------------------------------------------
    // OWNERSHIP / ADMIN AUTHORIZATION
    // ---------------------------------------------

    const isAdmin = authenticatedUser.role === "ADMIN";

    const isOwner = professional.professionalId === authenticatedUser.id;

    // A professional can modify only their own profile.
    // An admin may modify any professional.
    if (!isAdmin && !isOwner) {

      const error = new Error("You are not authorized to update this professional");

      error.statusCode = 403;

      throw error;

    }


    // ---------------------------------------------
    // REQUEST BODY
    // ---------------------------------------------

    const {
      license_number,
      date_of_birth,
      identification_number,
      biography,    // biography exists in the API contract, but NOT in the current Prisma schema.
    } = req.body;


    // ---------------------------------------------
    // BUILD SAFE UPDATE OBJECT
    // ---------------------------------------------

    const updateData = {};


    if (license_number !== undefined) {

      if (typeof license_number !== "string" || !license_number.trim()) {

        const error = new Error("Invalid license_number");

        error.statusCode = 400;

        throw error;

      }

      updateData.licenseNumber = license_number.trim();

    }


    if (date_of_birth !== undefined) {

      const parsedDate = new Date(date_of_birth);


      if (Number.isNaN(parsedDate.getTime())) {

        const error = new Error("Invalid date_of_birth");

        error.statusCode = 400;

        throw error;

        };

      updateData.dateOfBirth = parsedDate;

    };


    if (identification_number !== undefined) {

      if (typeof identification_number !== "string" || !identification_number.trim()) {

        const error = new Error("Invalid identification_number");

        error.statusCode = 400;

        throw error;
        
        }

      updateData.identificationNumber = identification_number.trim();

    };


    // biography cannot currently be saved because
    // ProfessionalProfile has no biography field.
    if (biography !== undefined) {

      const error = new Error("Biography is not currently supported by the database schema");

      error.statusCode = 400;

      throw error;

    };


    // ---------------------------------------------
    // NOTHING TO UPDATE
    // ---------------------------------------------

    if (Object.keys(updateData).length === 0) {

      const error = new Error("No valid fields provided for update");

      error.statusCode = 400;

      throw error;

    };


    // ---------------------------------------------
    // UPDATE DATABASE
    // ---------------------------------------------

    const updatedProfessional = await updateProfessionalService(professionalId, updateData);

    // ---------------------------------------------
    // API RESPONSE
    // ---------------------------------------------

    return res.status(200).json({

      message:
        "Professional profile updated successfully",

      professional: {
        id: updatedProfessional.id,     // ProfessionalProfile.id
        user_id: updatedProfessional.professionalId,    // User.id
        license_number: updatedProfessional.licenseNumber,
        biography: null,    // Not available in current schema.
        date_of_birth: updatedProfessional.dateOfBirth,
        identification_number: updatedProfessional.identificationNumber,
        approval_status: updatedProfessional.approvalStatus,
        updated_at: null    // ProfessionalProfile currently has no updatedAt field.
      },
    });

  } catch (error) {

    next(error);

  }

};


export const updateProfessionalStatusController = async ( req, res, next ) => {

  try {

    // ---------------------------------------------
    // AUTHORIZATION
    // ---------------------------------------------

    // validateTokenMiddleware already verified
    // the JWT and attached the decoded user to req.user.
    const authenticatedUser = req.user;


    // This endpoint is ADMIN ONLY.
    if (authenticatedUser.role !== "ADMIN") {

      const error = new Error("Admin role required");

      error.statusCode = 403;

      throw error;
    }


    // ---------------------------------------------
    // PROFESSIONAL ID
    // ---------------------------------------------

    const { id } = req.params;


    // Route params arrive as strings.
    const professionalId = Number(id);


    if (!Number.isInteger(professionalId) || professionalId <= 0) {

      const error = new Error("Invalid professional id");

      error.statusCode = 400;

      throw error;
    }


    // ---------------------------------------------
    // APPROVAL STATUS
    // ---------------------------------------------

    const { approval_status } = req.body;


    // IMPORTANT:
    // Current Prisma enum:
    //
    // PENDING
    // APPROVED
    // REJECTED
    //
    // SUSPENDED exists in the API contract, but NOT in the current schema.prisma

    const allowedApprovalStatuses = [
      "PENDING",
      "APPROVED",
      "REJECTED",
    ];


    if (typeof approval_status !== "string" || !allowedApprovalStatuses.includes(approval_status)) {

      const error = new Error("Invalid approval status");

      error.statusCode = 400;

      throw error;

    }


    // ---------------------------------------------
    // CHECK PROFESSIONAL EXISTS
    // ---------------------------------------------

    const professional = await findProfessionalByIdService(professionalId);

    if (!professional) {

      const error = new Error("Professional not found");

      error.statusCode = 404;

      throw error;
    }


    // ---------------------------------------------
    // UPDATE PROFESSIONAL STATUS
    // ---------------------------------------------

    const updatedProfessional = await updateProfessionalStatusService(professionalId, approval_status);

    // ---------------------------------------------
    // RESPONSE
    // ---------------------------------------------

    return res.status(200).json({

      message:"Professional approval status updated successfully",

      professional: {
        id: updatedProfessional.id,
        approval_status: updatedProfessional.approvalStatus,

        // Current ProfessionalProfile model does not contain updatedAt.
        updated_at: null,
      },

    });

  } catch (error) {

    next(error);

  }

};


