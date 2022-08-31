import React from "react"
import { useDispatch, useSelector } from "react-redux"
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import Grid from "@mui/material/Grid"

import { Collection } from "../components/Collection"
import { TagsBlock } from "../components/TagsBlock"
import { fetchCollections, fetchTags } from "../redux/slices/collections"
import { InputAdornment, TextField } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';



export const Home = () => {
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.auth.data)
  const { collections, tags } = useSelector((state) => state.collections)

  const isCollectionsLoading = collections.status === "loading"
  const isTagsLoading = tags.status === "loading"


  React.useEffect(() => {
    dispatch(fetchCollections())
    dispatch(fetchTags())
  }, [])

  return (
    <>
      <TextField
        type="text"
        placeholder="Поиск по коллекциям"
        size="small"
        //onClick={}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>

          )
        }}
      />

      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Все коллекции" />
        <Tab label="Новые коллекции" />
      </Tabs>
      <Grid container spacing={3}>
        <Grid xs={7} item>
          {(isCollectionsLoading ? [...Array(5)] : collections.items).map((obj, index) =>
            isCollectionsLoading ? (
              <Collection key={index} isLoading={true} />
            ) : (
              <Collection
                id={obj._id}
                title={obj.title}
                topic={obj.topic}
                description={obj.description}
                imageUrl={obj.imageUrl ? `${process.env.REACT_APP_API_URL}${obj.imageUrl}` : ""}
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={0}
                likesCount={0}
                tags={obj.tags}
                isEditable={userData?._id === obj.user}
              />
            ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
        </Grid>
      </Grid>
    </>
  )
}
