import { SectionQuestions } from "../../../components";
import informacionCompra from "./assets/informacionCompra.json";
import informacionVenta from "./assets/informacionVenta.json";

function Preguntas() {
  return (
    <>
      <section className=" p-5 lg:p-10">
        <div className="flex flex-col items-center gap-5 ">
          <h2 className="font-semibold text-3xl">
            <span>¿Tenés dudas?</span> Nosotros te las resolvemos
          </h2>
          <p className="font-light">
            Encuentra respuestas a las preguntas más frecuentes sobre nuestros
            servicios de compra y venta de autos.
          </p>
        </div>
      </section>

      <SectionQuestions
        informacionCompra={informacionCompra}
        informacionVenta={informacionVenta}
      />
    </>
  );
}

export default Preguntas;
