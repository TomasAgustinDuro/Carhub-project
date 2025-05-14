import styles from "./reviews.module.scss";
import { FaStar } from "react-icons/fa";
import FormReview from "./components/form/Form";
import { Review } from "../../../interfaces/ReviewInterface";
import { useGetReviews } from "../../../services/conection.service";

//TODO: reload after submit form

function Reviews() {
  const { data } = useGetReviews();

  const stars = Array(5).fill(0);

  return (
    <section className={styles.reviewsPage}>
      <div className={styles.containerFormReviews}>
        <FormReview />
      </div>

      <div className={styles.reviews}>
        {data
          ? data.map((data: Review) => {
              const date = new Date(data.createdAt);
              const formattedDate = date.toLocaleDateString("es-AR");

              return (
                <div key={data.id} className={styles.containerReview}>
                  <div className={styles.reviewsHeader}>
                    <p>
                      <strong>{data.name}</strong>
                      <strong>{formattedDate}</strong>
                    </p>
                    <div>
                      {stars.map((_, index) => (
                        <FaStar
                          key={index}
                          size={24}
                          color={data.qualy > index ? "orange" : "gray"}
                        />
                      ))}
                    </div>
                  </div>
                  <p id={styles.textReview}>"{data.content}"</p>
                </div>
              );
            })
          : "error"}
      </div>
    </section>
  );
}

export default Reviews;
