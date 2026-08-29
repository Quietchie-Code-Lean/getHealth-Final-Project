import {
  getProfessionalsService,
  getProfessionalByIdService,
  findProfessionalByIdService,
  updateProfessionalService,
  updateProfessionalStatusService,
  findSpecialityByIdService,
  findProfessionalSpecialityService,
  addProfessionalSpecialityService,
  removeProfessionalSpecialityService,
} from "../services/professional.service.js";


// ============================================================
// GET ALL PROFESSIONALS
// ============================================================

// Returns all professionals using optional query filters.
export const getProfessionalsController = async (req, res, next) => {
  
  try {

    // API query parameters arrive as strings.
    const { specialty_id, is_active } = req.query;

    // Internal variables follow Prisma/schema naming.
    let specialityId;
    let isActive;


    // ============================================================
    // VALIDATE SPECIALITY ID
    // ============================================================

    if (specialty_id !== undefined) {
      specialityId = Number(specialty_id);

      if (!Number.isInteger(specialityId) || specialityId <= 0) {

        const error = new Error("specialty_id must be a valid positive integer");

        error.statusCode = 400;

        throw error;
      }
    }


    // ============================================================
    // VALIDATE ACTIVE STATUS
    // ============================================================

    if (is_active !== undefined) {
      if (is_active !== "true" && is_active !== "false") {
        const error = new Error("is_active must be true or false");

        error.statusCode = 400;

        throw error;
      }

      // Convert query String into Boolean.
      isActive = is_active === "true";
    }


    // ============================================================
    // GET PROFESSIONALS
    // ============================================================

    const professionals = await getProfessionalsService({specialityId, isActive});


    // ============================================================
    // FORMAT RESPONSE
    // ============================================================

    const formattedProfessionals = professionals.map(
      (professional) => {
        const profile = professional.professionalProfile;

        return {
          // ProfessionalProfile.id
          id: profile?.id,

          // User.id
          user_id: professional.id,

          first_name: professional.firstName,
          last_name: professional.lastName,
          license_number: profile?.licenseNumber,
          biography: profile?.biography,
          approval_status: profile?.approvalStatus,

          specialties:
            profile?.professionalSpecialties.map(
              (professionalSpeciality) => ({
                id: professionalSpeciality.speciality.id,
                name: professionalSpeciality.speciality.name,
              }),
            ) ?? [],
        };
      },
    );


    // ============================================================
    // RESPONSE
    // ============================================================

    return res.status(200).json({
      professionals: formattedProfessionals,
    });

  } catch (error) {
    next(error);
  }
};


// ============================================================
// GET PROFESSIONAL BY ID
// ============================================================

// Returns one professional by ProfessionalProfile.id.
export const getProfessionalByIdController = async ( req, res, next) => {

  try {

    // Route parameters arrive as strings.
    const { id } = req.params;

    const professionalId = Number(id);


    // ============================================================
    // VALIDATE PROFESSIONAL ID
    // ============================================================

    if (!Number.isInteger(professionalId) || professionalId <= 0) {

      const error = new Error("Invalid professional id");

      error.statusCode = 400;

      throw error;
    }


    // ============================================================
    // GET PROFESSIONAL
    // ============================================================

    const professional = await getProfessionalByIdService(professionalId);


    // ============================================================
    // PROFESSIONAL NOT FOUND
    // ============================================================

    if (!professional) {
      const error = new Error("Professional not found");

      error.statusCode = 404;

      throw error;
    }


    // ============================================================
    // FORMAT RESPONSE
    // ============================================================





    
    const formattedProfessional = {
      
      id: professional.id,   // ProfessionalProfile.id
      user_id: professional.user.id,    // User.id
      first_name: professional.user.firstName,
      last_name: professional.user.lastName,
      license_number: professional.licenseNumber,
      biography: professional.biography,
      date_of_birth: professional.dateOfBirth, 
      identification_number: professional.identificationNumber,
      approval_status: professional.approvalStatus,

      // ProfessionalProfile does not currently contain createdAt.
      updated_at: professional.updatedAt,

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
          }),
        ),
    };


    // ============================================================
    // RESPONSE
    // ============================================================

    return res.status(200).json({
      professional: formattedProfessional,
    });
  } catch (error) {
    next(error);
  }
};


// ============================================================
// UPDATE PROFESSIONAL
// ============================================================

