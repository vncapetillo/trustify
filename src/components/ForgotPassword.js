import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"

export default function ForgotPassword() {

  /**
 * Uso de Hooks de react como:
 * useRef: Para crear referencias a atributos del user
 * UseState: hook para inicializar estados de error y carga
 * useHistory: para saber dónde se encuentra y enviar al usuario acreditador a cierto path
 * 
 * Uso de Hook personalizando
 * AuthContext: funciones de loging y crud para el usuario acreditador
 */
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  //funcion que una vez apretado el boton del form espera el retorno del
  //la funcion login del hook personalizado, si esta retorna el user entonces
  //se considera logueado y pushea el path de acreditador 
  async function handleSubmit(e) {
    //previene el uso de "vacios"
    e.preventDefault()
    try {
      setMessage("")
      setError("")
      // setter del estado de carga
      setLoading(true)
      //espera a enviar y cambiar los datos del usuario
      await resetPassword(emailRef.current.value)
      setMessage("Vea su correo para continuar")
      //history.push("/")
    } catch {
      //settea el mesnaje de error en caso de que este ocurra
      setError("Algo salió mal")
    }
    //termina el estado de carga
    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Reset Contraseña</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Reset
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Volver</Link>
      </div>
    </>
  )
}
