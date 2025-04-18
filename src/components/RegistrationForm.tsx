// RegistrationForm.tsx
import React, { useState } from "react";
import styles from "../styles/Form.module.css";

export default function RegistrationForm() {
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: ""
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const isValid = {
    firstName: formValues.firstName.length >= 3,
    lastName: formValues.lastName.length >= 3,
    email: /\S+@\S+\.\S+/.test(formValues.email),
    phone: /^\d{9}$/.test(formValues.phone)
  };

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.heading}>Formularz zgłoszeniowy na kurs programowania</h1>
      <form className={styles.formCard}>
        <h2 className={styles.sectionTitle}>Dane osobowe</h2>
        <input
          className={styles.input}
          name="firstName"
          placeholder="Imię"
          value={formValues.firstName}
          onChange={handleInput}
        />
        {formValues.firstName && !isValid.firstName && (
          <p className={styles.error}>Imię musi mieć co najmniej 3 znaki</p>
        )}

        <input
          className={styles.input}
          name="lastName"
          placeholder="Nazwisko"
          value={formValues.lastName}
          onChange={handleInput}
        />
        {formValues.lastName && !isValid.lastName && (
          <p className={styles.error}>Nazwisko musi mieć co najmniej 3 znaki</p>
        )}

        <input
          className={styles.input}
          name="email"
          placeholder="E-mail"
          value={formValues.email}
          onChange={handleInput}
        />
        {formValues.email && !isValid.email && (
          <p className={styles.error}>Wprowadź poprawny adres e-mail</p>
        )}

        <input
          className={styles.input}
          name="phone"
          placeholder="Numer telefonu"
          value={formValues.phone}
          onChange={handleInput}
        />
        {formValues.phone && !isValid.phone && (
          <p className={styles.error}>Numer telefonu musi mieć 9 cyfr</p>
        )}

        <h2 className={styles.sectionTitle}>Preferencje kursu</h2>
        <label className={styles.label}>Wybierz formę nauki:</label>
        <div className={styles.radioGroup}>
          <label><input type="radio" name="mode" /> Stacjonarna</label>
          <label><input type="radio" name="mode" /> Online</label>
        </div>

        <select multiple className={styles.selectBox}>
          <option>React</option>
          <option>Node.js</option>
          <option>HTML</option>
          <option>CSS</option>
          <option>Next.js</option>
        </select>

        <h2 className={styles.sectionTitle}>Dodaj swoje CV</h2>
        <input type="file" />

        <h2 className={styles.sectionTitle}>Doświadczenie w programowaniu</h2>
        <label>
          <input type="checkbox" /> Czy masz doświadczenie w programowaniu?
        </label>

        <button type="submit" className={styles.submitButton}>Wyślij zgłoszenie</button>
      </form>
    </div>
  );
}