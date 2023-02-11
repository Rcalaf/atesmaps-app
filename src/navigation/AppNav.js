import React, {useContext} from 'react';

import { NavigationContainer } from '@react-navigation/native';

import {
    StatusBar,
    useColorScheme,
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


const AppNav: () => Node = () => {
    const isDarkMode = useColorScheme() === 'dark';
    const {isLoading, userToken} = useContext(AuthContext);
  
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
       <StatusBar barStyle={'light-content'} hidden={true} />
        { userToken !== null ? <BottomTabs /> : <AuthStack />}
      </NavigationContainer>
    );
  };

export default AppNav;