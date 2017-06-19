import React from 'react';
import PropTypes from 'prop-types';
import {View, Image, TouchableOpacity, Text} from 'react-native';
import {FAB} from 'native-base';

import MyIcon from "react-native-vector-icons/Entypo";
import pick from "../api/imageAPI.js";
import {RNS3} from 'react-native-aws3';
export default class UploadScreen extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fabActive: false,
            source: null,
            data: null,
            name: null
        };

        // this.handleFabClose = this.handleFabClose.bind(this);
        this.show = this.show.bind(this);
        this.upload = this.upload.bind(this);
    }



    render() {
        const {navigate} = this.props.navigation;

        let img = this.state.source === null? null:
        <Image source={this.state.source} style={styles.avatar}/>
        console.log("source",this.state.source);
        return (
            <View style={styles.container}>
                {/*<Fab
                    active={this.state.fabActive}
                    direction='right'
                    containerStyle={styles.fabContainer}
                    style={styles.fab}
                    position='topLeft'
                    onPress={this.handleFabClose}>
                    <MyIcon name='list' size={25} color='white '/>
                    <Button style={styles.hamburgerItem}
                        title=''
                        onPress={() => navigate('Stylist')}>
                        <MyIcon name='home' size={25} color='white'/>
                    </Button>
                    <Button style={styles.hamburgerItem}
                        title=''
                        onPress={() => navigate('Profile')}>
                        <MyIcon name='user' size={25} color='white' />
                    </Button>
                    <Button style={styles.hamburgerItem}
                        title=''
                        onPress={() => navigate('Upload')}>
                        <Icon name='md-add' />
                    </Button>
                    <Button style={styles.hamburgerItem}
                        title=''
                        onPress={() => navigate('Login')}>
                        <Icon name='ios-log-out' />
                    </Button>
                </Fab>*/}
                <TouchableOpacity onPress={this.show}>
                    <Text>Select a Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.upload}>
                    <Text>Upload a Photo</Text>
                </TouchableOpacity>
                {img}

            </View>
        );
    }

    show() {
        pick((source, data, name) => {
            this.setState({
                source: source,
                data: data,
                name: name
            });
        });
    }

    upload() {
        // const {profileUsername, profileGender, profileAge, profileRegion} = this.props
        // console.log('profileUsername', profileUsername);
        // RNFetchBlob.fetch('POST', 'http://localhost:8080/api/upload', {
        //     Authorization : "Bearer access-token",
        //     otherHeader : "foo",
        //     'Content-Type' : 'multipart/form-data',
        // }, [
        //     { name : 'avatar', filename : this.state.name, data: this.state.data},
        //     { name: 'info', data: JSON.stringify({
        //       username: profileUsername,
        //       gender: profileGender,
        //       age: profileAge,
        //       region: profileRegion
        //     })}
        // ])
        // .then((res) => {
        //     console.log(res);
        // })
        // .catch((err) => {
        //     console.log(err);
        // });

        const file = {
            uri: this.state.source.uri,
            name: this.state.name,
            type: 'image/jpg'
        }

        const options = {
            keyPrefix: 'images/',
            bucket: 'hippocampus-photos',
            region: 'us-west-2',
            accessKey: 'AKIAJAPWTBWABRDLENSA',
            secretKey: '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',
            successActionStatus: 201
        }

        RNS3.put(file, options).then(response => {
            if (response.status !== 201)
                throw new Error("Failed to upload image to S3");
            // else
            //     console.log("RNS3 success")
            // console.log(response.body);

        });

        this.setState({
            source: null,
            data: null,
            name: null
        });
    }

    // handleFabClose() {
    //     this.setState({
    //         fabActive: !this.state.fabActive
    //     });
    // }
};
const styles = {
    avatar:{
        width:150,
        height:150
    },

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
      modalContainer: {
        paddingTop: 20,
        flex: 1
      },
      scrollView: {
        flexWrap: 'wrap',
        flexDirection: 'row'
      },
};
