import React from 'react';  


function Gallery() {  
    const images = Array.from({ length: 5 }, () => 
        `https://picsum.photos/300/200?random=${Math.floor(Math.random() * 10000)}`
      );

    return (  
        <section style={{ display: "flex", gap: "10px", justifyContent: "center", marginTop: "20px" }}>  
            {images.map((src, index) => (  
                <img key={index} src={src} alt={`Imagen ${index + 1}`} style={{ width: "150px", height: "150px" }} />
            ))}  
        </section>  
    );  
}  


export default Gallery;  
