function Sell() {
  return (
    <section className="p-10">
      <h2 className="text-center font-bold text-3xl mx-auto my-10 ">
        ¿Cómo funciona?
      </h2>

      <div className="flex flex-col lg:grid grid-cols-3 gap-8 text-center my-10 p-4">
        <div className="flex flex-col items-center gap-2">
          <span className=" text-white font-bold flex items-center justify-center border w-15 h-15 text-2xl rounded-full bg-[#005cb9]">
            1
          </span>

          <h3 className="font-bold text-xl">Busca tu auto ideal</h3>

          <p className="font-light text-lg">
            Explora nuestra amplia selección de vehículos y utiliza los filtros
            para encontrar el que mejor se adapte a tus necesidades
          </p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className=" text-white font-bold flex items-center justify-center border w-15 h-15 text-2xl rounded-full bg-[#005cb9]">
            2
          </span>

          <h3 className="font-bold text-xl">Busca tu auto ideal</h3>

          <p className="font-light text-lg">
            Explora nuestra amplia selección de vehículos y utiliza los filtros
            para encontrar el que mejor se adapte a tus necesidades
          </p>
        </div>

        <div className="flex flex-col items-center gap-2">
          <span className=" text-white font-bold flex items-center justify-center border w-15 h-15 text-2xl rounded-full bg-[#005cb9]">
            3
          </span>

          <h3 className="font-bold text-xl">Busca tu auto ideal</h3>

          <p className="font-light text-lg">
            Explora nuestra amplia selección de vehículos y utiliza los filtros
            para encontrar el que mejor se adapte a tus necesidades
          </p>
        </div>
      </div>
    </section>
  );
}
export default Sell;
