import {
	View,
	Text,
	StyleSheet,
	SafeAreaView,
	Image,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useSelector, useDispatch} from 'react-redux';
import {removePhoto} from '../reducers/user';
import {ImageBackground} from 'react-native';


import React from 'react';

const photosData = [
	'https://res.cloudinary.com/babahedz/image/upload/v1686507914/4_dh1u9w.png',
	'https://res.cloudinary.com/babahedz/image/upload/v1686507914/1_f3guh8.png',
	'https://res.cloudinary.com/babahedz/image/upload/v1686507914/2_lrjyge.png',
	'https://res.cloudinary.com/babahedz/image/upload/v1686507913/3_hm866a.png',
]

export default function GalleryScreen() {
	const user = useSelector((state) => state.user.value);
	const dispatch = useDispatch();
	
	const photos = photosData.map((photo, i) => {
		return (
			<View key={i} style={styles.picsContainer}>
				
				<TouchableOpacity onPress={() => dispatch(removePhoto(photo))}>
					<FontAwesome name="times" size={20} style={styles.icon}/>
				</TouchableOpacity>
				<Image source={{uri: photo}} style={styles.image}/>
			</View>
		);
	});
	
	return (
		<SafeAreaView style={styles.container}>
			<ImageBackground source={require('../assets/prism.png')}>
				<View style={styles.container2}>
					<Text style={styles.title}>Ma Galerie</Text>
					<Text style={styles.log}>Logged as : {user.email}</Text>
					<ScrollView contentContainerStyle={styles.galleryContainer}>
						{photos}
					</ScrollView>
				</View>
			</ImageBackground>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	container2: {
		flex: 1,
		alignItems: 'center',
		marginTop: '8%',
	},
	picsContainer: {
		alignItems: 'flex-end',
	},
	image: {
		width: 150,
		height: 150,
		margin: 10,
	},
	galleryContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		marginTop: 60,
	},
	icon: {
		marginRight: 10,
		color: '#fff',
	},
	title: {
		fontSize: 30,
		marginVertical: 18,
		fontWeight: 'bold',
		color: '#fff',
	},
	log: {
		color: '#fff',
		fontWeight: 'bold',
	}
});
