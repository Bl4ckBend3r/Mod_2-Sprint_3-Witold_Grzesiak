// RegistrationForm.tsx
import React from "react";
import styles from "../styles/Form.module.css";

export default function RegistrationForm() {
  return (
    <div className={styles.formContainer}>
      <h1 className={styles.heading}>Formularz zgłoszeniowy na kurs programowania</h1>
      <form className={styles.formCard}>
        <h2 className={styles.sectionTitle}>Dane osobowe</h2>
        <input className={styles.input} placeholder="Imię" />
        <input className={styles.input} placeholder="Nazwisko" />
        <input className={styles.input} placeholder="E-mail" />
        <input className={styles.input} placeholder="Numer telefonu" />

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
