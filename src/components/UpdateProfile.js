import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function UpdateProfile() {
/**
 * Uso de Hooks de react como:
 * useRef: Para crear referencias a atributos del user
 * UseState: hook para inicializar estados de error y carga
 * useHistory: para saber dónde se encuentra actualmente el usuario
 * 
 * Uso de Hook personalizando
 * AuthContext: funciones de loging y update de atributos de un usuario
 */
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail } = useAuth()
  //mensaje de error
  const [error, setError] = useState("")
  //setteo del loading
  const [loading, setLoading] = useState(false)
  //ubicacion del user
  const history = useHistory()

  //funcion OnClick
  function handleSubmit(e) {
    e.preventDefault()
    //en caso de que las contrasenas no coincidan (no sean iguales)
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("No coinciden las contraseñas")
    }

    //setter del loading
    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      //update del atributo en la BD
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      //update del atributo en la BD
      promises.push(updatePassword(passwordRef.current.value))
    }

    //te manda al path "/" una vez terminas de upgradear el perfil
    Promise.all(promises)
      .then(() => {
        history.push("/")
      })
      .catch(() => {
        //mensaje de error
        setError("Algo salió mal")
      })
      //termina el loading
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Actualizar Perfil</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                ref={passwordRef}
                placeholder="Deje en blanco para mantener"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                placeholder="Deje en blanco para mantener"
              />
            </Form.Group>
            <Button disabled={loading} className="w-100" type="submit">
              Actualizar
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        <Link to="/">Cancelar</Link>
      </div>
    </>
  )
}
