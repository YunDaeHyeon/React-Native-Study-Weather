import { StatusBar } from 'expo-status-bar';
import React from 'react';
import * as Location from 'expo-location';
import { useEffect, useState } from 'react';
import reactDom from 'react-dom';
import { StyleSheet, Dimensions, Text, View, ScrollView } from 'react-native';

// width를 SCREEN_WIDTH로 설정
const { width:SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [location, setLocation] = useState();
  const [ok, setOk] = useState(true);
  const ask = async() => {
    // 앱이 실행 중일때만 사용자 권한 체크 (granted 가져오기)
    const {granted} = await Location.requestForegroundPermissionsAsync();
    console.log(granted);
    if(!granted){
      sekOk(false); // 만약, setOk가 false라면 사용자가 권한 요청을 거절한 것
    }
    // 사용자의 위치정보를 불러오며 accuracy는 1 ~ 6까지의 단계가 존재한다. (단계가 높을수록 자세한 정보 호출)
    const {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync({accuracy:5});
    // 사용자의 위치를 우편 주소로 설정한다. (options은 비활성화)
    const location = await Location.reverseGeocodeAsync({latitude, longitude}, {useGoogleMaps:false});
    setCity(location[0].city);
  };
  useEffect(()=>{
    ask();
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
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
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
    fontSize: 150
  },
  description:{
    marginTop: -30,
    fontSize: 30,
  },
});

// Expo 재실행 : r 클릭 (= Refreshed)
// Expo 어플리케이션 추가 도구 : m 클릭 혹은 디바이스 흔들기
/*
  휴대전화 위치 파악 Package -> Expo Location Package
  
  --
  목표
  휴대전화가 위치한 지역의 16일간 날씨 예측 정보를 불러온다.

  --
  Expo Location
  
*/