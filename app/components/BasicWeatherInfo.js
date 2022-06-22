import React, { useState, useEffect } from 'react'
import { View, Text, Image, StyleSheet, ActivityIndicator, Dimensions } from 'react-native'
import { PanGestureHandler } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'
import useSwipeAnimation from '../hooks/useSwipeAnimation'

import FontAwesome from 'react-native-vector-icons/FontAwesome'

import { images } from '../utils/imageLoader'
import Sunrise from '../../assets/images/weather/Sunrise.png'
import Day from '../../assets/images/weather/Clear.png'
import Sunset from '../../assets/images/weather/Sunset.png'
import Night from '../../assets/images/weather/Clear-night.png'

// TODO:
// - Display min and max temp for next days
// - Apply scrollview on every display info
// - Maybe use icons for every weather info 


const BasicWeatherInfo = props => {
  const [currentHour, setCurrentHour] = useState()

  useEffect(() => {
    const time = getCurrentTime()
    const onlyHour = time.split(':')[0]

    setCurrentHour(onlyHour)
  }, [])

  const {
    panGestureEvent,
    firstWeatherInfoPosition,
    secondWeatherInfoPosition,
    thirdWeatherInfoPosition,
    showingInfo
  } = useSwipeAnimation()

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

  const getCurrentTime = () => {
    const timeStamp = props.weather.current.dt
    const timezoneOffset = props.weather.timezone_offset
    const currentTimeStamp = timeStamp + timezoneOffset

    const current_date = new Date(currentTimeStamp * 1000)
    const current_hours = current_date.getUTCHours() > 9 ?
      current_date.getUTCHours() : `0${current_date.getUTCHours()}`
    const current_minutes = current_date.getUTCMinutes() > 9 ?
      current_date.getUTCMinutes() : `0${current_date.getUTCMinutes()}`

    return `${current_hours}:${current_minutes}`
  }

  const getFirstDot = () => {
    if (showingInfo == 1) {
      return <FontAwesome style={{ margin: 5, marginTop: 15 }} name='circle' size={10} color='#757575' />
    }

    return <FontAwesome style={{ margin: 5, marginTop: 15 }} name='circle-o' size={10} color='#757575' />
  }

  const getSecondDot = () => {
    if (showingInfo == 2) {
      return <FontAwesome style={{ margin: 5, marginTop: 15 }} name='circle' size={10} color='#757575' />
    }

    return <FontAwesome style={{ margin: 5, marginTop: 15 }} name='circle-o' size={10} color='#757575' />
  }

  const getThirdDot = () => {
    if (showingInfo == 3) {
      return <FontAwesome style={{ margin: 5, marginTop: 15 }} name='circle' size={10} color='#757575' />
    }

    return <FontAwesome style={{ margin: 5, marginTop: 15 }} name='circle-o' size={10} color='#757575' />
  }

  return (
    <PanGestureHandler onGestureEvent={panGestureEvent}>
      <Animated.View style={{ flex: 1, display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
        <View style={styles.dotLocation}>
          {getFirstDot()}
          {getSecondDot()}
          {getThirdDot()}
        </View>
        <Animated.View style={[styles.mainContainer, firstWeatherInfoPosition]}>
          {getWeatherImage()}
          <View style={styles.cityInfoWrapper}>
            <Text style={styles.cityName}>{props.city}</Text>
            <FontAwesome size={25} style={styles.locationIcon} name='location-arrow' />
          </View>
          <View>
            <Text style={styles.tempText}>{props.weather.current.temp.toFixed(0)}</Text>
            <FontAwesome name='circle-o' size={10} style={styles.elipseIcon} />
          </View>
          <View style={styles.basicInformations}>
            <View style={styles.infoColumn}>
              <Text style={styles.infoTitle}>HORÁRIO</Text>
              <Text style={styles.info}>{getCurrentTime()}</Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.infoTitle}>UV</Text>
              <Text style={styles.info}>{props.weather.current.uvi}</Text>
            </View>
            <View style={styles.infoColumn}>
              <Text style={styles.infoTitle}>CHUVA</Text>
              <Text style={styles.info}>{props.weather.daily[0].pop * 100 + '%'}</Text>
            </View>
          </View>
        </Animated.View>
        <Animated.View style={[styles.mainContainer, secondWeatherInfoPosition]}>
          <View style={styles.nextDayInfoContainer}>
            <Text style={styles.boldText}>Amanhã</Text>
            <View>
              <Text style={styles.tempText}>20</Text>
              <FontAwesome name='circle-o' size={10} style={styles.elipseIcon} />
            </View>
            <View style={styles.temps}>
              <View style={{ alignItems: 'center' }}>
                <Image style={styles.timeImageIndicator} source={Sunrise} />
                <Text style={styles.info}>{props.weather.daily[1].temp.morn.toFixed(0) + 'º'}</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Image style={styles.timeImageIndicator} source={Day} />
                <Text style={styles.info}>{props.weather.daily[1].temp.day.toFixed(0) + 'º'}</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Image style={styles.timeImageIndicator} source={Sunset} />
                <Text style={styles.info}>{props.weather.daily[1].temp.eve.toFixed(0) + 'º'}</Text>
              </View>
              <View style={{ alignItems: 'center' }}>
                <Image style={styles.timeImageIndicator} source={Night} />
                <Text style={styles.info}>{props.weather.daily[1].temp.night.toFixed(0) + 'º'}</Text>
              </View>
            </View>
          </View>
        </Animated.View>
        <Animated.View style={[styles.mainContainer, thirdWeatherInfoPosition]}>
          {getWeatherImage()}
          <View style={styles.cityInfoWrapper}>
            <Text style={styles.cityName}>{props.city}</Text>
            <FontAwesome size={25} style={styles.locationIcon} name='location-arrow' />
          </View>
          <View>
            {/* <Text style={styles.tempText}>{getCurrentTemp()}</Text> */}
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
              <Text>{props.weather.daily[0].pop * 100 + '%'}</Text>
            </View>
          </View>
        </Animated.View>
      </Animated.View>
    </PanGestureHandler>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
    position: 'absolute',
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
    padding: 10,
    flexDirection: 'row',
    backgroundColor: '#FDFCFC',
    borderRadius: 11
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
    alignItems: 'center',
    marginLeft: 20,
    marginRight: 20
  },
  dotLocation: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  nextDayInfoContainer: {
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  temps: {
    marginTop: 30,
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#FDFCFC',
    borderRadius: 11
  },
  timeImageIndicator: {
    margin: 5,
    height: 60,
    width: 60
  },
  boldText: {
    fontFamily: 'Poppins-Medium',
    color: 'black',
    fontSize: 25
  }
})

export default BasicWeatherInfo