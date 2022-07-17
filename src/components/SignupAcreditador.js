import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"

export default function SignupAcreditador() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const nameRef = useRef()
  const lastnameRef = useRef()
  const professionRef = useRef()
  const { signup, addCreditorToCollection } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("No coinciden las contraseñas")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      await addCreditorToCollection(emailRef.current.value, nameRef.current.value, lastnameRef.current.value, professionRef.current.value)
      history.push("/acreditador")
    } catch(e) {
      //setError("Failed to create an account")
      setError(e)
    }
    setLoading(false)
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up Acreditador</h2>
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
            <div className="form-group">
              <div className="form-group">
                <label>Area de conocimiento</label>
                <select className="form-control" id="areaC" ref={professionRef}>
                  <option>Ingenieria</option>
                  <option>Salud</option>
                  <option>Politica</option>
                  <option>Tecnologia</option>
                  <option>Guerra</option>
                </select>
              </div>
            </div>
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
        Ya tienes cuenta? <Link to="/login-acreditador">Log In</Link>
      </div>
    </>
  )
}
