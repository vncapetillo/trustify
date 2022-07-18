import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function LoginAutor() {

/**
 * Uso de Hooks de react como:
 * useRef: Para crear referencias a atributos del user
 * UseState: hook para inicializar estados de error y carga
 * useHistory: para saber dónde se encuentra actualmente el usuario
 * 
 * Uso de Hook personalizando
 * AuthContext: funciones de loging y crud para el usuario
 */
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  //funcion que una vez apretado el boton del form espera el retorno del
  //la funcion login del hook personalizado, si esta retorna el user entonces
  //se considera logueado y pushea el path de author
  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      //comienza a cargar
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/autor/")
    } catch(e) {
      //Caso contrario, tira el mensaje de error
      //setError(e)
      setError("Failed to log in")
    }
    //se termina el loading
    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In Para Escritores</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Log In
            </Button>
          </Form>
          <div className="w-100 text-center mt-3">
            <Link to="/forgot-password">Se te olvidó la contraseña?</Link>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Necesitas cuenta de escritor? <Link to="/signup-autor">Sign Up Aquí</Link>
      </div>
      <div className="w-100 text-center mt-2">
        O quizá como acreditador? <Link to="/signup-acreditador">X acá el SignUp</Link>
      </div>
    </>
  )
}
