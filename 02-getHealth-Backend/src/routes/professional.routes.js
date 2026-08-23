import { Router } from "express";

import {
  getProfessionalsController,
  getProfessionalByIdController,
  updateProfessionalController,
  updateProfessionalStatusController,
  addProfessionalSpecialtyController,
  removeProfessionalSpecialtyController,
} from "../controllers/professional.controller.js";

import { validateTokenMiddleware } from "../middlewares/validateToken.middleware.js";

const router = Router();

router.get("/", getProfessionalsController);

router.get("/:id", getProfessionalByIdController);

router.patch("/:id",
  validateTokenMiddleware,
  updateProfessionalController
);

router.patch("/:id/status",
  validateTokenMiddleware,
  updateProfessionalStatusController
);

router.post("/:id/specialties",
  validateTokenMiddleware,
  addProfessionalSpecialtyController
);

router.delete("/:id/specialties/:specialtyId",
  validateTokenMiddleware,
  removeProfessionalSpecialtyController
);

export default router;