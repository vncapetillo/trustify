import firebase from "firebase"
import React, { useContext, useState, useEffect } from "react"
import { auth, firestore } from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  function signup(email, password) {
    const user = auth.createUserWithEmailAndPassword(email, password)
    return user
  }

  function addUserToCollection(email, name, lastname) {
    const userr = auth.currentUser
    firestore.collection("users").doc(`${userr.uid}`).set({
      name: name,
      lastname: lastname,
      email: email
    })
  }

  function addCreditorToCollection(email, name, lastname, profesion) {
    const userr = auth.currentUser
    firestore.collection("acreditadores").doc(`${userr.uid}`).set({
      name: name,
      lastname: lastname,
      email: email,
      profesion: profesion
    })
  }

  function postPuntuacion(idNoticia, _puntuacion){
    firestore.collection("posts").doc(idNoticia).update({
      puntuacion: _puntuacion,
    })
  }

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

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

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

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
