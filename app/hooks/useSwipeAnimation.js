import { useState } from 'react'
import { useAnimatedGestureHandler, useSharedValue, useAnimatedStyle, interpolate, withTiming, runOnJS } from 'react-native-reanimated'

function useSwipeAnimation() {
  const [showingInfo, setShowingInfo] = useState(1)

  const firstInfo = useSharedValue(0)
  const secondInfo = useSharedValue(400)
  const thirdInfo = useSharedValue(400)

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (event) => {},
    onActive: (event) => {
      if (event.velocityX <= 0) {
        if (showingInfo == 3) {
          thirdInfo.value = interpolate(event.translationX,
            [0, -400],
            [0, -400]
          )

          secondInfo.value = interpolate(event.translationX,
            [400, 0],
            [0, -400]
          )
        }

        if (showingInfo == 1) {
          firstInfo.value = interpolate(event.translationX,
            [0, -400],
            [0, -400]
          )

          secondInfo.value = interpolate(event.translationX,
            [0, -400],
            [400, 0]
          )
        } else if (showingInfo == 2) {
          secondInfo.value = interpolate(event.translationX,
            [0, -400],
            [0, -400]
          )

          firstInfo.value = interpolate(event.translationX,
            [400, 0],
            [0, -400]
          )

          thirdInfo.value = interpolate(event.translationX,
            [0, -400],
            [400, 0]
          )
        }
      } else {
        if (showingInfo == 1) {
          firstInfo.value = interpolate(event.translationX,
            [0, 400],
            [0, 400]
          )

          secondInfo.value = interpolate(event.translationX,
            [-400, 0],
            [0, 400]
          )
        } else if (showingInfo == 2) {
          secondInfo.value = interpolate(event.translationX,
            [0, 400],
            [0, 400]
          )

          thirdInfo.value = interpolate(event.translationX,
            [0, -400],
            [400, 0]
          )

          firstInfo.value = interpolate(event.translationX,
            [0, 400],
            [-400, 0]
          )
        } else if (showingInfo == 3) {
          thirdInfo.value = interpolate(event.translationX,
            [0, 400],
            [0, 400]
          )

          secondInfo.value = interpolate(event.translationX,
            [0, 400],
            [-400, 0]
          )
        }
      }
    },
    onEnd: (event) => {
      if (event.velocityX < 0) {
        if (showingInfo == 3) {
          thirdInfo.value = withTiming(0, {
            duration: 200
          })

          secondInfo.value = withTiming(-400, {
            duration: 200
          })
        }

        if (event.translationX <= -120 && showingInfo == 1) {
          firstInfo.value = withTiming(-400, {
            duration: 200
          })
      
          secondInfo.value = withTiming(0, {
            duration: 200
          })
  
          runOnJS(setShowingInfo)(showingInfo + 1)
        } else if (event.translationX > -120.0 && showingInfo == 1) {
          firstInfo.value = withTiming(0, {
            duration: 200
          })

          secondInfo.value = withTiming(400, {
            duration: 200
          })
        } else if (event.translationX <= -120 && showingInfo == 2) {
          secondInfo.value = withTiming(-400, {
            duration: 200
          })
      
          thirdInfo.value = withTiming(0, {
            duration: 200
          })
  
          runOnJS(setShowingInfo)(showingInfo + 1)
        } else if (event.translationX > -120 && showingInfo == 2) {
          firstInfo.value = withTiming(-400, {
            duration: 200
          })

          secondInfo.value = withTiming(0, {
            duration: 200
          })

          thirdInfo.value = withTiming(400, {
            duration: 200
          })
        }
      } else {
        if (showingInfo == 1) {
          firstInfo.value = withTiming(0, {
            duration: 200
          })

          secondInfo.value = withTiming(400, {
            duration: 200
          })
        }

        if (event.translationX >= 120 && showingInfo == 2) {
          secondInfo.value = withTiming(400, {
            duration: 200
          })

          firstInfo.value = withTiming(0, {
            duration: 200
          })

          runOnJS(setShowingInfo)(showingInfo - 1)
        } else if (event.translationX < 120 && showingInfo == 2) {
          thirdInfo.value = withTiming(400, {
            duration: 200
          })

          secondInfo.value = withTiming(0, {
            duration: 200
          })

          firstInfo.value = withTiming(-400, {
            duration: 200
          })
        } else if (event.translationX >= 120 && showingInfo == 3) {
          thirdInfo.value = withTiming(400, {
            duration: 200
          })

          secondInfo.value = withTiming(0, {
            duration: 200
          })

          runOnJS(setShowingInfo)(showingInfo - 1)
        } else if (event.translationX < 120 && showingInfo == 3) {
          thirdInfo.value = withTiming(0, {
            duration: 200
          })

          secondInfo.value = withTiming(-400, {
            duration: 200
          })
        }
      }
    }
  })

  const firstWeatherInfoPosition = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: firstInfo.value }]
    }
  })

  const secondWeatherInfoPosition = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: secondInfo.value }]
    }
  })

  const thirdWeatherInfoPosition = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: thirdInfo.value }]
    }
  })

  return {
    panGestureEvent,
    firstWeatherInfoPosition,
    secondWeatherInfoPosition,
    thirdWeatherInfoPosition
  }
}

export default useSwipeAnimation