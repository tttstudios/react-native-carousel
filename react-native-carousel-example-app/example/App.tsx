/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react'
import { View, StatusBar } from 'react-native'
import { RNCarousel } from '@twotalltotems/react-native-carousel'

declare const global: {HermesInternal: null | {}}

const App = () => {
  const bulbasaur = require('./assets/bulbasaur.png')
  const squirtle = require('./assets/squirtle.png')
  const charmander = require('./assets/charmander.png')
  const mewtwo = require('./assets/mewtwo.png')
  const mew = require('./assets/mew.png')

  const SOURCES = [
    bulbasaur,
    squirtle,
    charmander,
    mewtwo,
    mew
  ]

  return (
    <>
      <StatusBar barStyle='dark-content' />
      <View style={{ flex: 1 }}>
        <RNCarousel sources={SOURCES}/>
      </View>
    </>
  )
}

export default App
