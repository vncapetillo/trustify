import React, { useState, useRef } from "react"
import { Card, Button } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { firestore } from "../firebase"
import { Table } from 'reactstrap';

export default function DashboardAutor() {
  //setteo del estado de error
  const [error, setError] = useState("")
  //setteo del name y otros atributos del user mostrado en el dashboard
  const [name, setName] = useState("")
  const [lastname, setLastname] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [noticias, setNoticias] = useState([{}])
  //hook personalizado
  const { currentUser, logout, uploadPost } = useAuth()
  const history = useHistory()
  //referecias a noticias
  const noticiaRef = useRef()
  const tituloRef = useRef()
  const areaRef = useRef()

  //funcion que obtiene los datos y atributos del usuario
  async function getDataofUser() {
    firestore.collection("users").doc(`${currentUser.uid}`).get().then((userSnap) => {
      setName(userSnap.data().name)
      setLastname(userSnap.data().lastname)
      setEmail(userSnap.data().email)
    })
  }
  
  //obtiene la data de los post de noticias del usuario autor,
  //teniendo el total de noticias que este haya escrito
  async function getNoticias() {
    setNoticias([])
    const coll = firestore.collection("posts");
    const data = await coll.where('autor', '==', email).get();
    for (let i = 0; i < data.docs.length; i++) {
      const item = data.docs[i];
      var aux_obj = {}
      aux_obj = item.data()
      setNoticias(current => [...current, aux_obj] )
    }
  }

  //logout del usuario
  async function handleLogout() {
    setError("")

    try {
      await logout()
      history.push("/login-autor/")
    } catch {
      setError("Failed to log out")
    }
  }

  //funcion que apretado el boton de subir noticia
  //crea un nuevo post segun informacion provista
  //en el dashboard
  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await uploadPost(email, tituloRef.current.value, noticiaRef.current.value, areaRef.current.value)
      await getNoticias()
      history.push("/autor/")
    } catch(e) {
      setError(e)
    }
    setLoading(false)
  }

  //Se obtiene la informacion para mostrarla en el dashboard
  getDataofUser()

  return (
    <>
      <div className="row">
        <div className="col-xs-10 col-sm-3">
          <Card>
            <Card.Body>
              <div className="w-100 text-center mt-2">
                <Button variant="link" className="mb-2"  onClick={handleLogout}>
                  Log Out
                </Button>
              </div>
              <h2 className="text-center mb-4">Hola  {name}</h2>
              {/* {error && <Alert variant="danger">{error}</Alert>} */}
              <strong>Datos:</strong><br />
              Nombre: {name} {lastname}<br />
              Email: {email}
              <Link to="/update-profile" className="btn btn-primary center w-100 mt-2 mb-2">
                Actualizar perfil
              </Link>
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
          <h2 className="text-center mt-4 mb-2">Tus historias</h2>
          <div className="text-center">
            <Button className="w-40 mb-2" type="submit" onClick={getNoticias}>
              Actualizar listado
            </Button>
          </div>
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
                      {noticia.fecha}
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