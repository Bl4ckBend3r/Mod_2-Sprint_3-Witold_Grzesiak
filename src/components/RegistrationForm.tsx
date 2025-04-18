import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema } from "../schema/registrationSchema";
import { z } from "zod";
import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import styles from "../styles/Form.module.css";

type FormState = z.infer<typeof registrationSchema>;

export default function RegistrationForm() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormState>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      mode: "stationary",
      technologies: [],
      cv: null,
      hasExperience: false,
      experience: [],
    },
  });

  const hasExperience = watch("hasExperience");
  const [cvError, setCvError] = useState("");
  const [experienceError, setExperienceError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormState | null>(null);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience",
  });

  const onSubmit = (data: FormState) => {
    const validCv =
      data.cv instanceof File &&
      ["image/jpeg", "image/png"].includes(data.cv.type);

    if (!validCv) {
      setCvError("Załącz plik CV w formacie JPEG lub PNG");
      return;
    }

    if (data.hasExperience && data.experience.length === 0) {
      setExperienceError(
        "Gdy zaznaczono doświadczenie, dodaj przynajmniej jedną pozycję."
      );
      return;
    }

    setCvError("");
    setExperienceError("");
    setSubmittedData(data);
    setShowModal(true);
  };

  return (
    <div className={styles.formContainer}>
      {/* Lewa strona */}
      <div className={styles.formIntro}>
        <h1>Formularz zgłoszeniowy na kurs programowania</h1>
        <p>
          Chcesz nauczyć się Reacta, Node.js, HTML, CSS czy Next.js? Wypełnij
          formularz po prawej stronie i dołącz do naszej społeczności
          programistów! 🚀
        </p>
      </div>

      {/* Formularz */}
      <form className={styles.formCard} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.sectionTitle}>Dane osobowe</h2>
        <input
          className={`${styles.input} ${
            errors.firstName ? styles.inputError : ""
          }`}
          {...register("firstName")}
          placeholder="Imię"
        />
        {errors.firstName && (
          <p className={styles.error}>{errors.firstName.message}</p>
        )}

        <input
          className={`${styles.input} ${
            errors.lastName ? styles.inputError : ""
          }`}
          {...register("lastName")}
          placeholder="Nazwisko"
        />
        {errors.lastName && (
          <p className={styles.error}>{errors.lastName.message}</p>
        )}

        <input
          className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
          {...register("email")}
          placeholder="E-mail"
        />
        {errors.email && <p className={styles.error}>{errors.email.message}</p>}

        <input
          className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
          {...register("phone")}
          placeholder="Numer telefonu"
        />
        {errors.phone && <p className={styles.error}>{errors.phone.message}</p>}

        <h2 className={styles.sectionTitle}>Preferencje kursu</h2>
        <label className={styles.label}>Wybierz formę nauki:</label>
        <div className={styles.radioGroup}>
          <label>
            <input type="radio" value="stationary" {...register("mode")} />
            Stacjonarna
          </label>
          <label>
            <input type="radio" value="online" {...register("mode")} />
            Online
          </label>
        </div>
        {errors.mode && <p className={styles.error}>{errors.mode.message}</p>}

        <label className={styles.label}>Wybierz preferowane technologie:</label>
        <select
          multiple
          className={`${styles.selectBox} ${
            errors.technologies ? styles.inputError : ""
          }`}
          {...register("technologies")}
        >
          <option value="React">React</option>
          <option value="Node.js">Node.js</option>
          <option value="HTML">HTML</option>
          <option value="CSS">CSS</option>
          <option value="Next.js">Next.js</option>
        </select>
        {errors.technologies && (
          <p className={styles.error}>{errors.technologies.message}</p>
        )}

        <h2 className={styles.sectionTitle}>Dodaj swoje CV</h2>
        <input
          type="file"
          accept="image/jpeg,image/png"
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            setValue("cv", file);
            if (file && !["image/jpeg", "image/png"].includes(file.type)) {
              setCvError("Plik musi być obrazem JPEG lub PNG");
            } else {
              setCvError("");
            }
          }}
        />
        {cvError && <p className={styles.error}>{cvError}</p>}

        <h2 className={styles.sectionTitle}>Doświadczenie w programowaniu</h2>
        <label className={styles.label}>
          <input type="checkbox" {...register("hasExperience")} />
          Czy masz doświadczenie w programowaniu?
        </label>

        {hasExperience && (
          <>
            <button
              type="button"
              className={styles.addButton}
              onClick={() => append({ tech: "", level: "" })}
            >
              Dodaj doświadczenie
            </button>

            {fields.map((field, index) => (
              <div key={field.id} className={styles.experienceRow}>
                <select
                  className={styles.input}
                  {...register(`experience.${index}.tech` as const)}
                >
                  <option value="">Wybierz technologię</option>
                  <option value="JavaScript">JavaScript</option>
                  <option value="Python">Python</option>
                  <option value="C++">C++</option>
                  <option value="Inne">Inne</option>
                </select>

                <select
                  className={styles.input}
                  {...register(`experience.${index}.level` as const)}
                >
                  <option value="">Wybierz poziom</option>
                  <option value="1">1 – Początkujący</option>
                  <option value="5">5 – Średniozaawansowany</option>
                  <option value="10">10 – Ekspert</option>
                </select>

                <button
                  type="button"
                  className={styles.removeButton}
                  onClick={() => remove(index)}
                >
                  Usuń
                </button>
              </div>
            ))}

            {experienceError && (
              <p className={styles.error}>{experienceError}</p>
            )}
          </>
        )}

        <button type="submit" className={styles.submitButton}>
          Wyślij zgłoszenie
        </button>
      </form>

      {showModal && submittedData && (
  <div className={styles.modalOverlay}>
    <div className={styles.modal}>
      <h2 className={styles.modalTitle}>Dane z formularza</h2>

      <div className={styles.modalSection}>
        <h3 className={styles.modalSubTitle}>Dane osobowe:</h3>
        <p>Imię: {submittedData.firstName}</p>
        <p>Nazwisko: {submittedData.lastName}</p>
        <p>Email: {submittedData.email}</p>
        <p>Telefon: {submittedData.phone}</p>
      </div>

      {submittedData.hasExperience && (
        <div className={styles.modalSection}>
          <h3 className={styles.modalSubTitle}>Doświadczenie w programowaniu:</h3>
          <ul>
            {submittedData.experience.map((exp, index) => (
              <li key={index}>
                Technologia: {exp.tech} / poziom: {exp.level}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.modalSection}>
        <h3 className={styles.modalSubTitle}>Preferencje kursu:</h3>
        <p>Typ kursu: {submittedData.mode === "online" ? "Online" : "Stacjonarny"}</p>
        <p>Preferowane technologie:</p>
        <ul>
          {submittedData.technologies.map((tech, index) => (
            <li key={index}>{tech}</li>
          ))}
        </ul>
      </div>

      <div className={styles.modalSection}>
        <h3 className={styles.modalSubTitle}>Curriculum vitae:</h3>
        {submittedData.cv && (
          <img
            src={URL.createObjectURL(submittedData.cv)}
            alt="CV"
            className={styles.cvImage}
          />
        )}
      </div>

      <button onClick={() => setShowModal(false)} className={styles.submitButton}>
        Zamknij
      </button>
    </div>
  </div>
)}

    </div>
  );
}
