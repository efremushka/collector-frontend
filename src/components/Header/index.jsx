import React from "react"
import { Link } from "react-router-dom"
import Button from "@mui/material/Button"
import styles from "./Header.module.scss"
import Container from "@mui/material/Container"
import { useSelector, useDispatch } from "react-redux"
import { logout, selectIsAuth } from "../../redux/slices/auth"
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';



export const Header = (props) => {
  const {colorMode, theme} = props;
  const dispatch = useDispatch()
  const isAuth = useSelector(selectIsAuth)

  const onClickLogout = () => {
    if (window.confirm("Вы уверены, что хотите выйти?")) {
      dispatch(logout())
      window.localStorage.removeItem("token")
    }
  }



  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>COLLECTOR</div>
          </Link>


          <div className={styles.buttons}>
            {isAuth ? (
              <>
                 <Link to="/main-page">
                  <Button
                    variant="contained">Моя страница
                  </Button>
                </Link>
                <Link to="/add-collection">
                  <Button
                    variant="contained">Создать новую коллекцию
                  </Button>
                </Link>
                <Button
                  onClick={onClickLogout}
                  variant="contained"
                  color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    variant="contained">Войти
                  </Button>
                </Link>
                <Link to="/registration">
                  <Button
                    variant="contained">Зарегистрироваться
                  </Button>
                </Link>
              </>
            )}
             <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
          </div>
        </div>
      </Container>
    </div>
  )
}
