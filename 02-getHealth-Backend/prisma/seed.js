import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// ============================================================
// SEED DATA
// ============================================================

const specialties = [
  {
    name: "Cardiology",
    description:
      "Medical specialty dedicated to the diagnosis and treatment of cardiovascular diseases.",
  },
  {
    name: "Dermatology",
    description:
      "Medical specialty dedicated to the diagnosis and treatment of skin diseases and conditions.",
  },
  {
    name: "Endocrinology",
    description:
      "Medical specialty focused on hormonal disorders, metabolism, and related conditions.",
  },
  {
    name: "Gastroenterology",
    description:
      "Medical specialty dedicated to the digestive system and gastrointestinal diseases.",
  },
  {
    name: "Neurology",
    description:
      "Medical specialty dedicated to the diagnosis and treatment of disorders of the nervous system.",
  },
  {
    name: "Pediatrics",
    description:
      "Medical specialty dedicated to the health and development of children and adolescents.",
  },
  {
    name: "Psychiatry",
    description:
      "Medical specialty focused on the evaluation and treatment of mental health disorders.",
  },
  {
    name: "Traumatology and Orthopedics",
    description:
      "Medical specialty dedicated to the diagnosis and treatment of musculoskeletal conditions and injuries.",
  },
  {
    name: "Gynecology",
    description:
      "Medical specialty dedicated to women's reproductive health and gynecological conditions.",
  },
  {
    name: "Ophthalmology",
    description:
      "Medical specialty dedicated to the diagnosis and treatment of eye diseases and vision disorders.",
  },
];

