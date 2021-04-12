import React from 'react';
import logo from '../../geminikast.jpg';
import Prismic from '@prismicio/client';
import { Date, Link, RichText } from 'prismic-reactjs'
import { client, linkResolver } from '../../prismic-configuration.js';

export default function About() {
  const [doc, setDocData] = React.useState(null);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await client.query(
        Prismic.Predicates.at('document.type', 'author')
      );
      if (response) {
        setDocData(response.results[0]);
      }
    }
    fetchData()
  }, []);

  return (
    <React.Fragment>
      {
        doc ? (
          <div>
            <h1>{RichText.asText(doc.data.title)}</h1>
            <img alt='cover' src={doc.data.profile.url} />
            <RichText render={doc.data.description} linkResolver={linkResolver} />
          </div>
        ) : <div>No content</div>
      }
    </React.Fragment>
  )
}
