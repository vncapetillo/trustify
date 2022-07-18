import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function SignupAutor() {
  /**
 * Uso de Hooks de react como:
 * useRef: Para crear referencias a atributos del user
 * UseState: hook para inicializar estados de error y carga
 * useHistory: para saber dónde se encuentra el usuario y enviarlo a algun path una vez creado el usuario
 * 
 * Uso de Hook personalizando
 * AuthContext: funciones de crear usuario autor y sus atributos
 */
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const nameRef = useRef()
  const lastnameRef = useRef()
  //hook personalizado
  const { signup, addUserToCollection } = useAuth()
  //error state
  const [error, setError] = useState("")
  //estado de carga
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  //funcion asincrona una vez se presiona el form para crear el usuario
  async function handleSubmit(e) {
    //no se envien cosas default (vacias)
    e.preventDefault()

    //error si las contrasenas no son iguales
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("No coinciden las contraseñas")
    }

    //creacion del usuario en la BD
    try {
      setError("")
      //se settea el estado de carga
      setLoading(true)
      //se crea el usuario
      await signup(emailRef.current.value, passwordRef.current.value)
      //se agrega a la conexion
      await addUserToCollection(emailRef.current.value, nameRef.current.value, lastnameRef.current.value)
      //se envia al path home del autor
      history.push("/autor/")
    } catch(e) {
      //mensaje de error en caso de suceder
      setError("Failed to create an account")
      //setError(e)
    }
    //se termina el estado de carga
    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up Autor</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="nombre">
              <Form.Label>Nombre</Form.Label>
              <Form.Control type="text" ref={nameRef} required />
            </Form.Group>
            <Form.Group id="apellido">
              <Form.Label>Apellido</Form.Label>
              <Form.Control type="text" ref={lastnameRef} required />
            </Form.Group>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Contraseña</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Confirmacion de contraseña</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Ya tienes cuenta? <Link to="/login-autor">Log In</Link>
      </div>
    </>
  )
}
