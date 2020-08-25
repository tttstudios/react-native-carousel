import { ViewStyle } from 'react-native'

export interface RNCarouselProps {
  /*
   * React components to display in the carousel
   */
  items: React.ReactNode[],

  /*
   * Function to be called when an item goes out of view
   */
  onItemIn?(): void,

  /*
   * Function to be called when an item comes into view
   */
  onItemOut?(): void,

  /*
   * The time in ms that an item should be displayed from when
   * it first becomes fully opaque to when it should start
   * to transition to transparency
   */
  duration?: number,

  /*
   * The time in ms that an item takes to go from fully
   * transparent to fully opaque, and vice versa
   */
  transitionLength?: number,

  /*
   * Styling to apply to the container. Useful for
   * padding and margins
   */
  containerStyle?: ViewStyle | ViewStyle[],

  /*
   * Styling to apply to the "inner container"
   * that directly holds the items
   */
  contentStyle?: ViewStyle | ViewStyle[]
}
