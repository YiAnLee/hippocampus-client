import React from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TouchableHighlight,
  Modal,
  CameraRoll,
  Image,
  Dimensions,
  ScrollView,
  Text
} from 'react-native';



import {connect} from 'react-redux';
import {createPost, input, inputDanger} from '../states/post-actions';
import {setToast} from '../states/toast';




import {Container, Header, Content, Title, Left, Right, Body, Icon, Button, Item, Label, Input, TouchableOpacity} from 'native-base';
import appColors from '../styles/colors';
import {getMoodIcon} from '../utilities/weather';

import MIcon from 'react-native-vector-icons/MaterialIcons';
import EIcon from 'react-native-vector-icons/Entypo';

import pick from "../api/imageAPI.js";
import MyIcon from "react-native-vector-icons/Entypo";

const { width } = Dimensions.get('window')
class PostFormScreen extends React.Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        mood: PropTypes.string.isRequired,
        inputValue: PropTypes.string.isRequired,
        inputDanger: PropTypes.bool.isRequired
    };

    constructor(props) {
        super(props);

        this.handleGoBack = this.handleGoBack.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleCreatPost = this.handleCreatPost.bind(this);

        this.show = this.show.bind(this);


        this.state = {
            modalVisible: false,
            photos: [],
            index: null,
            source: null,
            data: null,
            name: null
          }

    }

    render() {
        const {navigate} = this.props.navigation;
        const {mood, inputValue, inputDanger} = this.props;
        let img = this.state.source === null? null:
        <Image source={this.state.source} style={styles.avatar}/>

        return (
            <Container>
                <Header>
                    <Left><Button transparent
                        onPress={this.handleGoBack}>
                        <Icon name='arrow-left'  style={{fontSize: 24}} />
                    </Button></Left>
                    <Body><Title>New Post</Title></Body>
                    <Right><Button transparent onPress={this.handleCreatPost}>
                        <Icon name='check'  style={{fontSize: 24}} />
                    </Button></Right>
                </Header>
                <Content style={styles.content}>



                    {/*<Button onPress={() => navigate('Upload')}></Button>*/}


                    <Button
                      title='View Photos'
                      onPress={() => { this.toggleModal(); this.getPhotos() }}
                    ><MIcon name="camera-roll"/></Button>
                    {/*{getMoodIcon({
                        group: mood,
                        size: 120,
                        style: styles.mood
                    })}*/}
                    <Item regular error={inputDanger} style={styles.item}>
                         {/*<Label>What's on your mind?</Label>*/}
                        <Input autoFocus multiline maxLength={1024} placeholder="What's on your mind?"
                             style={styles.input} value={inputValue}
                             onChange={this.handleInputChange} />
                    </Item>


                    <Modal
                     animationType={"slide"}
                     transparent={false}
                     visible={this.state.modalVisible}
                     onRequestClose={() => console.log('closed')}
                    >
                     <View style={styles.modalContainer}>
                       <Button
                         title='Close'
                         onPress={this.toggleModal}
                        ><EIcon name="cross" style={{fontSize: 24}} /></Button>
                       <ScrollView
                         contentContainerStyle={styles.scrollView}>
                         {
                           this.state.photos.map((p, i) => {
                             return (
                               <TouchableHighlight
                                 style={{opacity: i === this.state.index ? 0.5 : 1}}
                                 key={i}
                                 underlayColor='transparent'
                                 onPress={() => this.setIndex(i)}
                               >
                                 <Image
                                   style={{
                                     width: width/3,
                                     height: width/3
                                   }}
                                   source={{uri: p.node.image.uri}}
                                 />

                               </TouchableHighlight>
                             )
                           })
                         }
                       </ScrollView>

                     </View>
                   </Modal>

                   <Button onPress={this.show}>
                       <Text>Select a Photo</Text>
                   </Button>
                   {/*<TouchableOpacity onPress={this.upload}>
                       <Text>Upload a Photo</Text>
                   </TouchableOpacity>*/}
                   {img}

                </Content>
            </Container>
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


    setIndex = (index) => {
   if (index === this.state.index) {
     index = null
   }
       this.setState({ index })
     }

     getPhotos = () => {
       CameraRoll.getPhotos({
         first: 20,
         assetType: 'All'
       })
       .then(r => {this.setState({ photos: r.edges }); console.log(r.edges)})
     }
     toggleModal = () => {
        this.setState({ modalVisible: !this.state.modalVisible });
      }
      navigate = () => {
    const { navigate } = this.props.navigation
    navigate('ImageBrowser')
  }
    handleGoBack() {
         this.props.navigation.goBack();
    }

    handleInputChange(e) {
        const {inputDanger: danger, dispatch} = this.props;
        const inputValue = e.nativeEvent.text;
        if (danger)
            dispatch(inputDanger(false));
        dispatch(input(inputValue));
    }

    handleCreatPost() {
        const {mood, inputValue, dispatch} = this.props;
        const {goBack} = this.props.navigation;
        if (inputValue) {
            dispatch(createPost(mood, inputValue, source)).then(() => {
                dispatch(setToast('Posted.'));
            });
            goBack();
        } else {
            dispatch(inputDanger(true));
        }
        this.setState({
            source: null,
            data: null,
            name: null
        });
    }
}

const styles = {
    avatar:{
        width:150,
        height:150
    },
    content: {
        backgroundColor: appColors.primaryLight
    },
    mood: {
        color: appColors.primaryLightText,
        textAlign: 'center',
        marginTop: 32,
        marginBottom: 32,
    },
    item: {
        marginLeft: 16,
        marginRight: 16,
        borderRadius: 4,
        backgroundColor: '#fff'
    },
    input: {
        height: 100
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

export default connect(state => ({
    ...state.postForm
}))(PostFormScreen);
