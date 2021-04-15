import React from 'react'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-reactjs'
import { client } from '../../prismic-configuration.js'
import Card from 'react-bootstrap/Card'

export default function Review(props) {
  const [review, setReview] = React.useState(null)

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await client.query(
        Prismic.Predicates.at("my.review.uid", `${props.match.params.uid}`),
        { lang : '*' }
      )
      if (response) {
        setReview(response.results[0])
      }
    }
    fetchData()
  }, [])

  const renderReview = () => {
    if (review) {
      return (
        <Card bg="primary">
          <Card.Img variant="top" src={review.data.image.url}/>
          <Card.Body>
            <Card.Title>{RichText.asText(review.data.game)}</Card.Title>
            <Card.Text>{RichText.asText(review.data.body)}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">{review.data.score}</small>
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
      {renderReview()}
    </>
  )
}
