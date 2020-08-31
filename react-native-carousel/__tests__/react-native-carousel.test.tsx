/**
 * @jest-environment jsdom
 */

import React from 'react'
import { shallow, mount } from 'enzyme'
import { RNCarousel } from '../dist'

const three = () => 3

const setup = (props = {sources: []}) => {
  const wrapper = shallow(<RNCarousel {...props} />)
  return wrapper
}

describe('RNCarousel renders correctly.', () => {
  let shallowWrapper
  it('RNCarousel container view renders correctly.', () => {
    shallowWrapper = setup()
    const rnCarousel = shallowWrapper.find({ testID: 'RNCarousel' })

    expect(rnCarousel.html()).toMatchSnapshot()
  })
})

test('3 is equal to 3', () => {
  expect(three()).toBe(3);
})
