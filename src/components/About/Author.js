import React from 'react'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-reactjs'
import { client } from '../../prismic-configuration.js'
import Card from 'react-bootstrap/Card'

export default function Author(props) {
  const [author, setAuthor] = React.useState(null)

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await client.query(
        Prismic.Predicates.at("my.author.uid", `${props.match.params.uid}`),
        { lang : '*' }
      )
      if (response) {
        setAuthor(response.results[0])
      }
    }
    fetchData()
  }, [])

  const renderAuthor = () => {
    if (author) {
      return (
        <Card bg="primary">
          <Card.Img variant="top" src={author.data.image.url}/>
          <Card.Body>
            <Card.Title>{RichText.asText(author.data.name)}</Card.Title>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">{RichText.asText(author.data.role)}</small>
          </Card.Footer>
        </Card>
      )
    }
    return (
      <>
      </>
    )
  }

  return (
    <>
      {renderAuthor()}
    </>
  )
}
