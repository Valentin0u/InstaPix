import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	ImageBackground,
	Image,
	TextInput,
	KeyboardAvoidingView,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {updateEmail} from '../reducers/user';
import React, {useState} from 'react';

export default function HomeScreen({navigation}) {
	const dispatch = useDispatch();
	
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState(false);
	
	const emailRegex = /\S+@\S+\.\S+/;
	
	const handleButton = () => {
		if (!emailRegex.test(email)) {
			setEmailError(true);
		} else {
			navigation.navigate('TabNavigator', {screen: 'Gallery'});
			dispatch(updateEmail(email));
			setEmailError(false);
			setEmail('');
		}
	};
	
	return (
		
		<KeyboardAvoidingView style={styles.container}>
			<Image source={require('../assets/camera.png')} style={styles.image}/>
			<Text style={styles.title}>InstaPix</Text>
			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholder="Email" placeholderTextColor='#fff'
					onChangeText={(value) => setEmail(value.toLowerCase())}
					value={email}
				/>
				{emailError && (
					<Text style={styles.error}>Invalid email address</Text>
				)}
				<TouchableOpacity
					style={styles.button}
					onPress={() => handleButton()}
				>
					<Text style={styles.textButton}>Ma Galerie</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	background: {
		width: '100%',
		height: '100%',
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		
	},
	image: {
		width: '100%',
		height: '100%',
	},
	title: {
		position: 'absolute',
		top: '15%',
		color: '#fff',
		fontSize: 60,
		fontWeight: 'bold',
		textShadowColor: '#521cc2',
		textShadowOffset: {
			width: 4,
			height: 3,
		},
		textShadowRadius: 10,
	},
	inputContainer: {
		position: 'absolute',
		backgroundColor: 'rgba(0,0,0,0.58)',
		width: '80%',
		top: '69%',
		padding: 20,
		borderRadius: 10,
		
	},
	input: {
		borderBottomWidth: 1,
		paddingBottom: 6,
		fontSize: 17,
		color: '#fff',
		
	},
	button: {
		backgroundColor: '#521cc2',
		marginTop: 50,
	},
	textButton: {
		color: '#fff',
		textAlign: 'center',
		padding: 5,
		fontSize: 20,
		fontWeight: 'bold',
	},
	error: {
		color: 'red',
		marginTop: 10,
	},
});
