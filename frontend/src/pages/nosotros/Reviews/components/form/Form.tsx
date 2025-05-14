import React, { useState } from "react";
import styles from "./form.module.scss";
import { Review } from "../../../../../interfaces/ReviewInterface";
import { useCreateReview } from "../../../../../services/conection.service";
import { FaStar } from "react-icons/fa6";
import { reviewSchema } from "../../../../../../../shared/Review.schema";
import { parseZodErrors } from "../../../../../utils/errors";

function Form() {
  const [errors, setErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState<Review>({
    qualy: 0,
    name: "",
    content: "",
  });

  const [hoverValue, setHoverValue] = useState(undefined);
  const { mutate } = useCreateReview();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const stars = Array(5).fill(0);

  const handleClickStar = (value: number) => {
    setFormData({
      ...formData,
      qualy: value,
    });
  };
  const handleMouseOverStar = (value) => {
    setHoverValue(value);
  };

  const handleMouseLeaveStar = () => {
    setHoverValue(undefined);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validation = reviewSchema.safeParse(formData);

    if (!validation.success) {
      const error = parseZodErrors(validation.error);
      setErrors(error);
      return;
    }

    if (formData.name && formData.content) {
      mutate(formData, {
        onError: (error: any) => {
          const message =
            error.response?.data?.message ||
            error.message ||
            "Error inesperado";

          setErrors([message]);
        },
        onSuccess: () => {
          setErrors([]); // Limpiar errores si todo salió bien
        },
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.formReview}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="content">Review:</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
          />
        </div>

        <div>
          {stars.map((_, index) => {
            return (
              <FaStar
                key={index}
                size={24}
                color={
                  (hoverValue || formData.qualy) > index ? "orange" : "gray"
                }
                onClick={() => handleClickStar(index + 1)}
                onMouseOver={() => handleMouseOverStar(index + 1)}
                onMouseLeave={handleMouseLeaveStar}
              />
            );
          })}
        </div>
        <button type="submit">Submit</button>
      </form>

      {errors.length > 0 && (
        <ul className="error-list">
          {errors.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Form;
