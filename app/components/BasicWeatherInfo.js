import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

import Elipse from '../../assets/images/Elipse.png'

import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { images } from '../utils/imageLoader'

const BasicWeatherInfo = props => {
  const getWeatherImage = () => {
    return images.map(image => {
      if (image.label == props.weather.current.weather[0].main) {
        return <Image style={styles.image} key={image.label} source={image.image} />
      }
    })
  }

  const getCurrentTemp = () => {
    return props.weather.current.temp.toFixed(0)
  }

  return (
    <View style={styles.mainContainer}>
      {getWeatherImage()}
      <View style={styles.cityInfoWrapper}>
        <Text style={styles.cityName}>{props.city}</Text>
        <FontAwesome size={25} style={styles.locationIcon} name='location-arrow' />
      </View>
      <View>
        <Text style={styles.tempText}>{getCurrentTemp()}</Text>
        <FontAwesome name='circle-o' size={10} style={styles.elipseIcon} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center'
  },
  image: {
    marginTop: 60,
    width: 150,
    height: 150
  },
  cityInfoWrapper: {
    display: 'flex',
    flexDirection: 'row'
  },
  cityName: {
    marginTop: 20,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 30,
    color: 'black'
  },
  locationIcon: {
    alignSelf: 'center',
    marginTop: 15,
    marginLeft: 10,
    color: 'black'
  },
  tempText: {
    fontFamily: 'Poppins-Medium',
    color: 'black',
    fontSize: 70
  },
  elipseIcon: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: 15,
    right: -20,
    color: 'black'
  }
})

export default BasicWeatherInfo