const professionals = [
  {
    firstName: "Alejandro",
    lastName: "Ramírez",
    email: "alejandro.ramirez@gethealth.test",
    identificationNumber: "ID-100001",
    licenseNumber: "MED-10001",
    dateOfBirth: "1980-03-15",
    biography:
      "Cardiologist with extensive experience in cardiovascular prevention, hypertension management, and patient-centered care.",
    specialties: ["Cardiology"],
  },
  {
    firstName: "Valentina",
    lastName: "Morales",
    email: "valentina.morales@gethealth.test",
    identificationNumber: "ID-100002",
    licenseNumber: "MED-10002",
    dateOfBirth: "1985-07-22",
    biography:
      "Dermatologist focused on clinical dermatology, skin health, and the diagnosis of common and chronic skin conditions.",
    specialties: ["Dermatology", "Ophthalmology"],
  },
  {
    firstName: "Sebastián",
    lastName: "Torres",
    email: "sebastian.torres@gethealth.test",
    identificationNumber: "ID-100003",
    licenseNumber: "MED-10003",
    dateOfBirth: "1978-11-08",
    biography:
      "Neurologist specializing in the evaluation and management of headaches, neurological disorders, and preventive care.",
    specialties: ["Neurology", "Psychiatry"],
  },
  {
    firstName: "Camila",
    lastName: "Herrera",
    email: "camila.herrera@gethealth.test",
    identificationNumber: "ID-100004",
    licenseNumber: "MED-10004",
    dateOfBirth: "1987-01-30",
    biography:
      "Pediatrician committed to comprehensive healthcare for children and adolescents, with emphasis on prevention and healthy development.",
    specialties: ["Pediatrics", "Endocrinology"],
  },
  {
    firstName: "Diego",
    lastName: "Castillo",
    email: "diego.castillo@gethealth.test",
    identificationNumber: "ID-100005",
    licenseNumber: "MED-10005",
    dateOfBirth: "1979-09-12",
    biography:
      "Orthopedic specialist with experience in musculoskeletal injuries, rehabilitation planning, and orthopedic evaluation.",
    specialties: ["Traumatology and Orthopedics", "Cardiology"],
  },
  {
    firstName: "Fernanda",
    lastName: "Rojas",
    email: "fernanda.rojas@gethealth.test",
    identificationNumber: "ID-100006",
    licenseNumber: "MED-10006",
    dateOfBirth: "1983-05-19",
    biography:
      "Endocrinologist specializing in metabolic disorders, thyroid conditions, and long-term patient management.",
    specialties: ["Endocrinology", "Gynecology"],
  },
  {
    firstName: "Matías",
    lastName: "Vargas",
    email: "matias.vargas@gethealth.test",
    identificationNumber: "ID-100007",
    licenseNumber: "MED-10007",
    dateOfBirth: "1982-12-03",
    biography:
      "Gastroenterologist focused on digestive health, preventive care, and the diagnosis of gastrointestinal conditions.",
    specialties: ["Gastroenterology", "Endocrinology"],
  },
  {
    firstName: "Daniela",
    lastName: "Fuentes",
    email: "daniela.fuentes@gethealth.test",
    identificationNumber: "ID-100008",
    licenseNumber: "MED-10008",
    dateOfBirth: "1988-04-27",
    biography:
      "Gynecologist focused on women's health, preventive care, reproductive health, and comprehensive patient education.",
    specialties: ["Gynecology", "Pediatrics"],
  },
  {
    firstName: "Tomás",
    lastName: "Navarro",
    email: "tomas.navarro@gethealth.test",
    identificationNumber: "ID-100009",
    licenseNumber: "MED-10009",
    dateOfBirth: "1976-06-14",
    biography:
      "Psychiatrist experienced in mental health assessment, treatment planning, and long-term patient support.",
    specialties: ["Psychiatry", "Neurology"],
  },
  {
    firstName: "Carolina",
    lastName: "Pérez",
    email: "carolina.perez@gethealth.test",
    identificationNumber: "ID-100010",
    licenseNumber: "MED-10010",
    dateOfBirth: "1984-10-21",
    biography:
      "Ophthalmologist dedicated to comprehensive eye care, vision health, and early detection of ocular conditions.",
    specialties: ["Ophthalmology", "Dermatology"],
  },
  {
    firstName: "Rodrigo",
    lastName: "Soto",
    email: "rodrigo.soto@gethealth.test",
    identificationNumber: "ID-100011",
    licenseNumber: "MED-10011",
    dateOfBirth: "1977-02-18",
    biography:
      "Cardiologist focused on cardiovascular risk assessment, preventive medicine, and chronic disease management.",
    specialties: ["Cardiology", "Traumatology and Orthopedics"],
  },
  {
    firstName: "Antonia",
    lastName: "Silva",
    email: "antonia.silva@gethealth.test",
    identificationNumber: "ID-100012",
    licenseNumber: "MED-10012",
    dateOfBirth: "1986-08-09",
    biography:
      "Dermatologist specializing in clinical skin disorders and personalized treatment plans for patients of different age groups.",
    specialties: ["Dermatology", "Gynecology"],
  },
  {
    firstName: "Felipe",
    lastName: "Contreras",
    email: "felipe.contreras@gethealth.test",
    identificationNumber: "ID-100013",
    licenseNumber: "MED-10013",
    dateOfBirth: "1981-03-25",
    biography:
      "Neurologist dedicated to neurological diagnosis, headache management, and personalized treatment strategies.",
    specialties: ["Neurology", "Gastroenterology"],
  },
  {
    firstName: "Isidora",
    lastName: "Mendoza",
    email: "isidora.mendoza@gethealth.test",
    identificationNumber: "ID-100014",
    licenseNumber: "MED-10014",
    dateOfBirth: "1989-11-17",
    biography:
      "Pediatrician focused on preventive medicine, child development, and comprehensive pediatric care.",
    specialties: ["Pediatrics", "Ophthalmology"],
  },
  {
    firstName: "Javier",
    lastName: "Espinoza",
    email: "javier.espinoza@gethealth.test",
    identificationNumber: "ID-100015",
    licenseNumber: "MED-10015",
    dateOfBirth: "1975-05-06",
    biography:
      "Gastroenterologist with experience in digestive disorders, clinical evaluation, and preventive gastrointestinal care.",
    specialties: ["Gastroenterology", "Traumatology and Orthopedics"],
  },
];

