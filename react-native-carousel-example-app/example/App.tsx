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
import { RNCarousel } from '@tttstudios/react-native-carousel'

declare const global: {HermesInternal: null | {}}

const App = () => {
  const bulbasaur = require('./assets/bulbasaur.png')
  const squirtle = require('./assets/squirtle.png')
  const charmander = require('./assets/charmander.png')
  const clefairy = { uri: 'https://media4.giphy.com/media/rAm0u2k17rM3e/giphy.gif' }
  const haunter = require('./assets/haunter.gif')
  const scyther = { uri: 'https://cdn.bulbagarden.net/upload/b/ba/123Scyther.png' }
  const ditto = require('./assets/ditto.gif')
  const lapras = { uri: 'https://cdn.bulbagarden.net/upload/thumb/a/ab/131Lapras.png/1200px-131Lapras.png' }
  const eevee = { uri: 'https://cdn.bulbagarden.net/upload/thumb/e/e2/133Eevee.png/1200px-133Eevee.png' }
  const snorlax = { uri: 'https://cdn.bulbagarden.net/upload/thumb/f/fb/143Snorlax.png/1200px-143Snorlax.png' }
  const dragonite = { uri: 'https://cdn.bulbagarden.net/upload/8/8b/149Dragonite.png' }
  const mewtwo = require('./assets/mewtwo.png')
  const mew = require('./assets/mew.png')

  const SOURCES = [
    bulbasaur,
    squirtle,
    charmander,
    clefairy,
    haunter,
    scyther,
    ditto,
    lapras,
    eevee,
    snorlax,
    dragonite,
    mewtwo,
    mew
  ]

  return (
    <>
      <StatusBar barStyle='dark-content' />
      <View style={{ flex: 1, paddingHorizontal: 20 }}>
        <RNCarousel sources={SOURCES}/>
      </View>
    </>
  )
}

export default App
