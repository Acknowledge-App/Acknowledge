import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

// Imports for redux state storage
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  updateEmail,
  updatePassword,
  login,
  getUser,
  passwordReset
} from '../redux/user/user.actions';
import Firebase from '../../config/Firebase';

class Password extends React.Component {
  handlePasswordReset = () => {
    this.props.passwordReset();
  };


  render() {
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.text}>Enter your Email</Text>
          <TextInput
            style={styles.inputBox}
            value={this.props.user.email}
            onChangeText={(email) => this.props.updateEmail(email)}
            placeholder="Email"
            autoCapitalize="none"
          />
        
          <TouchableOpacity
            style={styles.button}
             onPress={this.handlePasswordReset}
          >
            <Text style={styles.buttonText}>Reset password </Text>
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
    marginTop: 20,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: '#60DBC5',
    borderColor: '#60DBC5',
    borderWidth: 1,
    borderRadius: 5,
    width: 300,
  },
  signUpButton:{
    marginTop: 70,
    marginBottom: 20,
    paddingVertical: 5,
    alignItems: 'center',
    backgroundColor: '#60DBC5',
    borderColor: '#60DBC5',
    borderWidth: 1,
    borderRadius: 5,
    width: 300,
  }
  ,
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  buttonTextLong: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  buttonSignup: {
    fontSize: 12,
  },
  title: {
    fontSize: 45,
    marginBottom: 40,
    textAlign: 'center',
  },
  text: {
    fontSize: 30,
    marginBottom: 100,
    textAlign: 'center',
  },
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { updateEmail, updatePassword, login, getUser, passwordReset },
    dispatch
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Password);
