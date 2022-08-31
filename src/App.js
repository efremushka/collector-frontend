import { Routes, Route } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Container from "@mui/material/Container"

import { Header } from "./components"
import { Home, FullCollection, Registration, AddCollection, Login, MainPage } from "./pages"
import React from "react"
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth"

function App() {

  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)


  React.useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])


  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/collections/:id" element={<FullCollection />} />
          <Route path="/collections/:id/edit" element={<AddCollection />} />
          <Route path="/add-collection" element={<AddCollection />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/main-page" element={<MainPage />} />
        </Routes>
      </Container>
    </>
  )
}

export default App