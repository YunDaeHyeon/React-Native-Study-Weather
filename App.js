import { StatusBar } from 'expo-status-bar';
import reactDom from 'react-dom';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>
      <View style={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>27</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </View>
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
    fontSize:28,
    fontWeight: "600"
  },
  weather: {
    flex: 3,
  },
  day : {
    flex: 1,
    alignItems: "center",
    backgroundColor:"teal",
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
*/