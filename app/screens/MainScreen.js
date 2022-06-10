import React, { useEffect, useState } from 'react'
import { View, StyleSheet, SafeAreaView, TextInput, ActivityIndicator, PermissionsAndroid } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated, { useAnimatedGestureHandler, useAnimatedStyle, useSharedValue, withSpring, runOnJS } from 'react-native-reanimated'

import Geolocation from 'react-native-geolocation-service'

import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import useWeather from '../api/useWeather'
import useLocation from '../api/useLocation'

import BasicWeatherInfo from '../components/BasicWeatherInfo'

import Icon from 'react-native-vector-icons/Ionicons'

const MainScreen = () => {
  const [weather, setWeather] = useState()
  const [location, setLocation] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const weatherApi = useWeather()
  const locationApi = useLocation()

  const verticalPosition = useSharedValue(0)
  const loadRotation = useSharedValue(0)

  const AnimatedIcon = Animated.createAnimatedComponent(MaterialIcon)

  useEffect(() => {
    const requestPermisionAndLocation = async () => {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      )

      if (granted == 'granted') {
        Geolocation.getCurrentPosition(async position => {
          const weatherInfo = await weatherApi.get('onecall', {
            params: {
              lat: position.coords.latitude,
              lon: position.coords.longitude
            }
          })
    
          const locationInfo = await locationApi.get('reverse-geocode-client', {
            params: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          })
    
          setWeather(weatherInfo.data)
          setLocation(locationInfo.data)

          closeRefresh()

          setTimeout(() => {
            setIsLoading(false)
          }, 1000)
        })
      }
    }

    if (isLoading) {
      requestPermisionAndLocation()
    }
  }, [isLoading])

  const renderBasicWeatherInfo = () => {
    if (weather && location) {
      return <BasicWeatherInfo city={location.city} weather={weather} />
    }

    return (
      <View style={styles.loadWrapper}>
        <ActivityIndicator size='large' color='#C4C4C4' />
      </View>
    )
  }

  const renderRefreshAnimation = () => {
    if (isLoading) {
      return <ActivityIndicator color='#9A9A9A' style={{ position: 'absolute', alignSelf: 'center', top: 30 }} />
    }

    return <AnimatedIcon color='#9A9A9A' style={[{ position: 'absolute', alignSelf: 'center', top: 30 }, rotateAnimation]} size={20} name='loading' />
  }

  const panGestureEvent = useAnimatedGestureHandler({
    onStart: (event) => {},
    onActive: (event) => {
      if (event.velocityY >= 0 && verticalPosition.value <= 200) {
        verticalPosition.value += 0.01 * event.velocityY
        loadRotation.value += 6
      }
    },
    onEnd: (event) => {
      if (event.y >= 90) {
        verticalPosition.value = withSpring(100)
        runOnJS(setIsLoading)(true)
      } else {
        verticalPosition.value = withSpring(0)
      }
    }
  })

  const closeRefresh = () => {
    verticalPosition.value = withSpring(0)
  }

  const refreshAnimation = useAnimatedStyle(() => {
    return {
      top: verticalPosition.value
    }
  })

  const rotateAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ rotateZ: `${loadRotation.value}deg` }]
    }
  })

  return (
    <>
      {renderRefreshAnimation()}
      <PanGestureHandler onGestureEvent={panGestureEvent}>
        <Animated.View style={[styles.wrapper, refreshAnimation]}>
          <SafeAreaView style={styles.mainContainer}>
            <View>
              <Icon size={20} name='search-sharp' style={styles.searchIcon} />
              <TextInput placeholderTextColor='#C4C4C4' placeholder='Procure uma localização' style={styles.searchInput} />
            </View>
            {renderBasicWeatherInfo()}
          </SafeAreaView>
        </Animated.View>
      </PanGestureHandler>
    </>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
    zIndex: 0
  },
  mainContainer: {
    flex: 1,
    margin: 40,
    zIndex: 0
  },
  searchInput: {
    paddingLeft: 20,
    paddingRight: 30,
    backgroundColor: '#FDFCFC',
    borderRadius: 15,
    fontFamily: 'Poppins-Regular',
    color: 'black',
    zIndex: 0
  },
  searchIcon: {
    color: '#C4C4C4',
    alignSelf: 'flex-end',
    position: 'absolute',
    top: 14,
    right: 15,
    zIndex: 10
  },
  loadWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default MainScreen