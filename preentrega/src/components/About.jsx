function About() {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
      <div
        className="bg-white rounded shadow p-4"
        style={{
          maxWidth: 600,
          width: "100%",
          textAlign: "center",
          margin: "0 auto",
        }}
      >
        <h1 style={{ color: "#a495a7", fontWeight: 700, marginBottom: "0.5em" }}>Sobre Nosotros</h1>
        <h3 style={{ color: "#a495a7", fontWeight: 600, marginBottom: "1em" }}>Hecho con amor</h3>
        <p style={{ color: "#444", fontSize: "1.1rem", lineHeight: 1.7 }}>
          Sweateres María nació del amor por lo artesanal y el deseo de ofrecer prendas únicas que transmitan calidez y estilo.<br /><br />
          Creemos en la moda sostenible y en el trabajo responsable, por eso cada sweater es tejido cuidadosamente, con materiales de calidad y detalles que marcan la diferencia.<br /><br />
          Somos una marca argentina que celebra la belleza de lo simple y lo bien hecho. Queremos que cada persona que vista Sweateres María se sienta cómoda, especial y abrazada por la suavidad de nuestras prendas.
        </p>
      </div>
    </div>
  );
}

export default About;