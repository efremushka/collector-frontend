import { Routes, Route } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import Container from "@mui/material/Container"

import { Header } from "./components"
import { Home, FullCollection, Registration, AddCollection, Login, MainPage } from "./pages"
import React from "react"
import { fetchAuthMe, selectIsAuth } from "./redux/slices/auth"

import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Box } from "@mui/material"

function App() {
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)
  const [mode, setMode] = React.useState('light');
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );
  React.useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );
  return (
    <ThemeProvider theme={theme}>
      <Box sx={{
        bgcolor: 'background.default',
        color: 'text.primary',
        minHeight: '100vh'
      }}>
        <Header colorMode={colorMode} theme={theme}/>
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
      </Box>
    </ThemeProvider>
  )
}

export default App