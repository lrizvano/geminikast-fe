import React from 'react'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-reactjs'
import { client } from '../../prismic-configuration.js'
import CardDeck from 'react-bootstrap/CardDeck'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

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
        <Card key={review.uid}>
          <Link to={`reviews/${review.uid}`}>
            <Card.Img variant="top" src={review.data.image.url}/>
            <Card.Body>
              <Card.Title>{RichText.asText(review.data.game)}</Card.Title>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">{review.data.score}</small>
            </Card.Footer>
          </Link>
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
