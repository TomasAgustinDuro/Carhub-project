import { Accordion } from "../../../../components";

function QuestionsCar() {
  return (
    <section className="my-5">
      <h3 className="font-bold text-2xl p-3">Preguntas frecuentes</h3>
      <div className="">
        <Accordion
          question={"¿El precio es negociable?"}
          answer={[
            "Los precios en Carhub son competitivos y están basados en el valor de mercado. Sin embargo, siempre puedes hacer una oferta y el vendedor evaluará si puede ajustar el precio.",
          ]}
        />

        <Accordion
          question={"¿Puedo financiar este vehículo?"}
          answer={[
            "Sí, ofrecemos opciones de financiamiento de hasta el 70% del valor del vehículo. Puedes consultar las tasas y plazos disponibles contactando a nuestro equipo.",
          ]}
        />
        <Accordion
          question={"¿Aceptan mi auto como parte de pago?"}
          answer={[
            "Sí, evaluamos tu vehículo actual y te ofrecemos un valor justo para tomarlo como parte de pago por tu nuevo auto.",
          ]}
        />
      </div>
    </section>
  );
}

export default QuestionsCar;
