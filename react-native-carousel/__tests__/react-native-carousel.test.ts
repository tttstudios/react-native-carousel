import React from 'react'
import { shallow, mount } from 'enzyme'
import { RNCarousel } from '../src'

const three = () => 3

test('3 is equal to 3', () => {
  expect(three()).toBe(3);
})
