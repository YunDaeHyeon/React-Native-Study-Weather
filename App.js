import reactDom from 'react-dom';
import { StyleSheet, Text, View } from 'react-native';

// flex container의 기본 방향은 세로이며 원한다면 flexDirection: "row"를 사용하여 가로로 변경 가능하다.
//부모 컨테이너에 display:flex를 할 필요는 없지만 flex 할당은 해야한다.
// 부모 컨테이너 하위의 있는 아이템들의 flex는 비율을 나타낸다.
export default function App() {
  return (
    <View style={{flex:1, flexDirection:"row"}}>
      <View style={{flex:1, backgroundColor: "tomato"  }}></View>
      <View style={{flex:3, backgroundColor: "teal"  }}></View>
      <View style={{flex:1, backgroundColor: "orange"  }}></View>
    </View>
  );
}

/*
  기존 HTML의 Flex을 사용하기 위해서 부모 컨테이너에 display:flex; 를 작성해야
  아이템들이 적용되었지만 RN의 경우 View Components 그 자체가 flex이다.
  즉, 부모 컨테이너에 display: flex를 적용할 필요가 없다.  
  또한, RN에서 style 요소들 중 width,height(높이, 너비)를 사용하여 어플을 제작하지 않는다.  
  그 이유는 각 디바이스에 따라 화면의 크기가 매우 다양하기 때문에 반응형(비율)으로 제작해야한다.
*/