import React from 'react'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-reactjs'
import { client, linkResolver } from '../../prismic-configuration.js'

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
        <React.Fragment>
          {
            article ? (
              <div>
                <h1>{RichText.asText(article.data.title)}</h1>
                <img alt='cover' src={article.data.image.url} />
                <RichText render={article.data.description} linkResolver={linkResolver}/>
              </div>
            ) : <div>No content</div>
          }
        </React.Fragment>
      ))
    )
  }

  return (
    <>
      {renderArticles()}
    </>
  )
}
