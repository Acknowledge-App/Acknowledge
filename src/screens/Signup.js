import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

// Imports from redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  updateEmail,
  updatePassword,
  signup,
} from '../redux/user/user.actions';

class Signup extends React.Component {
  handleSignUp = () => {
    this.props.signup();
  };

  render() {
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.title}>Create an account today</Text>
          <TextInput
            style={styles.inputBox}
            value={this.props.user.email}
            onChangeText={(email) => this.props.updateEmail(email)}
            placeholder="Your Email"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.inputBox}
            value={this.props.user.password}
            onChangeText={(password) => this.props.updatePassword(password)}
            placeholder="Your Password"
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.button} onPress={this.handleSignUp}>
            <Text style={styles.buttonText}>Signup</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Login')}
          >
            <Text style={styles.buttonText}>Back to Login</Text>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputBox: {
    width: '85%',
    margin: 10,
    padding: 15,
    fontSize: 16,
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    textAlign: 'center',
  },
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: '#60DBC5',
    borderColor: '#60DBC5',
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonSignup: {
    fontSize: 12,
  },
  title: {
    fontSize: 45,
    marginBottom: 40,
    textAlign: 'center',
  },
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ updateEmail, updatePassword, signup }, dispatch);
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
