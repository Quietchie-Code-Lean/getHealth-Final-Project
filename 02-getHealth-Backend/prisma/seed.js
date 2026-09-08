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
      "Medical specialty dedicated to the diagnosis, treatment, and prevention of cardiovascular diseases. Cardiology covers conditions affecting the heart and blood vessels, including hypertension, arrhythmias, coronary artery disease, and heart failure. Specialists also help patients manage cardiovascular risk factors and long-term heart health.",
    detailedDescription:
      "Cardiology focuses on the health of the heart and circulatory system. Cardiologists evaluate, diagnose, and treat conditions such as high blood pressure, coronary artery disease, heart rhythm disorders, heart failure, and other cardiovascular problems. Consultations may include assessment of cardiovascular risk factors, review of symptoms and medical history, and recommendations for lifestyle changes, medication, diagnostic testing, or specialized treatment when necessary.",
  },
  {
    name: "Dermatology",
    description:
      "Medical specialty focused on the diagnosis and treatment of diseases affecting the skin, hair, and nails. Dermatology covers conditions such as acne, eczema, psoriasis, infections, allergic reactions, and skin lesions. Specialists also evaluate changes in the skin that may require further medical attention.",
    detailedDescription:
      "Dermatology specializes in the health of the skin, hair, and nails. Dermatologists diagnose and treat a wide range of conditions, including acne, eczema, psoriasis, skin infections, allergic reactions, pigmentation disorders, and suspicious or changing skin lesions. A dermatology consultation may involve a detailed examination of the affected area, evaluation of symptoms and medical history, and recommendations for medical treatment, preventive care, or additional testing when appropriate.",
  },
  {
    name: "Endocrinology",
    description:
      "Medical specialty focused on hormonal disorders, metabolism, and conditions affecting the endocrine system. Endocrinology includes the diagnosis and treatment of diabetes, thyroid disorders, hormonal imbalances, growth problems, and metabolic diseases. Specialists help patients manage both chronic and newly diagnosed endocrine conditions.",
    detailedDescription:
      "Endocrinology focuses on hormones, metabolism, and the glands that regulate essential functions throughout the body. Endocrinologists evaluate and treat conditions such as diabetes, thyroid disorders, hormonal imbalances, metabolic diseases, and certain growth or reproductive disorders. Care may include reviewing laboratory results, assessing symptoms and risk factors, adjusting treatment plans, and providing long-term follow-up for chronic endocrine conditions.",
  },
  {
    name: "Gastroenterology",
    description:
      "Medical specialty dedicated to the diagnosis and treatment of diseases affecting the digestive system. Gastroenterology covers the esophagus, stomach, intestines, liver, pancreas, and gallbladder. Specialists evaluate symptoms such as abdominal pain, digestive discomfort, reflux, and other gastrointestinal conditions.",
    detailedDescription:
      "Gastroenterology focuses on the diagnosis and treatment of conditions affecting the digestive system, including the esophagus, stomach, intestines, liver, pancreas, and gallbladder. Gastroenterologists evaluate symptoms such as abdominal pain, heartburn, reflux, nausea, changes in bowel habits, and digestive discomfort. Depending on the condition, evaluation may include laboratory tests, imaging studies, endoscopic procedures, medication, dietary recommendations, and ongoing medical follow-up.",
  },
  {
    name: "Neurology",
    description:
      "Medical specialty dedicated to the diagnosis and treatment of disorders affecting the nervous system. Neurology includes conditions involving the brain, spinal cord, nerves, and muscles. Specialists commonly evaluate headaches, seizures, movement disorders, memory problems, neuropathies, and other neurological symptoms.",
    detailedDescription:
      "Neurology specializes in disorders affecting the brain, spinal cord, peripheral nerves, and muscles. Neurologists evaluate symptoms such as persistent headaches, dizziness, seizures, memory difficulties, tremors, movement disorders, weakness, numbness, and other neurological changes. A consultation generally includes a detailed neurological examination and review of medical history, with additional diagnostic tests or treatment recommendations when clinically appropriate.",
  },
  {
    name: "Pediatrics",
    description:
      "Medical specialty dedicated to the health, growth, and development of infants, children, and adolescents. Pediatrics includes preventive care, routine health checks, vaccinations, diagnosis of childhood illnesses, and monitoring of physical and developmental milestones. Pediatricians support children through the different stages of growth.",
    detailedDescription:
      "Pediatrics provides comprehensive medical care for infants, children, and adolescents throughout their different stages of development. Pediatricians monitor physical and emotional development, perform routine health assessments, provide preventive care and vaccination guidance, and diagnose and treat common childhood illnesses. Pediatric consultations also support parents and caregivers with recommendations related to nutrition, development, sleep, hygiene, and overall healthy growth.",
  },
  {
    name: "Psychiatry",
    description:
      "Medical specialty focused on the evaluation, diagnosis, treatment, and prevention of mental health disorders. Psychiatry includes conditions such as anxiety, depression, mood disorders, sleep problems, and other behavioral or emotional difficulties. Specialists may provide clinical evaluation, treatment planning, and long-term follow-up.",
    detailedDescription:
      "Psychiatry focuses on the evaluation and treatment of mental health and emotional conditions that can affect daily life and overall well-being. Psychiatrists assess symptoms, personal history, emotional health, and other relevant factors when diagnosing conditions such as anxiety, depression, mood disorders, sleep difficulties, and other behavioral or emotional concerns. Treatment may include psychotherapy recommendations, medication when appropriate, lifestyle guidance, and ongoing follow-up to evaluate progress.",
  },
  {
    name: "Traumatology and Orthopedics",
    description:
      "Medical specialty dedicated to the diagnosis and treatment of injuries and conditions affecting the musculoskeletal system. This includes bones, joints, muscles, tendons, and ligaments. Specialists commonly treat fractures, sports injuries, joint pain, mobility problems, and degenerative orthopedic conditions.",
    detailedDescription:
      "Traumatology and Orthopedics focuses on injuries and disorders affecting the musculoskeletal system, including bones, joints, muscles, tendons, and ligaments. Specialists diagnose and treat conditions such as fractures, sports injuries, joint pain, mobility problems, tendon injuries, and degenerative orthopedic diseases. Depending on the condition, treatment may involve medication, rehabilitation, physical therapy, activity recommendations, diagnostic imaging, or surgical evaluation.",
  },
  {
    name: "Gynecology",
    description:
      "Medical specialty dedicated to women's reproductive and gynecological health. Gynecology includes preventive examinations, menstrual disorders, reproductive health, menopause, infections, and conditions affecting the female reproductive system. Specialists provide evaluation, diagnosis, treatment, and ongoing preventive care.",
    detailedDescription:
      "Gynecology provides medical care focused on the female reproductive system and women's health throughout different stages of life. Gynecologists evaluate and treat menstrual disorders, reproductive health concerns, infections, hormonal changes, menopause-related symptoms, and other gynecological conditions. Consultations may also include preventive examinations, health education, contraceptive counseling, and recommendations for appropriate screening and ongoing care.",
  },
  {
    name: "Ophthalmology",
    description:
      "Medical specialty dedicated to the diagnosis, treatment, and prevention of eye diseases and vision disorders. Ophthalmology includes conditions affecting vision, the retina, cornea, lens, optic nerve, and other structures of the eye. Specialists also evaluate visual changes and provide medical or surgical treatment when necessary.",
    detailedDescription:
      "Ophthalmology focuses on the diagnosis, treatment, and prevention of diseases affecting the eyes and visual system. Ophthalmologists evaluate vision problems and conditions involving structures such as the cornea, lens, retina, optic nerve, and other parts of the eye. Consultations may include vision testing and a detailed eye examination, with treatment ranging from corrective recommendations and medication to specialized procedures or surgery when clinically indicated.",
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
// AVAILABILITY GENERATOR
// ============================================================

// Creates the same availability schedule for all professionals.
const createAvailabilitySchedule = () => {
  const weekdays = [
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];

  // Creates 30-minute availability blocks from 08:00 to 18:00.
  return weekdays.flatMap((weekday) => {
    return Array.from({ length: 20 }, (_, blockIndex) => {
      // Calculates the start time of the current 30-minute block.
      const startMinutes = 8 * 60 + blockIndex * 30;

      // Calculates the end time of the current 30-minute block.
      const endMinutes = startMinutes + 30;

      // Converts the start time from total minutes to hours and minutes.
      const startHour = Math.floor(startMinutes / 60);
      const startMinute = startMinutes % 60;

      // Converts the end time from total minutes to hours and minutes.
      const endHour = Math.floor(endMinutes / 60);
      const endMinute = endMinutes % 60;

      // Formats the start time as HH:MM:SS.
      const startTime = `${String(startHour).padStart(2, "0")}:${String(
        startMinute,
      ).padStart(2, "0")}:00`;

      // Formats the end time as HH:MM:SS.
      const endTime = `${String(endHour).padStart(2, "0")}:${String(
        endMinute,
      ).padStart(2, "0")}:00`;

      // Returns the availability record for the current time slot.
      return {
        weekday,
        startTime: new Date(`1970-01-01T${startTime}.000Z`),
        endTime: new Date(`1970-01-01T${endTime}.000Z`),
        slotDuration: 30,
        availableSlot: true,
      };
    });
  });
};

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
    console.log(
      `Found ${appointmentCount} appointment(s). Updating specialties and availability without deleting existing data...`,
    );

    // ============================================================
    // UPDATE SPECIALTIES
    // ============================================================

    for (const specialty of specialties) {
      await prisma.speciality.update({
        where: {
          name: specialty.name,
        },
        data: {
          detailedDescription: specialty.detailedDescription,
        },
      });
    }

    console.log("Specialties updated successfully.");

    // ============================================================
    // RESET PROFESSIONAL AVAILABILITY
    // ============================================================

    for (const professional of professionals) {
      const user = await prisma.user.findUnique({
        where: {
          email: professional.email,
        },
        select: {
          id: true,
        },
      });

      if (!user) {
        console.log(
          `Professional not found: ${professional.firstName} ${professional.lastName}`,
        );
        continue;
      }

      const professionalProfile = await prisma.professionalProfile.findUnique({
        where: {
          professionalId: user.id,
        },
        select: {
          id: true,
        },
      });

      if (!professionalProfile) {
        console.log(
          `Professional profile not found: ${professional.firstName} ${professional.lastName}`,
        );
        continue;
      }

      // Removes the current availability schedule.
      await prisma.availability.deleteMany({
        where: {
          professionalProfileId: professionalProfile.id,
        },
      });

      // Creates the standard availability schedule.
      await prisma.availability.createMany({
        data: createAvailabilitySchedule().map((availability) => ({
          professionalProfileId: professionalProfile.id,
          ...availability,
        })),
      });

      console.log(
        `Availability reset for ${professional.firstName} ${professional.lastName}.`,
      );
    }

    console.log("Availability synchronization completed.");
    return;
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

            availabilities: {
              create: createAvailabilitySchedule(),
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

  const availabilityCount = await prisma.availability.count();

  console.log("");

  console.log("============================================================");
  console.log("SEED COMPLETED");
  console.log("============================================================");

  console.log(`Specialties: ${specialtyCount}`);
  console.log(`Professionals: ${professionalCount}`);

  console.log(
    `Professional-Specialty relations: ${professionalSpecialtyCount}`,
  );

  console.log(`Availabilities: ${availabilityCount}`);
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
