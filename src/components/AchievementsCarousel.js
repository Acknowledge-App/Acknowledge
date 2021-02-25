import React, { useRef, setState, Component} from "react";
import { Animated,Easing, Text, View, StyleSheet, Button, Dimensions } from "react-native";

const width = Dimensions.get('window').width;

class AchievementsCarousel extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(0),
      currentAchievement: this.props.data[Math.floor(Math.random() * this.props.data.length)].achievementTitle
    };
  }

  infiniteLoop() {
      Animated.sequence([
        Animated.timing(this.state.fadeAnim, {
        toValue: 1,
        easing: Easing.inOut(Easing.sin),
        duration: 3000,
        useNativeDriver: true
        }),
        Animated.delay(10000),
        Animated.timing(this.state.fadeAnim, {
          toValue: 0,
          easing: Easing.inOut(Easing.sin),
          duration: 3000,
          useNativeDriver: true
        }),
      ]).start(() => {
        this.changeAchievement(),
        this.infiniteLoop()
      });
  }

  changeAchievement = () => {
    this.setState({
      currentAchievement: this.props.data[Math.floor(Math.random() * this.props.data.length)].achievementTitle
    })
  }

  componentDidMount() {
    this.infiniteLoop();
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.fadingContainer,
            {
              opacity: this.state.fadeAnim // Bind opacity to animated value
            }
          ]}
        >
          <Text style={styles.fadingText}>{this.state.currentAchievement}</Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  fadingContainer: {
    paddingVertical: 8,
    width: width -20,
    //backgroundColor: "#60DBC5",
    //borderWidth: 2
  },
  fadingText: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
});

export default AchievementsCarousel;