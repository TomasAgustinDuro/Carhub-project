import { FaFacebook, FaSquareXTwitter, FaInstagram } from "react-icons/fa6";

function Footer() {
  return (
    <footer>
      <div className="bg-gray-100 border-t-2 border-t-gray-200 flex flex-col gap-5 lg:grid grid-cols-4 p-10 ">
        <div className="flex flex-col gap-2">
          <h3 className="font-bold text-2xl">CarHub</h3>
          <p>Innovando en la compra y venta de autos desde 1985</p>
          <div className="flex gap-4">
            <FaFacebook />
            <FaSquareXTwitter />
            <FaInstagram />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold">Servicios</h3>
          <ul className="flex flex-col gap-2">
            <li>Compra</li>
            <li>Venta</li>
            <li>Financiación</li>
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold">Servicios</h3>
          <ul className="flex flex-col gap-2">
            <li>Compra</li>
            <li>Venta</li>
            <li>Financiación</li>
          </ul>
        </div>

        <div className="flex flex-col gap-2">
          <h3 className="font-bold">Servicios</h3>
          <ul className="flex flex-col gap-2">
            <li>Compra</li>
            <li>Venta</li>
            <li>Financiación</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
