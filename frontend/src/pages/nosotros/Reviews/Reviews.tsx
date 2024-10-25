import styles from "./Reviews.module.scss";
import { FaRegStar } from "react-icons/fa6";

import FormReview from "./components/form/Form";
import useConnectionDB from "../../../hooks/dolar/connection_db";
import Review from "../../../interfaces/Review";

function Reviews() {
  const { data } = useConnectionDB("api/reviews");


  return (
    <section className={styles.reviewsPage}>
      <div className={styles.containerFormReviews}>
        <FormReview />
      </div>

      <div className={styles.reviews}>
        {!data ? (
          <div className={styles.loader} />
        ) : (
          data.map((data: Review) => (
            <div key={data.id} className={styles.containerReview}>
              <div className={styles.reviewsHeader}>
                <p>
                  {" "}
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
