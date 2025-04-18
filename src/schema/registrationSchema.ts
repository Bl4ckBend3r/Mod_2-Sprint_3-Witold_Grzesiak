import { z } from "zod";

export const registrationSchema = z.object({
  firstName: z.string().min(3, "Imię musi mieć co najmniej 3 znaki"),
  lastName: z.string().min(3, "Nazwisko musi mieć co najmniej 3 znaki"),
  email: z.string().email("Wprowadź poprawny adres e-mail"),
  phone: z.string().regex(/^\d{9}$/, "Numer telefonu musi mieć 9 cyfr"),
  mode: z.enum(["stationary", "online"], {
    errorMap: () => ({ message: "Wybierz formę nauki" })
  }),  
  technologies: z.array(z.string()).min(1, "Wybierz przynajmniej jedną technologię"),
  cv: z.any(),
  hasExperience: z.boolean(),
  experience: z.array(
    z.object({
      tech: z.string().min(1, "Wybierz technologię"),
      level: z.string().min(1, "Wybierz poziom")
    })
  )
});
