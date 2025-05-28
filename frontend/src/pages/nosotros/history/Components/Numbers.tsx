import { PiMedalFill } from "react-icons/pi";

function Numbers() {
  return (
    <aside className="flex flex-col rounded w-full lg:w-3/4 p-5 gap-10">
      <div className=" border border-gray-200  flex flex-col items-center justify-center gap-10 shadow-md p-5">
        <h2 className="font-bold text-2xl">Carhub en numeros</h2>

        <p className="flex flex-col text-center">
          <strong className="!text-blue-500 text-4xl">38</strong>
          de experiencia
        </p>
        <p className="flex flex-col text-center">
          <strong className="!text-blue-500 text-4xl">100,000+</strong>
          clientes satisfechos
        </p>
        <p className="flex flex-col text-center">
          <strong className="!text-blue-500 text-4xl">15</strong>
          sucursales en el país
        </p>
        <p className="flex flex-col text-center">
          <strong className="!text-blue-500 text-4xl">200+</strong>
          profesionales
        </p>
      </div>

      <div className="shadow-md border border-gray-100 flex flex-col gap-3 p-5 ">
        <h3 className="text-xl font-semibold ">Reconocimientos</h3>

        <div className="gap-2 flex items-center">
          <PiMedalFill className="text-blue-600 text-xl" />

          <div className="text-black ">
            <h3 className="font-semibold text-sm">
              Mejor plataforma de compra y venta
            </h3>
            <p className="font-light text-sm">Premios Automotriz 2022</p>
          </div>
        </div>
        <div className="gap-2 flex items-center ">
          <PiMedalFill className="text-blue-600 text-xl" />

          <div className="text-black ">
            <h3 className="font-semibold text-sm">
              Excelencia en Servicio al Clientes
            </h3>
            <p className="font-light text-sm">Cámara de Comercio 2021</p>
          </div>
        </div>
        <div className="gap-2 flex items-center ">
          <PiMedalFill className="text-blue-600 text-xl" />

          <div className="text-black ">
            <h3 className="font-semibold text-sm">Innovación Tecnológica</h3>
            <p className="font-light text-sm">
              Foro de Empresas Digitales 2020
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default Numbers;
