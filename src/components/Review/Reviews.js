import React from 'react'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-reactjs'
import { client, linkResolver } from '../../prismic-configuration.js'
import CardDeck from 'react-bootstrap/CardDeck'
import Card from 'react-bootstrap/Card'

export default function Reviews() {
  const [reviews, setReviews] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await client.query(
        Prismic.Predicates.at('document.type', 'review')
      )
      if (response) {
        setReviews(response.results)
      }
    }
    fetchData()
  }, [])

  const renderReviews = () => {
    return (
      reviews.map(review => (
        <Card>
          <Card.Img variant="top" src={review.data.image.url}/>
          <Card.Body>
            <Card.Title>{RichText.asText(review.data.game)}</Card.Title>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">{review.data.score}</small>
          </Card.Footer>
        </Card>
      ))
    )
  }

  return (
    <>
      <CardDeck>
        {renderReviews()}
      </CardDeck>
    </>
  )
}