// Updates a professional profile.
//
// Route middleware already guarantees that the authenticated
// user has PROFESSIONAL or ADMIN role.
//
// This controller must still verify ownership because a
// PROFESSIONAL may modify only their own ProfessionalProfile.
export const updateProfessionalController = async (req, res, next) => {

  try {

    // ============================================================
    // PROFESSIONAL ID
    // ============================================================

    const { id } = req.params;

    const professionalId = Number(id);

    if (!Number.isInteger(professionalId) || professionalId <= 0) {

      const error = new Error("Invalid professional id");

      error.statusCode = 400;

      throw error;
    }


    // ============================================================
    // AUTHENTICATED USER
    // ============================================================

    // authMiddleware already verified the JWT
    // and attached its payload to req.user.
    const authenticatedUser = req.user;


    // ============================================================
    // FIND PROFESSIONAL
    // ============================================================

    const professional = await findProfessionalByIdService(professionalId);

    if (!professional) {
      const error = new Error("Professional not found");

      error.statusCode = 404;

      throw error;
    }


    // ============================================================
    // OWNERSHIP AUTHORIZATION
    // ============================================================

    const isAdmin = authenticatedUser.role === "ADMIN";

    const isOwner = professional.professionalId === authenticatedUser.id;

    // Professionals may modify only their own profile.
    // Administrators may modify any professional profile.
    if (!isAdmin && !isOwner) {
      const error = new Error("You are not authorized to update this professional");

      error.statusCode = 403;

      throw error;
    }


    // ============================================================
    // REQUEST BODY
    // ============================================================

    const {
      license_number,
      date_of_birth,
      identification_number,
      biography,
    } = req.body;


    // ============================================================
    // BUILD UPDATE DATA
    // ============================================================

    const updateData = {};


    // ------------------------------------------------------------
    // LICENSE NUMBER
    // ------------------------------------------------------------

    if (license_number !== undefined) {

      if (typeof license_number !== "string" || !license_number.trim()) {

        const error = new Error("Invalid license_number");

        error.statusCode = 400;

        throw error;
      }

      updateData.licenseNumber = license_number.trim();

    }


    // ------------------------------------------------------------
    // DATE OF BIRTH
    // ------------------------------------------------------------

    if (date_of_birth !== undefined) {
      const parsedDate = new Date(date_of_birth);

      if (Number.isNaN(parsedDate.getTime())) {

        const error = new Error("Invalid date_of_birth");

        error.statusCode = 400;

        throw error;
      }

      updateData.dateOfBirth = parsedDate;
    }


    // ------------------------------------------------------------
    // IDENTIFICATION NUMBER
    // ------------------------------------------------------------

    if (identification_number !== undefined) {
      if (typeof identification_number !== "string" || !identification_number.trim()) {

        const error = new Error("Invalid identification_number");

        error.statusCode = 400;

        throw error;
      }

      updateData.identificationNumber = identification_number.trim();
    }


    // ------------------------------------------------------------
    // BIOGRAPHY
    // ------------------------------------------------------------

    // Biography alreday implemented.
    
    if (biography !== undefined) {

      if ( typeof biography !== "string" || !biography.trim() ) {

         const error = new Error( "Invalid biography", ); 
         
         error.statusCode = 400; 

         throw error; } 

         updateData.biography = biography.trim(); 
        
        }


    // ============================================================
    // NOTHING TO UPDATE
    // ============================================================

    if (Object.keys(updateData).length === 0) {
      const error = new Error("No valid fields provided for update");

      error.statusCode = 400;

      throw error;
    }


    // ============================================================
    // UPDATE PROFESSIONAL
    // ============================================================

    const updatedProfessional = await updateProfessionalService(professionalId, updateData);


    // ============================================================
    // RESPONSE
    // ============================================================

    return res.status(200).json({

       message: "Professional profile updated successfully",

       professional: { 
        

        id: updatedProfessional.id,         // ProfessionalProfile.id 
        user_id: updatedProfessional.professionalId,         // User.id 
        license_number: updatedProfessional.licenseNumber, 
        biography: updatedProfessional.biography, 
        date_of_birth: updatedProfessional.dateOfBirth, 
        identification_number: updatedProfessional.identificationNumber, 
        approval_status: updatedProfessional.approvalStatus, 
        updated_at: updatedProfessional.updatedAt, 

      }, 

    }); 

  } catch (error) { 
    next(error); 

  }
};

// ============================================================
// UPDATE PROFESSIONAL STATUS
// ============================================================

// Updates professional approval status.
//
// authorizeRoles("ADMIN") in professional.routes.js already
// guarantees that only administrators reach this controller.
export const updateProfessionalStatusController = async (req, res, next) => {

    try {
      // ============================================================
      // PROFESSIONAL ID
      // ============================================================

      const { id } = req.params;

      const professionalId = Number(id);

      if (!Number.isInteger(professionalId) || professionalId <= 0) {
        const error = new Error("Invalid professional id");

        error.statusCode = 400;

        throw error;
      }


      // ============================================================
      // APPROVAL STATUS
      // ============================================================

      const { approval_status } = req.body;


      //Already Implementing, Adjusting the code..
      
      const allowedApprovalStatuses = [
        "PENDING",
        "APPROVED",
        "REJECTED",
        "SUSPENDED",
      ];

      if (typeof approval_status !== "string" || !allowedApprovalStatuses.includes(approval_status,)) {

        const error = new Error("Invalid approval status");

        error.statusCode = 400;

        throw error;
      }


      // ============================================================
      // CHECK PROFESSIONAL EXISTS
      // ============================================================

      const professional = await findProfessionalByIdService(professionalId);

      if (!professional) {
        const error = new Error("Professional not found");

        error.statusCode = 404;

        throw error;
      }


      // ============================================================
      // UPDATE STATUS
      // ============================================================

      const updatedProfessional = await updateProfessionalStatusService(professionalId, approval_status);


      // ============================================================
      // RESPONSE
      // ============================================================

      return res.status(200).json({
        message: "Professional approval status updated successfully",

        professional: {
          id: updatedProfessional.id,
          approval_status: updatedProfessional.approvalStatus,
          updated_at: updatedProfessional.updatedAt,

        },
        
      });

    } catch (error) {
      next(error);

    }
  };


