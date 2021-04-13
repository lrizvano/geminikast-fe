import React from 'react'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-reactjs'
import { client, linkResolver } from '../../prismic-configuration.js'
import CardDeck from 'react-bootstrap/CardDeck'
import Card from 'react-bootstrap/Card'

export default function About() {
  const [authors, setAuthors] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await client.query(
        Prismic.Predicates.at('document.type', 'author')
      )
      if (response) {
        setAuthors(response.results)
      }
    }
    fetchData()
  }, [])

  const renderAuthors = () => {
    return (
      authors.map(author => (
        <Card>
          <Card.Img variant="top" src={author.data.image.url}/>
          <Card.Body>
            <Card.Title>{RichText.asText(author.data.name)}</Card.Title>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">{RichText.asText(author.data.role)}</small>
          </Card.Footer>
        </Card>
      ))
    )
  }

  return (
    <>
      <CardDeck>
        {renderAuthors()}
      </CardDeck>
    </>
  )
}
