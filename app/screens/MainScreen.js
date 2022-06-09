import React, { useEffect, useState } from 'react'
import { View, StyleSheet, SafeAreaView, TextInput, ActivityIndicator } from 'react-native'
import Geolocation from '@react-native-community/geolocation'

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
    Geolocation.getCurrentPosition(async info => {
      const weatherInfo = await weatherApi.get('onecall', {
        params: {
          lat: info.coords.latitude,
          lon: info.coords.longitude
        }
      })

      const locationInfo = await locationApi.get('reverse-geocode-client', {
        params: {
          latitude: info.coords.latitude,
          longitude: info.coords.longitude
        }
      })

      setWeather(weatherInfo.data)
      setLocation(locationInfo.data)

      console.log(weatherInfo.data)
    })
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