const DEFAULT_PASSWORD = "Test1234!";

// ============================================================
// MAIN SEED
// ============================================================

async function main() {
  console.log("Starting database seed...");

  // ============================================================
  // VALIDATE DATABASE STATE
  // ============================================================

  const appointmentCount = await prisma.appointment.count();

  if (appointmentCount > 0) {
    throw new Error(
      `Seed aborted: ${appointmentCount} appointment(s) exist. Delete them before running this seed.`,
    );
  }

  // ============================================================
  // CLEAN PROFESSIONAL DATA
  // ============================================================

  console.log("Cleaning professional data...");

  const professionalUsers = await prisma.user.findMany({
    where: {
      role: "PROFESSIONAL",
    },
    select: {
      id: true,
    },
  });

  const professionalIds = professionalUsers.map((user) => user.id);

  if (professionalIds.length > 0) {
    await prisma.availability.deleteMany({
      where: {
        professionalProfile: {
          professionalId: {
            in: professionalIds,
          },
        },
      },
    });

    await prisma.professionalSpeciality.deleteMany({
      where: {
        professionalProfile: {
          professionalId: {
            in: professionalIds,
          },
        },
      },
    });

    await prisma.professionalProfile.deleteMany({
      where: {
        professionalId: {
          in: professionalIds,
        },
      },
    });

    await prisma.user.deleteMany({
      where: {
        id: {
          in: professionalIds,
        },
      },
    });
  }

  // ============================================================
  // CLEAN SPECIALTIES
  // ============================================================

  console.log("Cleaning specialties...");

  await prisma.speciality.deleteMany();

  // ============================================================
  // CREATE SPECIALTIES
  // ============================================================

  console.log("Creating specialties...");

  const createdSpecialties = {};

  for (const specialty of specialties) {
    const created = await prisma.speciality.create({
      data: specialty,
    });

    createdSpecialties[created.name] = created;
  }

  // ============================================================
  // CREATE PROFESSIONALS
  // ============================================================

  console.log("Creating professionals...");

  const hashedPassword = await bcrypt.hash(DEFAULT_PASSWORD, 10);

  for (const professional of professionals) {
    const createdUser = await prisma.user.create({
      data: {
        firstName: professional.firstName,
        lastName: professional.lastName,
        email: professional.email,
        passwordHash: hashedPassword,
        role: "PROFESSIONAL",
        isActive: true,

        professionalProfile: {
          create: {
            licenseNumber: professional.licenseNumber,
            approvalStatus: "APPROVED",
            dateOfBirth: new Date(professional.dateOfBirth),
            identificationNumber: professional.identificationNumber,
            biography: professional.biography,

            professionalSpecialties: {
              create: professional.specialties.map((specialtyName) => ({
                specialityId: createdSpecialties[specialtyName].id,
              })),
            },
          },
        },
      },
    });

    console.log(
      `Created professional: ${createdUser.firstName} ${createdUser.lastName}`,
    );
  }

  // ============================================================
  // SUMMARY
  // ============================================================

  const professionalCount = await prisma.user.count({
    where: {
      role: "PROFESSIONAL",
    },
  });

  const specialtyCount = await prisma.speciality.count();

  const professionalSpecialtyCount =
    await prisma.professionalSpeciality.count();

  console.log("");
  console.log("============================================================");
  console.log("SEED COMPLETED");
  console.log("============================================================");
  console.log(`Specialties: ${specialtyCount}`);
  console.log(`Professionals: ${professionalCount}`);
  console.log(
    `Professional-Specialty relations: ${professionalSpecialtyCount}`,
  );
  console.log(`Default password: ${DEFAULT_PASSWORD}`);
  console.log("============================================================");
}

// ============================================================
// EXECUTE SEED
// ============================================================

main()
  .catch((error) => {
    console.error("Seed failed:");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
