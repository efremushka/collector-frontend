import React from "react"
import { useParams } from "react-router-dom"

import { Collection } from "../components/Collection"
import axios from "../axios"

export const FullCollection = () => {
  const [data, setData] = React.useState()
  const [isLoading, setLoading] = React.useState(true)

  const { id } = useParams()

  React.useEffect(() => {
    axios
      .get(`/collections/${id}`)
      .then((res) => {
        setData(res.data)
        setLoading(false)
      })
      .catch((err) => {
        console.warn(err)
        alert("Ошибка при получении коллекции")
      })
  }, [])


  if (isLoading) {
    return <Collection isLoading={isLoading} isFullCollection />
  }


  return (
    <>
      <Collection
        id={data._id}
        title={data.title}
        topic={data.topic}
        imageUrl={data.imageUrl ? `${process.env.REACT_APP_API_URL}${data.imageUrl}` : ""}
        description={data.description}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={0}
        likesCount={0}
        tags={data.tags}
        isFullCollection
      >
      </Collection>
    </>
  )
}