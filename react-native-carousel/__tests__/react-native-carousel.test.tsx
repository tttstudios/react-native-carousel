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
const charmander = require("../assets/charmander.png")
const mewtwo = require("../assets/mewtwo.png")

/*
 * Time in ms for both current images in ViewA/ViewB
 * to be replaced for default timing:
 * 2(onScreenDuration) + 2(100ms) + 2(transitionDuration)
 */
const DEFAULT_SWITCH_TIMING = 3600

/*
 * Setup functions
 */
const shallowSetup = (props = {sources: []}) => {
  const wrapper = shallow(<RNCarousel {...props} />)
  return wrapper
}

const fullSetup = (props: any = {sources: [bulbasaur, squirtle]}) => {
  const wrapper = mount(<RNCarousel {...props}/>)
  return wrapper
}

/*
 * Sanity check test to make sure jest/enzyme config
 * will run tests
 */
describe('Setup sanity check', () => {
  it('runs tests properly: 3 is equal to 3', () => {
    expect(three()).toBe(3);
  })
})

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

    expect(rnCarousel.exists({ testID: 'RNCarouselViewA' })).toEqual(true)
    expect(rnCarousel.exists({ testID: 'RNCarouselImageA' })).toEqual(true)

    expect(rnCarousel.exists({ testID: 'RNCarouselViewB' })).toEqual(true)
    expect(rnCarousel.exists({ testID: 'RNCarouselImageB' })).toEqual(true)

    expect(rnCarousel.exists({ testID: 'RNCarouselViewChildren' })).toEqual(true)

    fullWrapper.unmount()
  })

  it('renders correctly given less than two sources', () => {
    fullWrapper = fullSetup({ sources: [] })
    const rnCarousel = fullWrapper.find({ testID: 'RNCarousel' }).first()

    expect(rnCarousel.html()).toMatchSnapshot()

    expect(rnCarousel.exists({ testID: 'RNCarouselViewA' })).toEqual(false)
    expect(rnCarousel.exists({ testID: 'RNCarouselImageA' })).toEqual(false)

    expect(rnCarousel.exists({ testID: 'RNCarouselViewB' })).toEqual(false)
    expect(rnCarousel.exists({ testID: 'RNCarouselImageB' })).toEqual(false)
  
    expect(rnCarousel.exists({ testID: 'RNCarouselViewChildren' })).toEqual(false)

    fullWrapper.unmount()
  })

})

/*
 * State Logic Tests
 */

describe('RNCarousel state logic updates correctly', () => {
  let fullWrapper

  it('initially sets indexA/indexB to 0/1, respectively', () => {
    fullWrapper = fullSetup()
    const rnCarouselImageA = fullWrapper.find({ testID: 'RNCarouselImageA' }).first()
    const rnCarouselImageB = fullWrapper.find({ testID: 'RNCarouselImageB' }).first()

    expect(rnCarouselImageA.props().source).toEqual(bulbasaur)
    expect(rnCarouselImageB.props().source).toEqual(squirtle)

    fullWrapper.unmount()
  })

  it('initially sets opacityA/opacityB to 1/0, respectively', () => {
    fullWrapper = fullSetup()
    const rnCarouselViewA = fullWrapper.find({ testID: 'RNCarouselViewA' }).first()
    const rnCarouselViewB = fullWrapper.find({ testID: 'RNCarouselViewB' }).first()

    expect(rnCarouselViewA.props().style.opacity._value).toBe(1)
    expect(rnCarouselViewB.props().style.opacity._value).toBe(0)

    fullWrapper.unmount()
  })

  it('iterates through sources array correctly', () => {
    jest.useFakeTimers()
    fullWrapper = fullSetup({
      sources: [ bulbasaur, squirtle, charmander, mewtwo ]
    })

    jest.advanceTimersByTime(DEFAULT_SWITCH_TIMING / 2)
    fullWrapper.update()
    expect(fullWrapper.find({ testID: 'RNCarouselImageA' }).first().props().source).toEqual(charmander)
    expect(fullWrapper.find({ testID: 'RNCarouselImageB' }).first().props().source).toEqual(squirtle)

    jest.advanceTimersByTime(DEFAULT_SWITCH_TIMING / 2)
    fullWrapper.update()
    expect(fullWrapper.find({ testID: 'RNCarouselImageA' }).first().props().source).toEqual(bulbasaur)
    expect(fullWrapper.find({ testID: 'RNCarouselImageB' }).first().props().source).toEqual(mewtwo)

    jest.clearAllTimers()
    fullWrapper.unmount()
  })

  it('changes opacityA/opacityB correctly', () => {
    jest.useFakeTimers()
    fullWrapper = fullSetup()

    expect(fullWrapper.find({ testID: 'RNCarouselViewA' }).first().props().style.opacity._value).toBe(1)
    expect(fullWrapper.find({ testID: 'RNCarouselViewB' }).first().props().style.opacity._value).toBe(0)

    jest.advanceTimersByTime(DEFAULT_SWITCH_TIMING / 2)
    fullWrapper.update()
    expect(fullWrapper.find({ testID: 'RNCarouselViewA' }).first().props().style.opacity._value).toBe(0)
    expect(fullWrapper.find({ testID: 'RNCarouselViewB' }).first().props().style.opacity._value).toBe(1)

    jest.clearAllTimers()
    fullWrapper.unmount()
  })

  it('calls onItemOut once per item reaching opacity of 0', () => {
    jest.useFakeTimers()
    const mock = jest.fn()
    fullWrapper = fullSetup({
      sources: [ bulbasaur, squirtle, charmander, mewtwo ],
      onItemOut: mock
    })

    expect(mock).not.toHaveBeenCalled()
    jest.advanceTimersByTime(DEFAULT_SWITCH_TIMING / 2)
    fullWrapper.update()
    expect(fullWrapper.find({ testID: 'RNCarouselViewA' }).first().props().style.opacity._value).toBe(0)
    expect(mock).toHaveBeenCalledTimes(1)

    jest.clearAllTimers()
    jest.resetAllMocks()
    fullWrapper.unmount()
  })

  it('calls onItemIn once per item reaching opacity of maxOpacity', () => {
    jest.useFakeTimers()
    const mock = jest.fn()
    fullWrapper = fullSetup({
      sources: [ bulbasaur, squirtle, charmander, mewtwo ],
      onItemIn: mock
    })

    /* 
     * We expect 1 because we set stateA to maxOpacity initially
     */ 
    fullWrapper.update()
    expect(fullWrapper.find({ testID: 'RNCarouselViewA' }).first().props().style.opacity._value).toBe(1)
    expect(mock).toHaveBeenCalledTimes(1)

    /*
     * We expect the mock to have been called twice now that
     * RNCarouselViewB has an opacity value of 1. We use
     * setProp({}) to force a re-render since update()
     * was not flushing our effects properly for us here
     */
    jest.advanceTimersByTime((DEFAULT_SWITCH_TIMING / 2))
    fullWrapper.setProps({})
    expect(fullWrapper.find({ testID: 'RNCarouselViewB' }).first().props().style.opacity._value).toBe(1)
    expect(mock).toHaveBeenCalledTimes(2)

    jest.clearAllTimers()
    jest.resetAllMocks()
    fullWrapper.unmount()
  })

})
