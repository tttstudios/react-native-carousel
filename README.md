Add banner

# React Native Carousel

Add tests badge (GitHub workflows?)

`@twotalltotems/react-native-carousel` is a React Native component to make it simple to display a series of images with a crossfade
animation between them.

Add images

## Installation

`npm install --save @twotalltotems/react-native-carousel`
or
`yarn add @twotalltotems/react-native-carousel`

## Dependencies

We make use of React hooks so make sure you have at least React 16.8 and React Native 0.60 installed in your React Native project
before trying to use this component in your code.

## Usage

```js
import { View } from 'react-native'
import { RNCarousel } from '@twotalltotems/react-native-carousel'

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
import { RNCarousel } from '@twotalltotems/react-native-carousel'

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
    contentStyle={{ height: '50%' }}
  />

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
        	<img src="https://avatars3.githubusercontent.com/u/60905710?s=400&v=4" width="60px;" style="border-radius: 50%;"/>
        	<br />
        	<sub><a href="https://github.com/odin-m">Odin Mebesius</a></sub> <br />
        </th>
    </tr>
</table>

## Premium Support By TTT Studios

React native empty-state-view is presented by the mobile team at [TTT Studios](https://ttt.studio). We are a Digital Innovation Studio based out of Vancouver, Canada, delivering custom software and solutions that are designed and developed 100% in-house. The technologies we work with include AR & VR, IoT, AI, security & encryption, and cloud computing.

<div align="right">
	<img src="https://ttt.studio/wp-content/themes/tttwordpresstheme/imgs/ttt-colour.png" width="200px"/>
	<h5>Empowering Business Through Technology</h5>
</div>
