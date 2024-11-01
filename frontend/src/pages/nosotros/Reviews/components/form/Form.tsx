import React, { useState } from "react";
import { FormReview } from "../../../../../interfaces";
import styles from "./form.module.scss";
import {usePostData} from "../../../../../hooks";

function Form({}) {
  const [formData, setFormData] = useState<FormReview>({
    user_name: "",
    review: "",
  });
  const [submitData, setSubmitData] = useState<FormReview | null>(null);
  const { error } = usePostData("api/reviews", submitData);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.user_name && formData.review) {
      setSubmitData(formData);
      setFormData({ user_name: "", review: "" });
      setTimeout(() => {
        window.location.reload();
      }, 100); // 100 milisegundos de retrasoos
    } 
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formReview}>
      <div>
        <label htmlFor="user_name">Name:</label>
        <input
          type="text"
          id="user_name"
          name="user_name"
          value={formData.user_name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="review">Review:</label>
        <textarea
          id="review"
          name="review"
          value={formData.review}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Submit</button>
    </form>

 
  );
}

export default Form;
