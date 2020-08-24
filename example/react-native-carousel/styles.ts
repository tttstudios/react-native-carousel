import { ViewStyle } from 'react-native'

/*
 * Styling for content inside the parent container.
 * Applied to ViewA/ViewB essentially
 */
const CONTENT_STYLE: ViewStyle = {
  flex: 1,
  height: '100%',
  width: '100%',
  position: 'absolute',
  alignItems: 'center',
  justifyContent: 'center'
}

/*
 * Styling for parent container
 */
const CONTAINER_STYLE: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
}

export default {
  CONTAINER_STYLE,
  CONTENT_STYLE
}
