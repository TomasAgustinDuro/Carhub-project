import { Review } from "../../../../interfaces/ReviewInterface";
import { FaStar } from "react-icons/fa";

function ReviewsComponent({ data }: { data: Review[] }) {
  const stars = Array(5).fill(0);

  return data.map((data: Review) => {
    const date = new Date(data.createdAt);
    const formattedDate = date.toLocaleDateString("es-AR");

    return (
      <div
        key={data.id}
        className="shadow-md w-full lg:w-1/2 flex flex-col gap-5 mb-5 p-3 rounded border border-gray-200 mx-auto"
      >
        <div className="flex flex-col gap-2 ">
          <p className="flex">
            <strong>
              {data.name} {""}
            </strong>
          </p>

          <div className="flex">
            {stars.map((_, index) => (
              <FaStar
                key={index}
                size={24}
                color={data.qualy > index ? "orange" : "gray"}
              />
            ))}

            <p className="font-extralight ml-2">{formattedDate}</p>
          </div>
        </div>
        <p className="">{data.content}"</p>
      </div>
    );
  });
}

export default ReviewsComponent;
