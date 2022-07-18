import React from "react"
import { Card } from "react-bootstrap"
import { Link } from "react-router-dom"

export default function Welcome() {

  return (
    <div>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Welcome to <strong>TRUSTIFY!</strong></h2>
          <iframe src="https://giphy.com/embed/11sBLVxNs7v6WA" className="w-100"></iframe>
          <Link to="/login-acreditador" className="btn btn-primary center w-100 mt-3">
            Login Acreditador
          </Link>
          <Link to="/login-autor" className="btn btn-primary center w-100 mt-3">
            Login Autor
          </Link>
        </Card.Body>
      </Card>
    </div>
  )
}



