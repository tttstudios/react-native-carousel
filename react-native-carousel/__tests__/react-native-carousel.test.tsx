/**
 * @jest-environment jsdom
 */

import React from 'react'
import { shallow, mount } from 'enzyme'
import { RNCarousel } from '../dist'

/*
 * Function for use in sanity check function
 */
const three = () => 3

/*
 * Test assets
 */
const bulbasaur = require("../assets/bulbasaur.png")
const squirtle = require("../assets/squirtle.png")

/*
 * Setup functions
 */
const shallowSetup = (props = {sources: []}) => {
  const wrapper = shallow(<RNCarousel {...props} />)
  return wrapper
}

const fullSetup = (props = {sources: [bulbasaur, squirtle]}) => {
  const wrapper = mount(<RNCarousel {...props}/>)
  return wrapper
}

/*
 * Rendering tests
 */
describe('RNCarousel renders correctly', () => {
  let shallowWrapper
  let fullWrapper

  it('renders the container view correctly', () => {
    shallowWrapper = shallowSetup()
    const rnCarousel = shallowWrapper.find({ testID: 'RNCarousel' })

    expect(rnCarousel.html()).toMatchSnapshot()
  })

  it('renders correctly given at least two sources', () => {
    fullWrapper = fullSetup()
    const rnCarousel = fullWrapper.find({ testID: 'RNCarousel' }).first()

    expect(rnCarousel.html()).toMatchSnapshot()

    expect(rnCarousel.exists({ testID: 'RNCarouselViewA'})).toEqual(true)
    expect(rnCarousel.exists({ testID: 'RNCarouselImageA'})).toEqual(true)

    expect(rnCarousel.exists({ testID: 'RNCarouselViewB'})).toEqual(true)
    expect(rnCarousel.exists({ testID: 'RNCarouselImageB'})).toEqual(true)
  })

  it('renders correctly given less than two sources', () => {
    fullWrapper = fullSetup({sources: []})
    const rnCarousel = fullWrapper.find({ testID: 'RNCarousel' }).first()

    expect(rnCarousel.html()).toMatchSnapshot()

    expect(rnCarousel.exists({ testID: 'RNCarouselViewA'})).toEqual(false)
    expect(rnCarousel.exists({ testID: 'RNCarouselImageA'})).toEqual(false)

    expect(rnCarousel.exists({ testID: 'RNCarouselViewB'})).toEqual(false)
    expect(rnCarousel.exists({ testID: 'RNCarouselImageB'})).toEqual(false)
  })

})

/*
 * Sanity check test to make sure jest/enzyme config
 * will run tests
 */
test('3 is equal to 3', () => {
  expect(three()).toBe(3);
})
