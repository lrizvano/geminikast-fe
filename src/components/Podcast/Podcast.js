import React from 'react'
import Prismic from '@prismicio/client'
import { RichText } from 'prismic-reactjs'
import { client } from '../../prismic-configuration.js'
import Carousel from 'react-bootstrap/Carousel'

export default function Podcast() {
  const [docs, setDocs] = React.useState([])

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await client.query(
        Prismic.Predicates.any('document.type', ['article', 'review'])
      )
      if (response) {
        setDocs(response.results)
      }
    }
    fetchData()
  }, [])

  const renderDocs = () => {
    return (
      docs.map(doc => (
        <Carousel.Item key={doc.uid}>
          <img
            className="d-block w-100"
            src={doc.data.image.url}
            alt=""
          />
          <Carousel.Caption>
            <h3>{doc.type === 'article' ? RichText.asText(doc.data.headline) : RichText.asText(doc.data.game)}</h3>
            <p>{RichText.asText(doc.type)}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))
    )
  }

  return (
    <>
      <Carousel>
        {renderDocs()}
      </Carousel>

      <iframe title="podcast" src="https://open.spotify.com/embed-podcast/show/77QfKMGg067YXiJnb1Ic3q" width="100%" height="232" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>
    </>
  )
}
