function AchievementMessage({ navigation }) {
    alert(
      'Congratulations!',
      "You've added 5 acknowledgements! Keep going :)",
      [
        {
          text: 'Okay',
          onPress: () => console.log('Okay Pressed'),
          style: 'cancel'
        },
      ]
    );
  };

export default AchievementMessage;