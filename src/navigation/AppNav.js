import React, {useContext, useEffect} from 'react';

import { NavigationContainer } from '@react-navigation/native';
import VersionCheck from 'react-native-version-check';

import {
    StatusBar,
    useColorScheme,
    Alert, 
    Linking, 
    Platform,
    View, 
    ActivityIndicator
  } from 'react-native';

import {
    Colors,
  } from 'react-native/Libraries/NewAppScreen';

import BottomTabs from './BottomMenu';
import AuthStack from './AuthStack';
import { AuthContext } from '../context/AuthContext';
import Loading from '../components/Loading';
import { BASE_URL } from '../config';


const AppNav: () => Node = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const {isLoading, userToken} = useContext(AuthContext);

    useEffect(()=>{
      checkForUpdates();
    },[])

    const checkForUpdates = async () => {

      try {
        
        // const OsVer = Platform.constants['Release'];
        // Alert.alert(
        //   'Version:',
        //   ''+VersionCheck.getCurrentVersion()+'/'+OsVer,
        //   [
        //     {
        //       text: 'update',
        //       onPress: () => {
        //         // // Open the app store URL for updating
               
        //       // Linking.openURL('https://apps.apple.com/es/app/floc/id6444729278');
        //       },
        //     },
        //   ],
        //   { cancelable: false }
        // );
        
          VersionCheck.getLatestVersion({
            forceUpdate: true,
            provider: () => fetch(BASE_URL+(Platform.OS === 'ios' ? '/ios-version' : '/play-version'))
              .then(r => r.json())
              .then(({version}) => version),   // You can get latest version from your own api.
          }).then(latestVersion =>{
           
            console.log(latestVersion);
            VersionCheck.needUpdate({
              currentVersion: VersionCheck.getCurrentVersion(),
              latestVersion: latestVersion
            }).then(res => {
              console.log(VersionCheck.getCurrentVersion())
              console.log(latestVersion)
              console.log(res.isNeeded);  // true
              console.log('storeURL:')
              console.log(res.storeUrl)
             if(res.isNeeded) showUpdateAlert(res.storeUrl);
            });
          });
        
       // const latestVersion = await VersionCheck.needUpdate(); // Check for updates using react-native-version-check
        //console.log(latestVersion)
        // if (latestVersion.isNeeded) {
        //   // New version available
        //   showUpdateAlert();
        // } else {
        //   // No new version
        //   console.log('No updates available');
        // }
      } catch (error) {
        console.error('Error checking for updates:', error);
      }
    };

    const showUpdateAlert = (url) => {
      Alert.alert(
        'Update Available',
        'A new version of the app is available. Update now?',
        [
          {
            text: 'Update',
            onPress: () => {
              // // Open the app store URL for updating
               VersionCheck.getStoreUrl().then(res => {
                 console.log(res);  // true
                 Linking.openURL(res);
              });
             
            },
          },
        ],
        { cancelable: false }
      );
    };
  
    //console.log(`Auth Context userTokenm value: ${userToken}`);
    const backgroundStyle = {
      backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };

    if( isLoading ) {
        return(
            <Loading />
            // <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
            //     <ActivityIndicator size={'large'}/> 
            // </View>
        )
    }
    
    return (
      <NavigationContainer>
       <StatusBar barStyle={'dark-content'} hidden={false} />
        {/* TODO: check update needed... */}
        { userToken !== null ? <BottomTabs /> : <AuthStack />}
      </NavigationContainer>
    );
  };

export default AppNav;