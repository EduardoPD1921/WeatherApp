import React, { useEffect, useState } from 'react'
import { View, StyleSheet, SafeAreaView, TextInput, ActivityIndicator, PermissionsAndroid } from 'react-native'
import Geolocation from 'react-native-geolocation-service'

import useWeather from '../api/useWeather'
import useLocation from '../api/useLocation'

import BasicWeatherInfo from '../components/BasicWeatherInfo'

import Icon from 'react-native-vector-icons/Ionicons'

const MainScreen = () => {
  const [weather, setWeather] = useState()
  const [location, setLocation] = useState()

  const weatherApi = useWeather()
  const locationApi = useLocation()

  useEffect(() => {
    const requestPermisionAndLocation = async () => {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          'title': 'Test',
          'message': 'test'
        }
      )

      console.log(granted)

      if (granted == 'granted') {
        Geolocation.getCurrentPosition(async position => {
          console.log(position)

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
        })
      }
    }

    requestPermisionAndLocation()
  }, [])

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

  return (
    <View style={styles.wrapper}>
      <SafeAreaView style={styles.mainContainer}>
        <View>
          <Icon size={20} name='search-sharp' style={styles.searchIcon} />
          <TextInput placeholderTextColor='#C4C4C4' placeholder='Procure uma localização' style={styles.searchInput} />
        </View>
        {renderBasicWeatherInfo()}
      </SafeAreaView>
    </View>
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