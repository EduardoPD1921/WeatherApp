import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native'

import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { images } from '../utils/imageLoader'

const BasicWeatherInfo = props => {
  const [currentHour, setCurrentHour] = useState()

  useEffect(() => {
    const time = getCurrentTime()
    const onlyHour = time.split(':')[0]

    setCurrentHour(onlyHour)
  }, [])

  const getWeatherImage = () => {
    if (currentHour) {
      return images.map(image => {
        if (currentHour >= 18 || (currentHour >= 0 && currentHour <= 4)) {
          if (image.slug == props.weather.current.weather[0].main + '-night') {
            return <Image style={styles.image} key={image.slug} source={image.image} />
          }
        } else {
          if (image.slug == props.weather.current.weather[0].main) {
            return <Image style={styles.image} key={image.slug} source={image.image} />
          }
        }
      })
    }

    return <ActivityIndicator size='large' color='#C4C4C4' />
  }

  const getCurrentTemp = () => {
    return props.weather.current.temp.toFixed(0)
  }

  const getCurrentTime = () => {
    const timeStamp = props.weather.current.dt
    const timezoneOffset = props.weather.timezone_offset
    const currentTimeStamp = timeStamp + timezoneOffset

    const formatObj = new Intl.DateTimeFormat('pt-BR', {
      timeStyle: 'short',
      timeZone: 'UTC'
    })
    const time = formatObj.format(new Date(currentTimeStamp * 1000))

    return time
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
      <View style={styles.basicInformations}>
        <View style={styles.infoColumn}>
          <Text style={styles.infoTitle}>HORÁRIO</Text>
          <Text style={styles.info}>{getCurrentTime()}</Text>
        </View>
        <View style={styles.infoColumn}>
          <Text style={styles.infoTitle}>UV</Text>
          <Text>{props.weather.current.uvi}</Text>
        </View>
        <View style={styles.infoColumn}>
          <Text style={styles.infoTitle}>CHUVA</Text>
          <Text>{props.weather.daily[0].pop + '%'}</Text>
        </View>
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
  },
  basicInformations: {
    display: 'flex',
    flexDirection: 'row'
  },
  infoTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 12,
    color: '#C4C4C4'
  },
  info: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    color: '#9A9A9A'
  },
  infoColumn: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }
})

export default BasicWeatherInfo