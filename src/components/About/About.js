import React from 'react'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-reactjs'
import { client, linkResolver } from '../../prismic-configuration.js'

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
        <React.Fragment>
          {
            author ? (
              <div>
                <h1>{RichText.asText(author.data.title)}</h1>
                <img alt='cover' src={author.data.image.url} />
                <RichText render={author.data.description} linkResolver={linkResolver}/>
              </div>
            ) : <div>No content</div>
          }
        </React.Fragment>
      ))
    )
  }

  return (
    <>
      {renderAuthors()}
    </>
  )
}
