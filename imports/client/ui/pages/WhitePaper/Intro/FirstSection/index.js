import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import i18n from '/imports/both/i18n/en/'
import './style.scss'

const { title, content } = i18n.Whitepaper.Intro.first_section
const {
  first,
  second,
  third,
  youtubeLink
} = content

const FirstSection = () => (
  <section className='first-section'>
    <Container>
      <Row>
        <Col md={6}>
          <h2 className='title'>{title}</h2>
          <div className="text-content">
            <p>{second}</p>
            <p>{third}</p>
          </div>
        </Col>
        <Col md={6} className='attachment-content'>
          <iframe src={youtubeLink} frameBorder="0" allowFullScreen></iframe>
          <p className="quote">{first}</p>
        </Col>
      </Row>
    </Container>
  </section>
)

export default FirstSection
