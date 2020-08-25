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
import { View, Image, StatusBar} from 'react-native'
import { RNCarousel } from '@twotalltotems/react-native-carousel'

declare const global: {HermesInternal: null | {}}

const App = () => {
  const bulbasaur = require('./assets/bulbasaur.png')
  const squirtle = require('./assets/squirtle.png')
  const charmander = require('./assets/charmander.png')
  const mewtwo = require('./assets/mewtwo.png')
  const mew = require('./assets/mew.png')

  const ITEMS = [
    <Image source={bulbasaur}/>,
    <Image source={squirtle} style={{ height: '75%', width: '75%', resizeMode: 'contain' }}/>,
    <Image source={charmander} style={{ height: '75%', width: '75%', resizeMode: 'contain' }}/>,
    <Image source={mewtwo} style={{ height: '75%', width: '75%', resizeMode: 'contain' }}/>,
    <Image source={mew} style={{ height: '75%', width: '75%', resizeMode: 'contain' }}/>
  ]

  const oneItem = [
    <Image source={bulbasaur}/>
  ]

  // const itemOut = () => {
  //   console.log('I\'m outta here')
  // }

  // const itemIn = () => {
  //   console.log('Back, back, back again!')
  // }

  return (
    <>
      <StatusBar barStyle='dark-content' />
      <View style={{ flex: 1 }}>
        {/* <RNCarousel
          items={ITEMS} 
          onItemOut={itemOut}
          onItemIn={itemIn}/> */}
        <RNCarousel items={ITEMS}/>
        {/* <RNCarousel items={[]}/> */}
      </View>
    </>
  )
}

export default App
