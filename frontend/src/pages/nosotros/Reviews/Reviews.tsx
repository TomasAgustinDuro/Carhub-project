import styles from "./reviews.module.scss";
import { FaRegStar } from "react-icons/fa6";
import FormReview from "./components/form/Form";
import { useGetData } from "../../../hooks";
import { Review } from "../../../interfaces";
import { Loader } from "../../../components";

function Reviews() {
  const { value, loading } = useGetData("api/reviews");
  const data = value as Review[];

  return (
    <section className={styles.reviewsPage}>
      <div className={styles.containerFormReviews}>
        <FormReview />
      </div>

      <div className={styles.reviews}>
        {loading ? (
          <Loader />
        ) : (
          data.map((data: Review) => (
            <div key={data.id} className={styles.containerReview}>
              <div className={styles.reviewsHeader}>
                <p>
                  <FaRegStar /> <strong>{data.user_name}</strong>
                </p>

                <p>{data.date}</p>
              </div>

              <p id={styles.textReview}>"{data.review}"</p>
            </div>
          ))
        )}
      </div>
    </section>
  );
}

export default Reviews;
