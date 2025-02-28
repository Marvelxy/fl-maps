import React from 'react'
import { Container, Row, Col } from 'reactstrap'
import i18n from '/imports/both/i18n/en/'
import '././style.scss'

const { title, content } = i18n.Whitepaper.Intro.second_section
const {
  first,
  second,
  third
} = content

const SecondSection = () => (
  <section className='second-section'>
    <Container>
      <Row>
        <Col md={12}>
          <h2 className='title'>{title}</h2>
          <div className="text-content">
            <p>{first}</p>
            <p>{second}</p>
            <p>{third}</p>
          </div>
        </Col>
      </Row>
    </Container>
  </section>
)

export default SecondSection
