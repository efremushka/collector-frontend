import React from "react"
import { useNavigate, Navigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"

import TextField from "@mui/material/TextField"
import Paper from "@mui/material/Paper"
import Button from "@mui/material/Button"
import SendIcon from "@mui/icons-material/Send"
import CloseIcon from "@mui/icons-material/Close"
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto"

import { selectIsAuth } from "../../redux/slices/auth"
import axios from "../../axios"

import styles from "./AddCollection.module.scss"



export const AddCollection = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const isAuth = useSelector(selectIsAuth)
  const [isLoading, setLoading] = React.useState(false)
  const [title, setTitle] = React.useState("")
  const [description, setDescription] = React.useState("")
  const [topic, setTopic] = React.useState("")
  const [tags, setTags] = React.useState("")
  const [imageUrl, setImageUrl] = React.useState("")


  const inputFileRef = React.useRef(null)

  const isEditing = Boolean(id)


  const handleChangeFile = async (event) => {
    try {
      const formData = new FormData()
      const file = event.target.files[0]
      formData.append("image", file)
      const { data } = await axios.post("/upload", formData)
      setImageUrl(data.url)
    } catch (err) {
      console.warn(err)
      alert("Ошибка при загрузке файла")
    }
  }

  const onClickRemoveImage = () => {
    setImageUrl("")
  }

  const onSubmit = async () => {
    try {
      setLoading(true)

      const fields = {
        title,
        imageUrl,
        description,
        topic,
        tags,
      }
      const { data } = isEditing ? await axios.patch(`/collections/${id}`, fields) : await axios.post("/collections", fields)

      const _id = isEditing ? id : data._id

      navigate(`/collections/${_id}`)
    } catch (err) {
      console.warn(err)
      alert("Ошибка при создании коллекции")
    }
  }



  React.useEffect(() => {
    if (id) {
      axios
        .get(`/collections/${id}`)
        .then(({ data }) => {
          setTitle(data.title)
          setDescription(data.description)
          setImageUrl(data.imageUrl)
          setTopic(data.topic)
          setTags(data.tags.join(","))
        })
        .catch((err) => {
          console.warn(err)
          alert("Ошибка при получении коллекции")
        })
    }
  }, [])

  if (!isAuth) {
    return <Navigate to="/" />
  }

  return (
    <Paper style={{ padding: 20 }}>
      <Button onClick={() => inputFileRef.current.click()} size="small" variant="outlined" endIcon={<InsertPhotoIcon />}>
        Загрузить изображение
      </Button>
      <input ref={inputFileRef} type="file" onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
          <Button variant="contained" color="error" size="small" onClick={onClickRemoveImage}>
            Удалить
          </Button>
          <img className={styles.image} src={`${process.env.REACT_APP_API_URL}${imageUrl}`} alt="Uploaded" />
        </>
      )}
      <TextField
        classes={{ root: styles.title }}
        variant="standard"
        placeholder="Название коллекции"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.description }}
        variant="standard"
        placeholder="Описание коллекции ( от 5 до 200 символов)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.topic }}
        variant="standard"
        placeholder="Тема коллекции (Доступные темы: books, films, sings, games)"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        fullWidth
      />
      <TextField
        classes={{ root: styles.tags }}
        variant="standard"
        placeholder="Тэги"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        fullWidth
      />
      <div className={styles.buttons}>
        <Button onClick={onSubmit} size="large" variant="contained" endIcon={<SendIcon />}>
          {isEditing ? "Сохранить" : "Отправить"}
        </Button>
        <a href="/">
          <Button size="large" variant="contained" color="error" endIcon={<CloseIcon />}>Отмена</Button>
        </a>
      </div>
    </Paper>
  )
}