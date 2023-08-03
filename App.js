import Fontawesome from 'react-native-vector-icons/FontAwesome';

//config redux
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import HomeScreen from './screens/HomeScreen';
import SnapScreen from './screens/SnapScreen';
import GalleryScreen from './screens/GalleryScreen';

import user from './reducers/user';
import {LinearGradient} from "expo-linear-gradient";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const store = configureStore({
	reducer: {user},
});

const TabNavigator = () => {
	return (
		<Tab.Navigator
			screenOptions={({route}) => ({
				tabBarBackground: () => (
					<LinearGradient colors={['#dc04da', '#7c02ff', '#00caef']}
					                start={{x: 0, y: 0.5}}
					                end={{x: 1, y: 1}} style={{
						height: 70, borderTopLeftRadius: 20,
						borderTopRightRadius: 20
					}}/>
				),
				tabBarStyle: {
					height: 60,
					backgroundColor: '#000000',
					borderTopWidth: 1,
					borderTopColor: '#000000',
					
				},
				tabBarIcon: ({color, size}) => {
					let iconName = '';
					
					if (route.name === 'Snap') {
						iconName = 'camera';
					} else if (route.name === 'Gallery') {
						iconName = 'image';
					}
					
					return <Fontawesome name={iconName} color={color} size={size}/>;
				},
				tabBarLabelStyle: {
					fontSize: 16, // Ajuste ici la taille du texte des onglets
					fontWeight: 'bold',
				},
				tabBarActiveTintColor: '#f6d604',
				tabBarInactiveTintColor: '#ab7345',
				headerShown: false,
			})}
		>
			<Tab.Screen name="Snap" component={SnapScreen}/>
			<Tab.Screen name="Gallery" component={GalleryScreen}/>
		</Tab.Navigator>
	);
};

export default function App() {
	return (
		<Provider store={store}>
			<NavigationContainer>
				<Stack.Navigator screenOptions={{headerShown: false}}>
					<Stack.Screen name="Home" component={HomeScreen}/>
					<Stack.Screen name="TabNavigator" component={TabNavigator}/>
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}
