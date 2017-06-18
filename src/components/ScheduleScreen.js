import React from 'react';
import PropTypes from 'prop-types';
import {View, TouchableWithoutFeedback} from 'react-native';
import InfiniteScrollView from 'react-native-infinite-scroll-view';

import {Container, Icon, Fab, Button, Toast} from 'native-base';
import appColors from '../styles/colors';
import appMetrics from '../styles/metrics';
import {getMoodIcon} from '../utilities/weather.js';
import NavigationContainer from './NavigationContainer';
import PostList from './PostList';
import PostItem from './PostItem';

import {connect} from 'react-redux';
import {selectMood} from '../states/post-actions';
import {setToast} from '../states/toast';

class ScheduleScreen extends React.Component {
    static propTypes = {

    };

    constructor(props) {
        super(props);

        this.state = {
            color:
        };

        this.handleFabClose = this.handleFabClose.bind(this);

    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.toast) {

        }
    }

    render() {
        const {navigate} = this.props.navigation;
        return (
            <Text>
        );
    }

    handleFabClose() {
        this.setState({fabActive: !this.state.fabActive});
    }

    handleCreatePost(mood) {
        this.handleFabClose();
        this.props.dispatch(selectMood(mood));
        this.props.navigation.navigate('PostForm');
    }
}

const styles = {
    fabMask: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: appColors.mask
    },
    fabContainer: {
        marginLeft: 10
    },
    fab: {
        backgroundColor: appColors.primary
    },
    mood: {
        backgroundColor: appColors.primaryLightBorder
    },
    moodIcon: {
        color: appColors.primaryLightText
    }
};

export default connect((state, ownProps) => ({
    creatingPost: state.post.creatingPost,
    creatingVote: state.post.creatingVote,
    toast: state.toast
}))(TodayScreen);
