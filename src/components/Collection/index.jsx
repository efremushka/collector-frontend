import React from "react"
import { Link } from "react-router-dom"
import clsx from "clsx"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Clear"
import EditIcon from "@mui/icons-material/Edit"
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined"
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined"
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useDispatch } from "react-redux"

import styles from "./Collection.module.scss"
import { UserInfo } from "../UserInfo"
import { CollectionSkeleton } from "./Skeleton"
import { fetchRemoveCollection } from "../../redux/slices/collections"

export const Collection = ({
  id,
  topic,
  title,
  description,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  likesCount,
  commentsCount,
  tags,
  children,
  isFullCollection,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch()
  if (isLoading) {
    return <CollectionSkeleton />
  }

  const onClickRemove = () => {
    if (window.confirm("Вы уверены, что хотите удалить коллекцию?")) {
    dispatch(fetchRemoveCollection(id))
  }
}
  

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullCollection })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/collections/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {imageUrl && (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullCollection })}
          src={imageUrl}
          alt={title}
        />
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={createdAt} />
        <div className={styles.indention}>
          <h1>{`Тема: ${topic}`}</h1>
          <h2 className={clsx(styles.title, { [styles.titleFull]: isFullCollection })}>
            {isFullCollection ? title : <Link to={`/collections/${id}`}>{title}</Link>}
          </h2>
          <span>{description}</span>
          <ul className={styles.tags}>
            {tags.map((name) => (
              <li key={name}>
                <Link to={`/tag/${name}`}>#{name}</Link>
              </li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}
          <ul className={styles.collectionDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>
            <li>
            <FavoriteIcon />
              <span>{likesCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
