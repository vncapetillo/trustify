import React, { useState, useRef, useEffect } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import { auth, firestore } from "../firebase"
import { CardBody, Table } from 'reactstrap';

export default function DashboardAcreditador() {
  const [error, setError] = useState("")
  const [name, setName] = useState("")
  const [open, setOpen] = useState(false)
  const [noticias, setNoticias] = useState([{}])
  const [profesion, setProfesion] = useState("")
  const { currentUser, logout, postPuntuacion } = useAuth()
  const history = useHistory()
  const puntuacionRef = useRef()

  async function getDataofAcreditador() {
    firestore.collection("acreditadores").doc(`${currentUser.uid}`).get().then((userSnap) => {
      setName(userSnap.data().name)
      setProfesion(userSnap.data().profesion)
    })
  }

  async function getNoticias() {
    setNoticias([])
    const coll = firestore.collection("posts");
    const data = await coll.where('area_conocimiento', '==', profesion).get();
    for (let i = 0; i < data.docs.length; i++) {
      const item = data.docs[i];
      var aux_obj = {}
      aux_obj = item.data()
      setNoticias(current => [...current, aux_obj] )
    }
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
      await postPuntuacion()
      history.push("/acreditador")
    } catch(e) {
      setError(e)
    }
  }

  getDataofAcreditador()

  return (
    <>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
        <h2 className="text-center mb-4">Hola  {name}</h2>
      </div>
      <h2 className="mb-2">
        Historias relacionadas con tu conocimiento:
      </h2>
      <div className="w-100 text-center">
        <Button variant="" className="btn btn-primary mb-2 center" onClick={getNoticias}>
          Actualizar
        </Button>
      </div>
      <Table responsive hover>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Noticia</th>
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
                <td width="500">
                  <div>
                      {noticia.texto}
                  </div>
                </td>
                <td key={noticia.area_conocimiento}>
                  {noticia.area_conocimiento}
                </td>
                <td key={noticia.puntuacion}>
                  <select class="custom-select w-50 my-1 mr-sm-2" id="" ref={puntuacionRef}>
                    <option selected>Escoger...</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                  <Button type="submit">
                    Ingresar
                  </Button>
                </td>
              </tr>
            </>
          ))}
        </tbody>
      </Table>
    </>
  )
}