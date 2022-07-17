import React from "react"
import { Container } from "react-bootstrap"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import SignupAutor from "./SignupAutor"
import SignupAcreditador from "./SignupAcreditador"
import LoginAutor from "./LoginAutor"
import LoginAcreditador from "./LoginAcreditador"
import DashboardAutor from "./DashboardAutor"
import DashboardAcreditador from "./DashboardAcreditador"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import UpdateProfile from "./UpdateProfile"
import Welcome from "./Welcome"

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/autor/" component={DashboardAutor} />
          <PrivateRoute exact path="/acreditador/" component={DashboardAcreditador} />
          <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <PrivateRoute path="/update-profile" component={UpdateProfile} />
            <Route path="/forgot-password" component={ForgotPassword} />
            <Route path="/signup-autor" component={SignupAutor} />
            <Route path="/signup-acreditador" component={SignupAcreditador} />
            <Route path="/login-autor" component={LoginAutor} />
            <Route path="/login-acreditador" component={LoginAcreditador} />
            <Route exact path="/" component={Welcome} />
          </div>
          </Container>
        </Switch>
      </AuthProvider>
    </Router>
  )
}

export default App
