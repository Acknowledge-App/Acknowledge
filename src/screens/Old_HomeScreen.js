import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';


function HomeScreen() {

  return (
    <>
      <LinearGradient
        colors={['#60DBC5', '#B2F0E5', '#68EDD5','#70FFE5','#60DBC5']}
        style={{flex: 1}}
        //  Linear Gradient 
        // start={{ x: 0, y: 0 }}
        // end={{ x: 0, y: 1 }}

        // Linear Gradient Reversed
        // start={{ x: 0, y: 1 }}
        // end={{ x: 1, y: 0 }}

        // Horizontal Gradient
        // start={{ x: 0, y: 0 }}
        // end={{ x: 1, y: 0 }}

        // Diagonal Gradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Welcome to Acknowledge</Text>

          <Text style={styles.body}>

          This is a space for you to acknowledge everything you achieve and are proud of each day.
          There are things you maybe didn’t want to do, but you still did them {"\n"}{"\n"}
          
          You can tag each entry to see where it sits and what is covers -
          get present to everything that you are already doing.{"\n"}{"\n"}
          
          No stress, no pressure, you’re doing enough. 
          Here is where you can see it all and give yourself credit. {"\n"}{"\n"}
          </Text>
        </View>
        </View>
      </LinearGradient>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingHorizontal: 10,
    paddingVertical: 20
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex:1
  },
  body: {
    fontSize: 20,
    textAlign: 'justify'
  },
  title: {
    fontSize: 45,
    marginBottom: 40,
    textAlign: 'center'
  },
})

export default HomeScreen
