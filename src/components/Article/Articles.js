import React from 'react'
import Prismic from '@prismicio/client'
import { RichText, Date } from 'prismic-reactjs'
import { client } from '../../prismic-configuration.js'
import CardDeck from 'react-bootstrap/CardDeck'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

export default function Articles() {
  const [articles, setArticles] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await client.query(
        Prismic.Predicates.at('document.type', 'article')
      )
      if (response) {
        setArticles(response.results)
      }
    }
    fetchData()
  }, [])

  const renderArticles = () => {
    return (
      articles.map(article => (
        <Card key={article.uid}>
          <Link to={`news/${article.uid}`}>
            <Card.Img variant="top" src={article.data.image.url}/>
            <Card.Body>
              <Card.Title>{RichText.asText(article.data.headline)}</Card.Title>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">{Date(article.data.date).toString()}</small>
            </Card.Footer>
          </Link>
        </Card>
      ))
    )
  }

  return (
    <>
      <CardDeck>
        {renderArticles()}
      </CardDeck>
    </>
  )
}
