import React, { useState } from "react";
import { Review } from "../../../../interfaces/ReviewInterface";
import { useCreateReview } from "../../../../services/conection.service";
import { FaStar } from "react-icons/fa6";
import { reviewSchema } from "../../../../shared/Review.schema";
import { parseZodErrors } from "../../../../utils/errors";
import { ErrorComponent } from "../../../../components";

function Form() {
  const [errors, setErrors] = useState<string[]>([]);
  const [formData, setFormData] = useState<Review>({
    qualy: 0,
    name: "",
    content: "",
  });

  const [hoverValue, setHoverValue] = useState<number>(0);
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
  const handleMouseOverStar = (value: number) => {
    setHoverValue(value);
  };

  const handleMouseLeaveStar = () => {
    setHoverValue(0);
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
          setFormData({
            qualy: 0,
            name: "",
            content: "",
          });
          setErrors([]);
          window.location.reload(); // Reload the page to see the new review
        },
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col p-5 gap-5">
        <div className="flex flex-col">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            className="border p-1 rounded border-gray-400 focus:border-blue-600"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col">
          <label htmlFor="content">Review:</label>
          <textarea
            id="content"
            name="content"
            className="border p-1 rounded border-gray-400 focus:border-blue-600"
            value={formData.content}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col">
          <p>Califación</p>
          <div className="flex">
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
        </div>
        <button
          type="submit"
          className="bg-blue-400 rounded w-1/2 lg:w-1/4 text-white font-semibold p-2 mx-auto"
        >
          Submit
        </button>
      </form>

      {errors.length > 0 && ErrorComponent(errors)}
    </div>
  );
}

export default Form;
