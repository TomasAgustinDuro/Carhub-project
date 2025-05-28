import { FaStar } from "react-icons/fa";
import FormReview from "./components/Form";
import { useGetReviews } from "../../../services/conection.service";
import { Loader } from "../../../components";
import ReviewsComponent from "./components/ReviewsComponent";

//TODO: reload after submit form

function Reviews() {
  const { data, isPending } = useGetReviews();

  if (!data) {
    return;
  }

  const totalQualy = data.reduce((acc, q) => acc + q.qualy, 0);
  const average = totalQualy / data.length;

  const stars = Array(5).fill(0);

  return (
    <section className="flex flex-col items-center m-5 ">
      <div className="p-5 m-5 text-center flex flex-col gap-4">
        <h2 className="font-semibold text-3xl">
          Opiniones de nuestros clientes
        </h2>
        <p className="font-light text-xl">
          Descubre lo que opinan nuestros clientes sobre su experiencia
          comprando o vendiendo autos con Carhub.
        </p>
        <div className="flex flex-col lg:flex-row gap-2 items-center justify-center">
          <div className="flex">
            {stars.map((_, index) => (
              <FaStar
                key={index}
                size={24}
                color={average > index ? "orange" : "gray"}
              />
            ))}
          </div>

          <p className="flex items-center justify-center gap-2">
            <strong className="text-2xl">{average ? average : 0}/5</strong>
            Basado en {data.length} opiniones
          </p>
        </div>
      </div>

      <div>
        {isPending ? (
          <Loader />
        ) : data ? (
          <ReviewsComponent data={data} />
        ) : (
          <p className="text-center">No hay opiniones disponibles.</p>
        )}
      </div>

      <div className="shadow-md w-full lg:w-1/2 my-5">
        <FormReview />
      </div>
    </section>
  );
}

export default Reviews;
