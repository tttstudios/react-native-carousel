import * as React from 'react'
import { View, Image, Animated, Easing, Platform } from 'react-native'
import { RNCarouselProps } from '@twotalltotems/react-native-carousel'
import styles from './styles'

export const RNCarousel: React.FunctionComponent<RNCarouselProps> = (props: RNCarouselProps) => {
  const {
    sources,
    onItemIn,
    onItemOut,
    inFocusDuration,
    animationDuration,
    containerStyle: overrideContainerStyle,
    contentStyle: overrideContentStyle
  } = props

  /* 
   * In an ideal world, we wouldn't need this and it would be just 1
   * However, we receive a bug of the first transition not animating
   * on Android when we do this. It likely has to do with this bug:
   * https://github.com/facebook/react-native/issues/25318
   *
   * We got inspiration for a solution from the poster of this issue
   * in their explanation of the issue here:
   * https://github.com/facebook/react-native/issues/25318#issue-458167509
   * */
  const maxOpacity = Platform.OS === 'ios' ? 1 : 1.1

  // Prop handling
  const containerStyle = { ...styles.CONTAINER_STYLE, ...overrideContainerStyle }
  const contentStyle = { ...styles.CONTENT_STYLE, ...overrideContentStyle }
  const onScreenDuration = inFocusDuration ? inFocusDuration : 1000
  const transitionDuration = animationDuration ? animationDuration : 700

  // indices for iterating over the sources array
  const [indexA, setIndexA] = React.useState(0)
  const [indexB, setIndexB] = React.useState(1)

  /* 
   * state values to keep track of if the last integer
   * value of the corresponding opacity value was 0 or 1
   */
  const [stateA, setStateA] = React.useState(maxOpacity)
  const [stateB, setStateB] = React.useState(maxOpacity)

  // opacity ref values for cross dissolve effect
  const opacityA = React.useRef(new Animated.Value(maxOpacity)).current
  const opacityB = React.useRef(new Animated.Value(0)).current

  /*
   * prev opacity value refs to help reduce calls to setState
   * since setState is async
   */
  const prevValueA = React.useRef(maxOpacity)
  const prevValueB = React.useRef(0)

  /*
   * Listener for the opacityA value. We want to update indexA
   * only once for each time opacityA becomes 0. The strategy is
   * to set the stateA value to only 0/1 so that the
   * useEffect hook for stateA will only be activated once
   * for a 0/1 value
   */
  const idA = React.useMemo(() => opacityA.addListener(({value}) => {
    if ((value === 0 || value === maxOpacity) && prevValueA.current !== value) {
      prevValueA.current = value
      setStateA(prevValueA.current)
    }
  }), [])

  /*
   * Listener for the opacityB value. We want to update indexB
   * only once for each time opacityB becomes 0. The strategy is
   * to set the stateB value to only 0/1 so that the
   * useEffect hook for stateB will only be activated once
   * for a 0/1 value
   */
  const idB = React.useMemo(() => opacityB.addListener(({value}) => {
    if ((value === 0 || value === maxOpacity) && prevValueB.current !== value) {
      prevValueB.current = value
      setStateB(prevValueB.current)
    }
  }), [])

  /*
   * Animation effect hook. The animation is essentially
   * a loop of alternating between ViewA with opacity of 1
   * and ViewB with opacity of 0, and ViewA with opacity of 0
   * and ViewB with opacity of 1
   */
  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(onScreenDuration),
        Animated.stagger(100, [
          Animated.timing(opacityA, {
            toValue: 0,
            duration: transitionDuration,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.sin)
          }),
          Animated.timing(opacityB, {
            toValue: maxOpacity,
            duration: transitionDuration,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.sin)
          })
        ]),
        Animated.delay(onScreenDuration),
        Animated.stagger(100, [
          Animated.timing(opacityA, {
            toValue: maxOpacity,
            duration: transitionDuration,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.sin)
          }),
          Animated.timing(opacityB, {
            toValue: 0,
            duration: transitionDuration,
            useNativeDriver: true,
            easing: Easing.inOut(Easing.sin)
          })
        ]),
      ])
    ).start()
  }, [])

  /*
   * stateA hook where we update the value of indexA
   * to update the item from the sources array that ViewA
   * will display. Based on the opacityA listener functionality
   * above, this should only ever update once per opacityA
   * being 0
   */
  React.useEffect(() => {
    // item going out
    if (stateA === 0) {
      setIndexA((indexA + 2) % sources.length)
      if (onItemOut) {
        onItemOut()
      }
    }
    // item coming in
    else if (stateA === maxOpacity) {
      if (onItemIn) {
        onItemIn()
      }
    }
  }, [stateA])

  /*
   * stateB hook where we update the value of indexB
   * to update the item from the sources array that ViewB
   * will display. Based on the opacityB listener functionality
   * above, this should only ever update once per opacityB
   * being 0
   */
  React.useEffect(() => {
    // item going out
    if (stateB === 0) {
      setIndexB((indexB + 2) % sources.length)
      if (onItemOut) {
        onItemOut()
      }
    }
    // item coming in 
    else if (stateB === maxOpacity) {
      if (onItemIn) {
        onItemIn()
      }
    }
  }, [stateB])

  const ViewA = React.useMemo(() =>
    <Animated.View style={{ ...contentStyle, opacity: opacityA }}>
      <Image source={sources[indexA]} style={{ resizeMode: 'center' }}/>
    </Animated.View>,
  [indexA])

  const ViewB = React.useMemo(() =>
    <Animated.View style={{ ...contentStyle, opacity: opacityB }}>
      <Image source={sources[indexB]} style={{ resizeMode: 'center' }}/>
    </Animated.View>,
  [indexB])

  return (
    <View style={containerStyle}>
      { sources.length > 1
      ? <>
        { ViewA }
        { ViewB }
      </>
      : <></> }
    </View>
  )
}
