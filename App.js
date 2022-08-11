import { StatusBar } from 'expo-status-bar';
import reactDom from 'react-dom';
import { StyleSheet, Dimensions, Text, View, ScrollView } from 'react-native';

// 디바이스 크기 가져오기
// const { height, width } = Dimensions.get("window");

// width를 SCREEN_WIDTH로 설정
const { width:SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>
      <ScrollView
        pagingEnabled 
        horizontal 
        // indicatorStyle="white" indicator 색상 하얀색
        showsHorizontalScrollIndicator={false} // indicator 비활성
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
    fontSize:28,
    fontWeight: "600"
  },
  weather: {
  },
  day : {
    width: SCREEN_WIDTH, // day 컴포넌트의 크기를 화면 너비로 설정한다.
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

  Scroll View
  디바이스 스크롤 지원 컴포넌트
  ! 해당 컴포넌트를 사용하려면 style이 아닌 contentContainerStyle을 사용해야한다.
  ! 해당 컴포넌트는 flex를 사용하면 안된다.
  pagingEnabled - 스크롤을 자유롭게 하지 못하게 막는다. (페이지 생성)
   : 해당 prop를 사용하면 디바이스 하단에 Tab View와 같은 것이 보인다.(Indicator)
   : 이를 막기 위해 showsHorizontalScrollIndicator={false} prop를 설정한다.
   : 커스텀 indicator을 설정하기 위해서는 indicatorStyle가 있다. (iOS만 가능)

  Dimensons API
  디바이스의 크기를 가져오는 API
*/