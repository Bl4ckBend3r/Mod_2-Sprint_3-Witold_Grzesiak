import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import styles from "../styles/Form.module.css";

interface ExperienceEntry {
  tech: string;
  level: string;
}

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  mode: string;
  technologies: string[];
  cv: File | null;
  hasExperience: boolean;
  experience: ExperienceEntry[];
}

export default function RegistrationForm() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors }
  } = useForm<FormState>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      mode: "",
      technologies: [],
      cv: null,
      hasExperience: false,
      experience: []
    }
  });

  const [cvError, setCvError] = useState("");
  const [experienceError, setExperienceError] = useState("");
  const hasExperience = watch("hasExperience");

  const { fields, append, remove } = useFieldArray({
    control,
    name: "experience"
  });

  const onSubmit = (data: FormState) => {
    const validCv =
      data.cv instanceof File && ["image/jpeg", "image/png"].includes(data.cv.type);

    if (!validCv) {
      setCvError("Załącz plik CV w formacie JPEG lub PNG");
      return;
    }

    if (data.hasExperience && data.experience.length === 0) {
      setExperienceError(
        "Gdy zaznaczono doświadczenie w programowaniu, lista doświadczeń nie może być pusta."
      );
      return;
    }

    setCvError("");
    setExperienceError("");
    console.log("Dane przesłane:", data);
    alert("Zgłoszenie zostało wysłane!");
  };

  return (
    <div className={styles.formContainer}>
      {/* Lewa strona */}
      <div className={styles.formIntro}>
        <h1>Formularz zgłoszeniowy na kurs programowania</h1>
        <p>
          Chcesz nauczyć się Reacta, Node.js, HTML, CSS czy Next.js? Wypełnij formularz po prawej
          stronie i dołącz do naszej społeczności programistów! 🚀<br />
          Nasze kursy są dostępne online i stacjonarnie – wybierz co ci pasuje i zacznij już dziś!
        </p>
      </div>

      {/* Prawa strona – formularz */}
      <form className={styles.formCard} onSubmit={handleSubmit(onSubmit)}>
        <h2 className={styles.sectionTitle}>Dane osobowe</h2>
        <input
          className={`${styles.input} ${errors.firstName ? styles.inputError : ""}`}
          {...register("firstName", { required: true, minLength: 3 })}
          placeholder="Imię"
        />
        {errors.firstName && <p className={styles.error}>Imię musi mieć co najmniej 3 znaki</p>}

        <input
          className={`${styles.input} ${errors.lastName ? styles.inputError : ""}`}
          {...register("lastName", { required: true, minLength: 3 })}
          placeholder="Nazwisko"
        />
        {errors.lastName && <p className={styles.error}>Nazwisko musi mieć co najmniej 3 znaki</p>}

        <input
          className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
          {...register("email", {
            required: true,
            pattern: /^\S+@\S+\.\S+$/
          })}
          placeholder="E-mail"
        />
        {errors.email && <p className={styles.error}>Wprowadź poprawny adres e-mail</p>}

        <input
          className={`${styles.input} ${errors.phone ? styles.inputError : ""}`}
          {...register("phone", {
            required: true,
            pattern: /^[0-9]{9}$/
          })}
          placeholder="Numer telefonu"
        />
        {errors.phone && <p className={styles.error}>Numer telefonu musi mieć 9 cyfr</p>}

        <h2 className={styles.sectionTitle}>Preferencje kursu</h2>
        <label className={styles.label}>Wybierz formę nauki:</label>
        <div className={styles.radioGroup}>
          <label>
            <input type="radio" value="stationary" {...register("mode", { required: true })} />
            Stacjonarna
          </label>
          <label>
            <input type="radio" value="online" {...register("mode", { required: true })} />
            Online
          </label>
        </div>
        {errors.mode && <p className={styles.error}>Wybierz formę nauki</p>}

        <label className={styles.label}>Wybierz preferowane technologie:</label>
        <select
          multiple
          className={`${styles.selectBox} ${errors.technologies ? styles.inputError : ""}`}
          {...register("technologies", { validate: (value) => value.length > 0 })}
        >
          <option value="React">React</option>
          <option value="Node.js">Node.js</option>
          <option value="HTML">HTML</option>
          <option value="CSS">CSS</option>
          <option value="Next.js">Next.js</option>
        </select>
        {errors.technologies && (
          <p className={styles.error}>Wybierz przynajmniej jedną technologię</p>
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
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5 – Średniozaawansowany</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
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

            {experienceError && <p className={styles.error}>{experienceError}</p>}
          </>
        )}

        <button type="submit" className={styles.submitButton}>
          Wyślij zgłoszenie
        </button>
      </form>
    </div>
  );
}
