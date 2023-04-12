import React from 'react'
import { shallow } from 'enzyme'
import HoursFormatted from '../HoursFormatted'
import { formatDateWithWords } from '/imports/client/utils/format'

describe.only('<HoursFormatted />', () => {
  const constantDate = new Date('2018-01-01T12:00:00')

  beforeAll(() => {
    global.Date = class extends Date {
      constructor () {
        super()
        return constantDate
      }
    }
  })

  afterAll(() => {
    global.Date = Date
  })

  const obj = {
    startingDate: new Date(),
    endingDate: new Date(),
    startingTime: '16:00',
    endingTime: '17:00',
    multipleDays: false,
    days: [{
      day: 'Sunday',
      startingTime: '15:00',
      endingTime: '20:00'
    }]
  }

  const shallowRender = (props) => {
    return shallow(
      <HoursFormatted
        data={obj}
        {...props}
      />
    )
  }

  test('if multipleDays', () => {
    const wrapper_ = shallowRender({ data: { ...obj, multipleDays: true } })
    const component = wrapper_.find('.multiple-days')
    const dateText = `${formatDateWithWords(obj.startingDate)} - ${formatDateWithWords(obj.endingDate)}`

    expect(component.exists()).toBe(true)
    expect(component.find('.date').text()).toEqual(dateText)
    expect(component.find('.day').children().at(0).text()).toEqual(obj.days[0].day.substr(0, 3))
    expect(component.find('.day').children().at(1).text()).toEqual(`${obj.days[0].startingTime} - ${obj.days[0].endingTime}`)
  })

  test('repeat=true, type="day", forever=true', () => {
    const wrapper_ = shallowRender({
      data: {
        ...obj,
        repeat: true,
        recurring: {
          every: 5,
          type: 'day',
          forever: true
        }
      }
    })
    const component = wrapper_.find('.repeat')

    expect(component.text()).toEqual('Next:Mon, 2018/01/0116:00 - 17:00Repeating: every 5 days, between 16:00 - 17:00 ')
  })

  test('repeat=true, type="day", forever=false', () => {
    const wrapper_ = shallowRender({
      data: {
        ...obj,
        repeat: true,
        recurring: {
          every: 10,
          type: 'day',
          forever: false,
          repeat: 8,
          until: new Date('02/11/2019')
        }
      }
    })

    const component = wrapper_.find('.repeat')

    expect(component.props().className).toEqual('hours-formatted repeat')
    expect(component.find('.not-forever')).toHaveLength(1)
    expect(component.text()).toEqual('Repeating: every 10 days, between 16:00 - 17:00 until Mon, 2018/01/01')
  })

  test('repeat=true, type="week", forever=true', () => {
    const wrapper_ = shallowRender({
      data: {
        ...obj,
        repeat: true,
        recurring: {
          days: ['Sunday', 'Monday', 'Tuesday', 'Friday'],
          every: 10,
          forever: true,
          type: 'week'
        }
      }
    })

    const component = wrapper_.find('.repeat')

    expect(component.find('.every-sentence')).toHaveLength(1)
    expect(component.text()).toEqual('Next:Mon, 2018/01/0116:00 - 17:00Repeating: every 10 weekson Sun, 16:00 - 17:00on Mon, 16:00 - 17:00on Tue, 16:00 - 17:00on Fri, 16:00 - 17:00')
  })

  test('repeat=true, type="week", forever=false', () => {
    const wrapper_ = shallowRender({
      data: {
        ...obj,
        repeat: true,
        recurring: {
          days: ['Sunday', 'Monday', 'Tuesday', 'Friday'],
          every: 10,
          forever: false,
          type: 'week',
          repeat: 8
        }
      }
    })

    const component = wrapper_.find('.repeat')

    expect(component.find('.every-sentence')).toHaveLength(1)
    expect(component.text()).toEqual('Repeating: every 10 weekson Sun, 16:00 - 17:00on Mon, 16:00 - 17:00on Tue, 16:00 - 17:00on Fri, 16:00 - 17:00')
  })

  test('if regular date', () => {
    const wrapper_ = shallowRender()
    const component = wrapper_.find('.regular-date')
    expect(component.text().substr(5)).toEqual(' 2018/01/01, 16:00 - 17:00')
  })
})
