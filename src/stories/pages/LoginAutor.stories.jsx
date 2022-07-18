// Button.stories.js|ts|jsx|tsx

import "bootstrap/dist/css/bootstrap.min.css"
import React, { useRef, useState } from "react"
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { LoginAutor } from './LoginAutor';
import {MemoryRouter} from 'react-router-dom';


export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Pages/LoginAutor',
  component: LoginAutor,
  loader: 'css-loader',

};

/*
 * Example Button story with React Hooks.
 * See note below related to this example.
 */


export const FullPage = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = "login"
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
  
    async function handleSubmit(e) {
      e.preventDefault()
  
      try {
        setError("")
        setLoading(true)
        await login(emailRef.current.value, passwordRef.current.value)
        history.push("/autor/")
      } catch(e) {
        //setError(e)
        setError("Failed to log in")
      }

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
          <MemoryRouter>
            <Link to="/forgot-password">Se te olvidó la contraseña?</Link>
        </MemoryRouter>
          </div>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Necesitas cuenta de escritor? 
        <MemoryRouter>
        <Link to="/signup-autor"> Sign Up Aquí</Link>
        </MemoryRouter>

      </div>
      <div className="w-100 text-center mt-2">
        O quizá como acreditador? 
        <MemoryRouter>

        <Link to="/signup-acreditador"> X acá el SignUp</Link>
        </MemoryRouter>

      </div>
    </>
)}

export const FullPageTest = () => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = "login"
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
  
    async function handleSubmit(e) {
      e.preventDefault()
  
      try {
        setError("")
        setLoading(true)
        await login(emailRef.current.value, passwordRef.current.value)
        history.push("/autor/")
      } catch(e) {
        //setError(e)
        setError("Failed to log in")
      }

      setLoading(false)
    }

return (
    <div class="card text-center">
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
          <Button>Se te olvidó la contraseña?</Button>
        </div>
      </Card.Body>
    </Card>
    <div className="w-100 text-center mt-2">
      Necesitas cuenta de escritor? <Button>Sign Up Aquí</Button>
    </div>
    <div className="w-100 text-center mt-2">
      O quizá como acreditador? <Button>X acá el SignUp</Button>
    </div>
  </div>
)}