import OurHistory from "./Components/OurHistory";
import Cards from "./Components/Cards";
import Numbers from "./Components/Numbers";

function History() {
  return (
    <section>
      <div className="h-90 border  bg-black/60 flex flex-col justify-center p-6">
        <h2 className="text-white font-bold text-4xl">La historia de Carhub</h2>
        <p className="!text-white font-light text-xl">
          Innovando en la compra y venta de autos desde 1985
        </p>
      </div>

      <div className="flex flex-col lg:flex-row my-5 p-7 gap-5">
        <div>
          {/* Our history */}
          <OurHistory />

          {/* Cards */}
          <Cards />

          {/* Our mission */}
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Nuestra misión</h2>
            <p>
              En Carhub, nuestra misión es revolucionar la forma en que las
              personas compran y venden autos, eliminando la complejidad y la
              incertidumbre del proceso. Nos esforzamos por crear un ecosistema
              donde la transparencia, la confianza y la satisfacción del cliente
              sean los pilares fundamentales.
            </p>
            <p>
              Trabajamos cada día para ofrecer una experiencia excepcional,
              brindando herramientas innovadoras, información detallada y un
              servicio personalizado que permita a nuestros clientes tomar
              decisiones informadas y seguras.
            </p>
          </div>
        </div>

        {/* Numbers and more*/}
        <Numbers />
      </div>
    </section>
  );
}
export default History;
