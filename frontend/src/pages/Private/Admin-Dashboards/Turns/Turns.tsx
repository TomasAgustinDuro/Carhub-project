import { adaptTurn } from "../../../../Adapters/Turn.adapter";
import { Turn } from "../../../../interfaces/TurnType";
import {
  useGetTurns,
  useDeleteTurn,
} from "../../../../services/conection.service";

function Turns() {
  const { data } = useGetTurns();
  const { mutate } = useDeleteTurn();

  // Function to adapt the data from the API to the format we need
  const adaptedData: Turn[] = data?.map((turn: any) => adaptTurn(turn));

  // Function to handle the deletion of a turn
  const handleDelete = (id: string) => {
    mutate(id);
  };

  return (
    <section className="">
      <h3 className="font-semibold text-xl my-5">Próximos turnos</h3>
      {adaptedData ? (
        adaptedData.map((turn: Turn, index: number) => (
          <div
            key={index}
            className="flex flex-col lg:grid grid-cols-3 w-full items-center justify-center border border-gray-200 p-5 rounded"
          >
            <div className=" p-5 justify-self-start ">
              <div className="flex flex-col  ">
                <p className="flex gap-1 font-bold">
                  <span>{turn.user.name}</span>
                  <span>{turn.user.lastName}</span>
                </p>
                <span>{turn.user.email}</span>
              </div>
              <div className="flex gap-1">
                <p>
                  {turn.user.day} <span className="font-bold">•</span>{" "}
                  {turn.user.hour}
                </p>
              </div>
            </div>
            {/* car details */}
            <div className="border-l border-r border-gray-200 gap-3 p-2 w-full justify-self-center">
              <div className="flex gap-1 font-semibold">
                <p>{turn.car.brand}</p>
                <p>{turn.car.model}</p>
                <p>{turn.car.version}</p>
                <span>•</span>
                <p>{turn.car.year}</p>
              </div>

              <div className="flex gap-1">
                <p>{turn.car.mileage} KM</p>
                <span className="font-semibold">•</span>
                <p>{turn.car.price}</p>
              </div>
              <div>
                <p className="flex items-center gap-2 text-sm text-gray-700">
                  <span className="text-red-500">📌</span>
                  {turn.car.description}
                </p>
              </div>
            </div>

            <div className="justify-self-end">
              <button
                className="bg-blue-400 font-semibold p-3 text-white hover:bg-blue-500 rounded"
                onClick={() => {
                  turn.id && handleDelete(turn.id);
                }}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="p-5 w-full h-1/2 bg-gray-100 text-center">
          <h3>No hay turnos disponibles</h3>
        </div>
      )}
    </section>
  );
}

export default Turns;
