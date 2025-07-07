import { FaLinkedin, FaPhoneAlt, FaEnvelope, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";

function Contacto() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
      <div
        className="bg-white rounded shadow p-4"
        style={{
          maxWidth: 500,
          width: "100%",
          textAlign: "center",
          margin: "0 auto",
        }}
      >
        <h1
          style={{
            fontWeight: 700,
            fontSize: "2.2rem",
            marginBottom: "0.5em",
            color: "#a495a7",
            letterSpacing: "2px"
          }}
        >
          Contacto
        </h1>
        <a
          href="https://www.linkedin.com/in/carolina-blanco-/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5em",
            color: "#0a66c2",
            fontWeight: 600,
            textDecoration: "none",
            marginBottom: "1em",
            fontSize: "1.1rem"
          }}
        >
          <FaLinkedin /> Linkedin profile
        </a>
        <p style={{ color: "#444", fontSize: "1.1rem", margin: "1em 0 0.5em 0" }}>
          ¿Tenés dudas, consultas o querés saber más sobre nuestros productos?<br />
          ¡Estamos aquí para ayudarte!
        </p>
        <ul style={{ listStyle: "none", padding: 0, margin: "1.2em 0 1em 0", textAlign: "left" }}>
          <li style={{ marginBottom: "0.7em", fontSize: "1.08rem" }}>
            <FaPhoneAlt style={{ color: "#43c59e", marginRight: 8 }} />
            <b>Teléfono:</b> +54 9 11 1234 5678
          </li>
          <li style={{ marginBottom: "0.7em", fontSize: "1.08rem" }}>
            <FaEnvelope style={{ color: "#6c63ff", marginRight: 8 }} />
            <b>Email:</b> contacto@sweateresmaria.com
          </li>
          <li style={{ marginBottom: "0.7em", fontSize: "1.08rem" }}>
            <FaWhatsapp style={{ color: "#25d366", marginRight: 8 }} />
            <b>WhatsApp:</b> +54 9 11 2345 6789
          </li>
          <li style={{ marginBottom: "0.7em", fontSize: "1.08rem" }}>
            <FaMapMarkerAlt style={{ color: "#a495a7", marginRight: 8 }} />
            <b>Ubicación:</b> Buenos Aires, Argentina
          </li>
        </ul>
        <p style={{ color: "#888", fontSize: "1rem" }}>
          También podés escribirnos a través de nuestro formulario de contacto. ¡Te responderemos lo antes posible!
        </p>
      </div>
    </div>
  );
}

export default Contacto;




