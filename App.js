import { StatusBar } from 'expo-status-bar';
import React from 'react';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import reactDom from 'react-dom';
import { StyleSheet, Dimensions, ActivityIndicator, Text, View, ScrollView } from 'react-native';

// width를 SCREEN_WIDTH로 설정
const { width:SCREEN_WIDTH } = Dimensions.get("window");

// 날씨 API key (Key를 Application에 두는건 매우 위험하지만 지금은 공부용이기 때문)
const API_KEY = "a410a8d973965b479d6bb20dfd24c73b";

export default function App() {
  // 사용자 위치(도시 기준) State
  const [city, setCity] = useState("Loading...");
  // 날씨 API State
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const getWeather = async() => {
    // 앱이 실행 중일때만 사용자 권한 체크 (granted 가져오기)
    const {granted} = await Location.requestForegroundPermissionsAsync();
    console.log(granted);
    if(!granted){
      sekOk(false);
    }
    // 사용자의 위치정보
    const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
    // 사용자의 위치를 우편 주소로 설정
    const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps:false});
    setCity(location[0].city);
    console.log(latitude, longitude);
    const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`);
    const json = await response.json();
    setDays(json.daily);
  };
  useEffect(()=>{
    getWeather();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled 
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}>
          {
            // 만약, days가 0이라면(API로부터 불러오지 않았다면) 로딩중을, 불러왔다면 View를.
            days.length === 0 ?(
            <View style={styles.day}>
              <ActivityIndicator 
                color="white" 
                size="large"
                style={{ marginTop:10 }}/>
            </View>
            ) : (
              days.map((day, index) => (
                <View key={index} style={styles.day}>
                  <Text style={styles.temp}>{parseFloat(day.temp.day).toFixed(1)}</Text>
                  <Text style={styles.description}>{day.weather[0].main}</Text>
                  <Text style={styles.tinyText}>{day.weather[0].description}</Text>
                </View>
              ))
            )
          }

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "orange",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems:"center"
  },
  cityName:{
    fontSize:38,
    fontWeight: "600"
  },
  weather: {
  },
  day : {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temp: {
    marginTop: 50,
    fontSize: 100
  },
  description:{
    marginTop: -20,
    fontSize: 30,
  },
  tinyText:{
    fontSize: 15
  }
});

// Expo 재실행 : r 클릭 (= Refreshed)
// Expo 어플리케이션 추가 도구 : m 클릭 혹은 디바이스 흔들기
//  소괄호 : 감싸고 싶은 문자열 드래그 해서 블록 지정 + Shift + (
//  중괄호 : 감싸고 싶은 문자열 드래그 해서 블록 지정 + Shift + {
/*
  휴대전화 위치 파악 Package -> Expo Location Package
  
  --
  목표
  휴대전화가 위치한 지역의 16일간 날씨 예측 정보를 불러온다.

  --
  날씨 API
  openweathermap.org/api

  --
  ActivityIndicator
  로딩 컴포넌트
  
*/