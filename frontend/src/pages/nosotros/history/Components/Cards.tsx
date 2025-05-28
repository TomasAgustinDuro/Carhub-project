import { FaCarSide } from "react-icons/fa6";
import { FaUsers } from "react-icons/fa";
import { PiMedalFill } from "react-icons/pi";
import { MdOutlineWatchLater } from "react-icons/md";

function Cards() {
  return (
    <div className=" flex flex-col lg:grid grid-cols-2 gap-5 my-5">
      <div className="flex border border-gray-200 rounded p-5 gap-3">
        <span className="rounded-full bg-blue-100 p-2 w-10 h-10 flex items-center justify-center">
          <FaCarSide className="text-blue-600 text-xl" />
        </span>
        <div className="flex flex-col gap-3">
          <h3 className="font-bold">Vehículos verificados</h3>
          <p>
            Todos nuestros autos pasan por una rigurosa inspección de 150 puntos
            para garantizar su calidad y seguridad.
          </p>
        </div>
      </div>
      <div className="flex border border-gray-200 rounded p-5 gap-3">
        <span className="rounded-full bg-blue-100 p-2 w-10 h-10 flex items-center justify-center">
          <MdOutlineWatchLater className="text-blue-600 text-xl" />
        </span>

        <div className="flex flex-col gap-3">
          <h3 className="font-bold">Proceso simplificado</h3>
          <p>
            Nos encargamos de todos los trámites para que puedas comprar o
            vender tu auto sin complicaciones.
          </p>
        </div>
      </div>
      <div className="flex border border-gray-200 rounded p-5 gap-3">
        <span className="rounded-full bg-blue-100 p-2 w-10 h-10 flex items-center justify-center">
          <FaUsers className="text-blue-600 text-xl" />
        </span>
        <div className="flex flex-col gap-3">
          <h3 className="font-bold">Equipo de expertos</h3>
          <p>
            Contamos con profesionales especializados en el sector automotriz
            para asesorarte en todo momento.
          </p>
        </div>
      </div>
      <div className="flex border border-gray-200 rounded p-5 gap-3">
        <span className="rounded-full bg-blue-100 p-2 w-10 h-10 flex items-center justify-center">
          <PiMedalFill className="text-blue-600 text-xl" />
        </span>
        <div className="flex flex-col gap-3">
          <h3 className="font-bold">Garantía Carhub</h3>
          <p>
            Ofrecemos garantía mecánica en todos nuestros vehículos para tu
            tranquilidad.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Cards;
