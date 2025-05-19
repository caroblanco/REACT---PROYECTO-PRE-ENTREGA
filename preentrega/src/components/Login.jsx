function Login ({setLogeadoUser, setLogeadoAdmin}) {
    return(
        <div>
            <button onClick={setLogeadoUser}>Logearse como usuario</button>
            <button onClick={setLogeadoAdmin}>Logearse como administrador</button>
        </div>
    )
}

export default Login;