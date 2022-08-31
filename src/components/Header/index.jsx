import React from "react"
import { Link } from "react-router-dom"
import Button from "@mui/material/Button"
import styles from "./Header.module.scss"
import Container from "@mui/material/Container"
import { useSelector, useDispatch } from "react-redux"
import { logout, selectIsAuth } from "../../redux/slices/auth"



export const Header = () => {
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
          </div>
        </div>
      </Container>
    </div>
  )
}
