import React, { useState, useRef, useEffect } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { auth, firestore } from "../firebase"
import { Table } from 'reactstrap';

export default function DashboardAutor() {
  const [error, setError] = useState("")
  const [name, setName] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [noticias, setNoticias] = useState([{}])
  const { currentUser, logout, uploadPost } = useAuth()
  const history = useHistory()
  const noticiaRef = useRef()
  const tituloRef = useRef()
  const areaRef = useRef()

  async function getDataofUser() {
    firestore.collection("users").doc(`${currentUser.uid}`).get().then((userSnap) => {
      setName(userSnap.data().name)
      setLastname(userSnap.data().lastname)
      setEmail(userSnap.data().email)
    })
  }
  
  async function getNoticias() {
    console.log("LOOOOOOP")
    setNoticias([{}])
    const coll = firestore.collection("posts");
    const data = await coll.where('autor', '==', email).get();
    for (let i = 0; i <= data.docs.length; i++) {
      const item = data.docs[i];
      var aux_obj = {}
      aux_obj = item.data()
      setNoticias(current => [...current, aux_obj] )
    }
    //console.log(this.noticias)
  }

  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/")
    } catch {
      setError("Failed to log out")
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await uploadPost(email, name, lastname, tituloRef.current.value, noticiaRef.current.value, areaRef.current.value)
      await getNoticias()
      history.push("/autor/")
    } catch(e) {
      setError(e)
    }
    setLoading(false)
  }

  getDataofUser()

  return (
    <>
      <div className="row">
        <div className="col-xs-10 col-sm-3">
          <Card>
            <Card.Body>
              <div className="w-100 text-center mt-2">
                <Button variant="link" onClick={handleLogout}>
                  Log Out
                </Button>
              </div>
              <h2 className="text-center mb-4">Hola  {name}</h2>
              {/* {error && <Alert variant="danger">{error}</Alert>} */}
              <strong>Datos:</strong><br />
              Nombre: {name} {lastname}<br />
              Email: {email}
              <Link to="/update-profile" className="btn btn-primary center w-100 mt-3">
                Actualizar perfil
              </Link>
              <div className="w-100 text-center mt-2 mb-2">
                <Button variant="link" onClick={handleLogout}>
                  Log Out
                </Button>
              </div>
              <strong className="">Nueva noticia:</strong>
              <div className="form-group">
                <input placeholder="Titulo" className="form-control mt-2 mb-3" id="titulo" ref={tituloRef}></input>
                <div className="form-group">
                  <label>Area de conocimiento</label>
                  <select className="form-control" id="areaC" ref={areaRef}>
                    <option>Ingenieria</option>
                    <option>Salud</option>
                    <option>Politica</option>
                    <option>Tecnologia</option>
                    <option>Guerra</option>
                  </select>
                </div>
                <textarea className="form-control" rows="10" id="noticia" ref={noticiaRef}></textarea>
              </div>
              <Button disabled={loading} className="w-100" type="submit" onClick={handleSubmit}>
                Subir noticia
              </Button>
            </Card.Body>
          </Card>
        </div>
        <div className="col-xs-10 col-sm-7">
          <h2 className="text-center mb-4">Tus historias</h2>
          <Table responsive hover>
            <thead>
              <tr>
                <th>Titulo</th>
                <th>Fecha</th>
                <th>Area de Conocimiento</th>
                <th>Puntuacion</th>
              </tr>
            </thead>
            <tbody>
              {noticias.map((noticia) => (
                <>
                  <tr>
                    <td key={noticia.titulo}>
                      {noticia.titulo}
                    </td>
                    <td>
                      {/* {new Date(noticia.fecha).toLocaleDateString("en-US")} */}
                      {/* {console.log(noticia.fecha)} */}
                    </td>
                    <td key={noticia.area_conocimiento}>
                      {noticia.area_conocimiento}
                    </td>
                    <td key={noticia.puntuacion}>
                      {noticia.puntuacion}
                    </td>
                  </tr>
                </>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    </>
  )
}