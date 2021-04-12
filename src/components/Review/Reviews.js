import React from 'react'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-reactjs'
import { client, linkResolver } from '../../prismic-configuration.js'

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
        <React.Fragment>
          {
            review ? (
              <div>
                <h1>{RichText.asText(review.data.title)}</h1>
                <img alt='cover' src={review.data.image.url} />
                <RichText render={review.data.description} linkResolver={linkResolver}/>
              </div>
            ) : <div>No content</div>
          }
        </React.Fragment>
      ))
    )
  }

  return (
    <>
      {renderReviews()}
    </>
  )
}
