import React from 'react'
import { useParams } from 'react-router-dom'

export default function SingleProject() {
  const {projectId} = useParams()
  return (
    <div>SingleProject {projectId}</div>
  )
}