// ============================================================
// ADD PROFESSIONAL SPECIALITY
// ============================================================

// Assigns a speciality to a professional.
//
// authorizeRoles("ADMIN") already guarantees that only
// administrators reach this controller.
export const addProfessionalSpecialityController = async (req, res, next) => {

    try {

      // ============================================================
      // PROFESSIONAL ID
      // ============================================================

      const { id } = req.params;

      // :id represents ProfessionalProfile.id.
      const professionalId = Number(id);

      if (!Number.isInteger(professionalId) || professionalId <= 0) {
        const error = new Error("Invalid professional id");

        error.statusCode = 400;

        throw error;
      }


      // ============================================================
      // SPECIALITY ID
      // ============================================================

      // API Contract uses specialty_id.
      const { specialty_id } = req.body;

      // Prisma schema uses specialityId.
      const specialityId = Number(specialty_id);

      if (!Number.isInteger(specialityId) || specialityId <= 0) {

        const error = new Error("Invalid specialty id");

        error.statusCode = 400;

        throw error;
      }


      // ============================================================
      // CHECK PROFESSIONAL EXISTS
      // ============================================================

      const professional = await findProfessionalByIdService(professionalId);

      if (!professional) {
        const error = new Error("Professional not found");

        error.statusCode = 404;

        throw error;
      }


      // ============================================================
      // CHECK SPECIALITY EXISTS
      // ============================================================

      const speciality = await findSpecialityByIdService(specialityId);

      if (!speciality) {
        const error = new Error("Specialty not found");

        error.statusCode = 404;

        throw error;
      }


      // ============================================================
      // CHECK DUPLICATE
      // ============================================================

      const existingProfessionalSpeciality = await findProfessionalSpecialityService(professionalId, specialityId);

      if (existingProfessionalSpeciality) {
        
        const error = new Error("Specialty already assigned to this professional");

        error.statusCode = 409;

        throw error;
      }


      // ============================================================
      // CREATE RELATIONSHIP
      // ============================================================

      const professionalSpeciality = await addProfessionalSpecialityService(professionalId, specialityId);


      // ============================================================
      // RESPONSE
      // ============================================================

      return res.status(201).json({
        message:"Specialty assigned to professional successfully",

        professional_specialty: {
          professional_id: professionalSpeciality.professionalId,

          specialty_id: professionalSpeciality.specialityId,
        },
      });

    } catch (error) {
      next(error);
    }
  };


// ============================================================
// REMOVE PROFESSIONAL SPECIALITY
// ============================================================

// Removes a speciality relationship from a professional.
//
// authorizeRoles("ADMIN") already guarantees that only
// administrators reach this controller.
export const removeProfessionalSpecialityController = async (req, res, next) => {

    try {

      // ============================================================
      // ROUTE PARAMETERS
      // ============================================================

      const {id, specialtyId} = req.params;

      const professionalId = Number(id);

      const specialityId = Number(specialtyId);


      // ============================================================
      // VALIDATE PROFESSIONAL ID
      // ============================================================

      if (!Number.isInteger(professionalId) || professionalId <= 0) {
        const error = new Error("Invalid professional id");

        error.statusCode = 400;

        throw error;
      }


      // ============================================================
      // VALIDATE SPECIALITY ID
      // ============================================================

      if (!Number.isInteger(specialityId) || specialityId <= 0) {

        const error = new Error("Invalid specialty id");

        error.statusCode = 400;

        throw error;
      }


      // ============================================================
      // FIND RELATIONSHIP
      // ============================================================

      const professionalSpeciality = await findProfessionalSpecialityService(professionalId, specialityId);

      if (!professionalSpeciality) {
        const error = new Error("Professional-specialty relationship not found");

        error.statusCode = 404;

        throw error;
      }


      // ============================================================
      // DELETE RELATIONSHIP
      // ============================================================

      await removeProfessionalSpecialityService(professionalSpeciality.id);


      // ============================================================
      // RESPONSE
      // ============================================================

      return res.status(200).json({
        message:"Specialty removed from professional successfully"

      });

    } catch (error) {
      next(error);
    }
  };