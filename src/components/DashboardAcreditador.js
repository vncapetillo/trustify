import React, { useState } from "react"
import { Button } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { useHistory } from "react-router-dom"
import { firestore } from "../firebase"
import { Table } from 'reactstrap';


export default function DashboardAcreditador() {
  const [error, setError] = useState("")
  const [name, setName] = useState("")
  const [noticias, setNoticias] = useState([])
  const [noticiasUID, setNoticiasUID] = useState([])
  const [profesion, setProfesion] = useState("")
  const [puntuacion, setPuntuacion] = useState(0)
  const { currentUser, logout, postPuntuacion } = useAuth()
  const history = useHistory()


  async function getDataofAcreditador() { 
    console.log(currentUser.uid)
    let data = await firestore.collection("acreditadores").doc(`${currentUser.uid}`).get()  
    test(data)
  }

  function test(obj) {
    setName(obj.data().name)
    setProfesion(obj.data().profesion)
  }

  async function getNoticias() {
    setNoticias([])
    setNoticiasUID([])

    console.log(noticias, ", ", noticiasUID)

    const coll = firestore.collection("posts");
    const data = await coll.where('area_conocimiento', '==', profesion).get();
    for (let i = 0; i < data.docs.length; i++) {
      const item = data.docs[i];
      setNoticias(noticias => [
        ...noticias,
        item.data()
      ])
      setNoticiasUID(noticiasUID => [
        ...noticiasUID,
        item.id
      ])
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
    //e.preventDefault()
    var iidNoticia = e.target.value
    
    try {
      console.log("idNoticia: ", iidNoticia, ", UID: ", noticiasUID[iidNoticia], "puntuacion: ", puntuacion)
      setError("")
      await postPuntuacion(noticiasUID[iidNoticia], puntuacion)
      history.push("/acreditador")
    } catch(e) {
      setError(e)
    }
  }

  const handleSelect = (e) => {
    setPuntuacion(e.target.value)
  }

  const handleUp = () => {
    getDataofAcreditador();
    getNoticias()
  }

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
        <Button variant="" className="btn btn-primary mb-2 center" onClick={handleUp}>
          Actualizar
        </Button>
      </div>
      <Table responsive hover>
        <thead>
          <tr>
            <th>id</th>
            <th>Titulo</th>
            <th>Fecha</th>
            <th>Noticia</th>
            <th>Area de Conocimiento</th>
            <th>Puntuacion</th>
          </tr>
        </thead>
        <tbody>
          {noticias.map((noticia, index) => (
            <>
              <tr>                  
                <td>  
                  {index+1}
                </td>
                <td key={noticia.titulo}>
                  {noticia.titulo}
                </td>
                <td>
                  {noticia.fecha}
                </td>
                <td width="500">
                  <div>
                      {noticia.texto}
                  </div>
                </td>
                <td key={noticia.area_conocimiento}>
                  {noticia.area_conocimiento}
                </td>
                <td key={noticia.titulo}>
                  <select class="custom-select w-50 my-1 mr-sm-2"  key={noticia.titulo} value={puntuacion} onChange={handleSelect}>
                    <option selected>{noticia.puntuacion}</option>
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
                  <Button type="submit" value={index} onClick={handleSubmit}>
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