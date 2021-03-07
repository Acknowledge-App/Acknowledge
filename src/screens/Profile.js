import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Switch } from 'react-native';

import Firebase from '../../config/Firebase';
import { logout } from '../redux/user/user.actions';
import { useSelector, useDispatch } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';

// Imports for Push Notifications

import * as Notifications from 'expo-notifications';
import {
  schedulePushNotification,
  registerForPushNotificationsAsync,
} from '../notifications/pushNotifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

function Profile() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const logOut = () => dispatch(logout());
  const [date, setDate] = useState(new Date(51730000));
  const [hours, setHours] = useState(12);
  const [minutes, setMinutes] = useState(0);

  // State and Refs for push notifications
  const [notifications, setNotifications] = useState(false);
  const [expoPushToken, setExpoPushToken] = useState('');
  const notificationListener = useRef();
  const responseListener = useRef();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    let d = new Date(selectedDate);
    setHours(d.getHours());
    setMinutes(d.getMinutes());
    schedulePushNotification(d.getHours(), d.getMinutes());
  };

  const toggleNotifications = async () => {
    if (notifications) {
      await Notifications.cancelAllScheduledNotificationsAsync();
    }
    setNotifications(!notifications);
  };

  useEffect(() => {
    let isMounted = true;

    registerForPushNotificationsAsync().then((token) => {
      if (isMounted) setExpoPushToken(token);
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(
      (notification) => {
        setNotification(notification);
      }
    );

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(
      (response) => {}
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
      isMounted = false; // use effect cleanup to set flag false, if unmounted
    };
  }, []);

  const handleSignout = () => {
    Firebase.auth().signOut();
    logOut();
  };

  return (
    <>
      <View>
        <Text style={styles.text}>{user.email}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.switchText}>Enable push notifications</Text>
          <Switch
            style={styles.switchText}
            onChange={toggleNotifications}
            value={notifications}
          ></Switch>
        </View>
        {notifications && (
          <DateTimePicker
            testID="dateTimePicker"
            timeZoneOffsetInMinutes={0}
            value={date}
            mode="time"
            is24Hour={true}
            display="default"
            onChange={onChange}
          />
        )}
        <View style={styles.center}>
          <TouchableOpacity style={styles.button} onPress={handleSignout}>
            <Text style={styles.buttonText}>Log out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 30,
    marginBottom: 20,
    paddingVertical: 5,
    backgroundColor: '#60DBC5',
    borderColor: '#60DBC5',
    borderWidth: 1,
    borderRadius: 5,
    width: 200,
  },
  center: {
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  text: {
    margin: 20,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  switchText: {
    margin: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  iconButton: {
    backgroundColor: 'rgba(46, 113, 102, 0.8)',
    position: 'absolute',
    right: 0,
    top: 40,
    margin: 10,
  },
});

export default Profile;
