-- AlterEnum
ALTER TYPE "ApprovalStatus" ADD VALUE 'SUSPENDED';

-- AlterTable
ALTER TABLE "ProfessionalProfile" ADD COLUMN     "biography" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Speciality" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;
