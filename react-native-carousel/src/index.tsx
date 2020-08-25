import * as React from 'react'
import { View, Animated, Easing, Platform } from 'react-native'
import { RNCarouselProps } from '@twotalltotems/react-native-carousel'
import styles from './styles'

export const RNCarousel: React.FunctionComponent<RNCarouselProps> = (props: RNCarouselProps) => {
  const {
    items,
    onItemIn,
    onItemOut,
    duration,
    transitionLength,
    containerStyle: overrideContainerStyle,
    contentStyle: overrideContentStyle
  } = props

  /* 
   * In an ideal world, we wouldn't need this and it would be just 1
   * However, we receive a bug of the first transition not animating
   * when we do this. It likely has to do with this bug:
   * https://github.com/facebook/react-native/issues/25318
   *
   * We got inspiration for a solution from the poster of this issue
   * in their explanaation of the issue here:
   * https://github.com/facebook/react-native/issues/25318#issue-458167509
   * */
  const maxOpacity = Platform.OS === 'ios' ? 1 : 1.1

  // Prop handling
  const containerStyle = { ...styles.CONTAINER_STYLE, ...overrideContainerStyle }
  const contentStyle = { ...styles.CONTENT_STYLE, ...overrideContentStyle }
  const inFocusDuration = duration ? duration : 1000
  const transitionDuration = transitionLength ? transitionLength : 700

  // indices for iterating over the items array
  const [indexA, setIndexA] = React.useState(0)
  const [indexB, setIndexB] = React.useState(1)

  /* 
   * prevState values to keep track of if the last integer
   * value of the corresponding opacity value was 0 or 1
   */
  const [prevStateA, setprevStateA] = React.useState(maxOpacity)
  const [prevStateB, setprevStateB] = React.useState(maxOpacity)

  // opacity ref values for cross dissolve effect
  const opacityA = React.useRef(new Animated.Value(maxOpacity)).current
  const opacityB = React.useRef(new Animated.Value(0)).current

  /*
   * prev opacity value refs to help reduce calls to setState
   * since setState is async
   */
  let prevValueA = React.useRef(maxOpacity).current
  let prevValueB = React.useRef(0).current

  /*
   * Listener for the opacityA value. We want to update indexA
   * only once for each time opacityA becomes 0. The strategy is
   * to set the prevStateA value to only 0/1 so that the
   * useEffect hook for prevStateA will only be activated once
   * for a 0/1 value
   */
  const idA = opacityA.addListener(({value}) => {
    if ((value === 0 || value === maxOpacity) && prevValueA !== value) {
      prevValueA = value
      if (prevStateA !== value) {
        setprevStateA(prevValueA)
      }
    }
  })

  /*
   * Listener for the opacityB value. We want to update indexB
   * only once for each time opacityB becomes 0. The strategy is
   * to set the prevStateB value to only 0/1 so that the
   * useEffect hook for prevStateB will only be activated once
   * for a 0/1 value
   */
  const idB = opacityB.addListener(({value}) => {
    if ((value === 0 || value === maxOpacity) && prevValueB !== value) {
      prevValueB = value
      if (prevStateB !== value) {
        setprevStateB(prevValueB)
      }
    }
  })

  /*
   * Animation effect hook. The animation is essentially
   * a loop of alternating between ViewA with opacity of 1
   * and ViewB with opacity of 0, and ViewA with opacity of 0
   * and ViewB with opacity of 1
   */
  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(inFocusDuration),
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
        Animated.delay(inFocusDuration),
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
   * prevStateA hook where we update the value of indexA
   * to update the item from the items array that ViewA
   * will display. Based on the opacityA listener functionality
   * above, this should only ever update once per opacityA
   * being 0
   */
  React.useEffect(() => {
    // item going out
    if (prevStateA === 0) {
      setIndexA((indexA + 2) % items.length)
      if (onItemOut) {
        onItemOut()
      }
    }
    // item coming in
    else if (prevStateA === maxOpacity) {
      if (onItemIn) {
        onItemIn()
      }
    }
  }, [prevStateA])

  /*
   * prevStateB hook where we update the value of indexB
   * to update the item from the items array that ViewB
   * will display. Based on the opacityB listener functionality
   * above, this should only ever update once per opacityB
   * being 0
   */
  React.useEffect(() => {
    // item going out
    if (prevStateB === 0) {
      setIndexB((indexB + 2) % items.length)
      if (onItemOut) {
        onItemOut()
      }
    }
    // item coming in 
    else if (prevStateB === maxOpacity) {
      if (onItemIn) {
        onItemIn()
      }
    }
  }, [prevStateB])

  const ViewA = React.useMemo(() =>
    <Animated.View
      style={{ ...contentStyle, opacity: opacityA }}>
      { items[indexA] }
    </Animated.View>,
  [indexA])

  const ViewB = React.useMemo(() =>
    <Animated.View
        style={{ ...contentStyle, opacity: opacityB }}>
        { items[indexB] }
    </Animated.View>,
  [indexB])

  return (
    <View style={containerStyle}>
      { items.length > 1
      ? <>
        { ViewA }
        { ViewB }
      </>
      : <></> }
    </View>
  )
}
