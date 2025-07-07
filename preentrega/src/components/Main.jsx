import React from 'react';  
import Carousel from 'react-bootstrap/Carousel';
import '../styles/main.css'


function Main() {  
    return (  
        <main style={{ padding: "20px" }}>  
            <h2>Bienvenide a Sueteres Maria</h2>  
            <p>Seleccione "Productos" para ver el stock disponible. Para pedidos personalizados, porfavor pongase en contacto con nosotros.</p>  
            <div style={{ maxWidth: "700px", margin: "0 auto" }}>
                <Carousel>
                    <Carousel.Item>
                        <div className="carousel-img-overlay">
                            <img
                                src="https://media.istockphoto.com/id/1347250222/es/foto/pila-de-tres-su%C3%A9teres.jpg?s=612x612&w=0&k=20&c=EtxWAmsgFCGYSElufSUi0GgGii2nuQGxQrg4ZKMHmRw="
                                alt="Descripción"
                                className="d-block w-100"
                            />
                            <div className="overlay-dark"></div>
                        </div>
                        <Carousel.Caption>
                            <h3>Cálido y elegante</h3>
                            <p>Tejemos calidez y estilo en cada prenda. Descubrí sweaters únicos, confeccionados con materiales premium y diseño atemporal.Sentí la suavidad. Viví el confort.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="carousel-img-overlay">
                            <img
                                src="https://www.lamina.com.co/cdn/shop/collections/2698368.jpg?v=1586140198"
                                alt="Descripción"
                                className="d-block w-100"
                            />
                            <div className="overlay-dark"></div>
                        </div>
                        <Carousel.Caption>
                            <h3>Fresco y juvenil</h3>
                            <p>Confeccionados con lana merino de alta calidad, nuestros sweaters ofrecen una suavidad excepcional y un ajuste perfecto. Ideales para cualquier ocasión.</p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <div className="carousel-img-overlay">
                            <img
                                src="https://media.istockphoto.com/id/182344013/es/foto/oveja.jpg?s=612x612&w=0&k=20&c=-K7_ORKFI9rIXEqryMJ13XGrsYI4Qmo4WJynbpkm044="
                                alt="Descripción"
                                className="d-block w-100"
                            />
                            <div className="overlay-dark"></div>
                        </div>
                        <Carousel.Caption>
                            <h3>Minimalista</h3>
                            <p>
                                Sweaters hechos con amor y dedicación.
Calidad. Comodidad. Estilo.
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
            </div>
        </main>  
    );  
}  
export default Main;