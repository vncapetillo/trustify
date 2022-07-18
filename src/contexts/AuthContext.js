import React, { useContext, useState, useEffect } from "react"
import { auth, firestore } from "../firebase"

// se crea el context del hook
const AuthContext = React.createContext()
export function useAuth() {
  return useContext(AuthContext)
}

// 
export function AuthProvider({ children }) {
  //se setea el usuario actual
  const [currentUser, setCurrentUser] = useState()
  // comienza a cargar data
  const [loading, setLoading] = useState(true)

  // se crea el usuario segun los datos provistos
  function signup(email, password) {
    const user = auth.createUserWithEmailAndPassword(email, password)
    return user
  }
  //se agrega a la coleccion de la BD de firebase el usuario normal
  function addUserToCollection(email, name, lastname) {
    const userr = auth.currentUser
    firestore.collection("users").doc(`${userr.uid}`).set({
      name: name,
      lastname: lastname,
      email: email
    })
  }
  //se agrega a la BD los datos del acreditador si este se inscribe
  function addCreditorToCollection(email, name, lastname, profesion) {
    const userr = auth.currentUser
    firestore.collection("acreditadores").doc(`${userr.uid}`).set({
      name: name,
      lastname: lastname,
      email: email,
      profesion: profesion
    })
  }

  //actualiza la informacion de la puntuacion del post de firebase
  function postPuntuacion(idNoticia, _puntuacion){
    firestore.collection("posts").doc(idNoticia).update({
      puntuacion: _puntuacion,
    })
  }

  //se agrega el post a la BD de firebase con datos especificos
  //provistos por el usuario que cree la noticia
  function uploadPost(email, titulo, noticia, area_conocimiento) {
    let today = new Date()
    let date = today.getDate() + "/" + parseInt(today.getMonth()+1) + "/" + today.getFullYear()
    firestore.collection("posts").add({
      autor: email,
      fecha: date.toString(),
      titulo: titulo,
      texto: noticia,
      area_conocimiento: area_conocimiento
    })
  }

  //autenticacion del usuario segun un email y password
  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  //desloguearse
  function logout() {
    return auth.signOut()
  }

  //reset password
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  //update correo
  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  //update de password
  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  //cambia estado del usuario a desincrito
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  //valores de context
  const value = {
    currentUser,
    login,
    signup,
    addUserToCollection,
    addCreditorToCollection,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    uploadPost,
    postPuntuacion
  }

  //retorno
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
