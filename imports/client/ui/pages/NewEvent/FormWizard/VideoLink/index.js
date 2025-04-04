import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FormGroup, Input, Label } from 'reactstrap'
import { videoHosts } from '/imports/both/collections/events/helpers'

import './styles.scss'
import i18n from '/imports/both/i18n/en'

let labels = i18n.NewEventModal

class VideoLink extends Component {
  constructor (props) {
    super(props)
    this.state = {
      host: '',
      address: '',
      open: false
    }
  }

  render () {
    const { form, name } = this.props
    const formData = form.getModel()
    const videoData = formData.video || {}
    const currentLink = videoData[name.split('.')[1]] || {}

    return (
      <div className='video'>
        <FormGroup>
          <Label for={`${name}.host`}>Video Host</Label>
          <Input
            type="select"
            name={`${name}.host`}
            id={`${name}.host`}
            value={currentLink.host || ''}
            onChange={(e) => {
              form.change(`${name}.host`, e.target.value)
              this.selectHost(e.target.value)
            }}
          >
            <option value="">Select a host</option>
            {videoHosts.map((host, index) => (
              <option key={index} value={host.host}>{host.name}</option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for={`${name}.address`}>Video URL</Label>
          <Input
            type="text"
            className="videoAddress"
            name={`${name}.address`}
            id={`${name}.address`}
            value={currentLink.address || ''}
            onChange={(e) => form.change(`${name}.address`, e.target.value)}
            placeholder={labels.video.address}
          />
        </FormGroup>
      </div>
    )
  }

  selectHost = (value) => {
    const videoHostPrefix = value.length > 0 ? videoHosts.find(e => e.host === value).prefix : ''
    this.setState({
      host: value,
      address: videoHostPrefix
    })
  }

  fetchVideoURL = (id, form) => {
    const link = id === 1 ? form.getModel().video.link1
      : id === 2 ? form.getModel().video.link2
        : form.getModel().video.link3
    if (link === undefined) {
      return ''
    }
    if (videoHosts.find(e => e.host === link.host.value) === undefined) {
      return ''
    }
    return videoHosts.find(e => e.host === link.host.value).prefix
  }

  handleChange = (value) => {
    this.setState({ address: value })
  }
}

VideoLink.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  linkId: PropTypes.number
}

export default VideoLink
