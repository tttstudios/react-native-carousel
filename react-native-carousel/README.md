![Banner](assets/banner.png)

# React Native Carousel

`@tttstudios/react-native-carousel` is a React Native component to make it simple to display a series of images with a crossfade
animation between them.

## Installation

`npm install --save @tttstudios/react-native-carousel`
or
`yarn add @tttstudios/react-native-carousel`

## Installation Requirements

We make use of React hooks so make sure you have at least:
- React 16.8
- React Native 0.60

## Usage

```js
import { View } from 'react-native'
import { RNCarousel } from '@tttstudios/react-native-carousel'

...

    const bulbasaur = require('./assets/bulbasaur.png')
    const squirtle = require('./assets/squirtle.png')
    const charmander = require('./assets/charmander.png')

    const SOURCES = [bulbasaur, squirtle, charmander]

...

    <View style={{ flex: 1 }}>
        <RNCarousel sources={SOURCES}/>
    </View>

...

```

## More Advanced Usage

```js
import { RNCarousel } from '@tttstudios/react-native-carousel'

...

    const bulbasaur = require('./assets/bulbasaur.png')
    const squirtle = require('./assets/squirtle.png')
    const charmander = require('./assets/charmander.png')

    const SOURCES = [bulbasaur, squirtle, charmander]

...

  <RNCarousel
    sources={SOURCES}
    onItemIn={() => console.log('Hello!')}
    onItemOut={() => console.log('Bye!')}
    inFocusDuration={2000}
    animationDuration={1000}
    containerStyle={{ paddingHorizontal: 20 }}
    contentStyle={{ height: '50%' }}>
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity
        style={{
        height: 50,
        width: 300,
        backgroundColor: 'black',
        opacity: 0.75,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center'}}
        onPress={() => console.log("You pressed me!")}>
        <Text style={{ fontSize: 16, color: 'white' }}>Gotta Catch 'Em All!</Text>
      </TouchableOpacity>
    </View>

...

```

## Parameters

| Parameter          | Required | Description                                             |
| ------------------ | -------- | ------------------------------------------------------- |
| sources            | YES      | Images to be displayed                                  |
| onItemIn()         | NO       | Function called when an image goes out of view          |
| onItemOut()        | NO       | Function called when an image comes into view           |
| inFocusDuration    | NO       | Time in ms that an image is shown                       |
| animationDuration  | NO       | Time in ms that the transition between two images takes |
| children           | NO       | children to be displayed on top of carousel images      |
| containerStyle     | NO       | Styling applied to container                            |
| contentStyle       | NO       | Styling applied to content                              |


## Roadmap

- [x] Typescript definition file
- [x] Typescript implementation
- [x] Add basic unit tests
- [ ] Add integration tests
- [ ] Add support for video

## Contributors

<table>
    <tr border="0" style="border: none; ">
        <th border="0" style="border-left: none; border-right: none;">
        	<img src="https://avatars2.githubusercontent.com/u/67807602?s=460&v=4" width="60px;" style="border-radius: 50%;"/>
        	<br />
        	<sub><a href="https://github.com/odin-m">Odin Mebesius</a></sub> <br />
        </th>
    </tr>
</table>

## Premium Support By TTT Studios

`react-native-carousel` is presented by the mobile team at [TTT Studios](https://ttt.studio). We are a Digital Innovation Studio based out of Vancouver, Canada, delivering custom software and solutions that are designed and developed 100% in-house. The technologies we work with include AR & VR, IoT, AI, security & encryption, and cloud computing.

<div align="right">
	<img src="https://ttt.studio/wp-content/themes/tttwordpresstheme/imgs/ttt-colour.png" width="200px"/>
	<h5>Empowering Business Through Technology</h5>
</div>
