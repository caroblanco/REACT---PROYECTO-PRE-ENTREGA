import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext.jsx';

function Perfil() {
    const { user, logout } = useAuthContext();
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    return (
        <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
            <div className="bg-white rounded shadow p-4" style={{ maxWidth: 400, width: "100%", textAlign: "center" }}>
                <div style={{
                    width: 90,
                    height: 90,
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #a495a7 0%, #e0c3fc 100%)",
                    margin: "0 auto 1.2rem auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "2.5rem",
                    color: "#fff",
                    fontWeight: 700,
                    letterSpacing: "1px"
                }}>
                    {user.nombre ? user.nombre[0].toUpperCase() : "U"}
                </div>
                <h2 className="mb-2">{user.nombre || "Usuario"}</h2>
                <p className="text-muted mb-4">{user.email || "Sin email"}</p>
                <button
                    className="btn btn-outline-danger px-4"
                    onClick={logout}
                >
                    Cerrar Sesión
                </button>
            </div>
        </div>
    );
}

export default Perfil;