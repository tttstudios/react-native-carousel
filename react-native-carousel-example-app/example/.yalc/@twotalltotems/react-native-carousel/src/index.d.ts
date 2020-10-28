/*
 * Typescript declaration file for react-native-carousel 
 */

declare module '@twotalltotems/react-native-carousel' { 
  import { ViewStyle, ImageSourcePropType } from 'react-native'

  export interface RNCarouselProps {
    /*
     * Array of image sources corresponding to images to be displayed
     */
    sources: ImageSourcePropType[],

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
    inFocusDuration?: number,

    /*
     * The time in ms that an item takes to go from fully
     * transparent to fully opaque, and vice versa
     */
    animationDuration?: number,

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

  export const RNCarousel: React.FunctionComponent<RNCarouselProps>
}
