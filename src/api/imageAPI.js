var ImagePicker = require('react-native-image-picker');

var options = {
  // title: 'Select Avatar',
  // customButtons: [
  //   {name: 'fb', title: 'Choose Photo from Facebook'},
  // ],
  cancelButtonTitle: "cancel",
  mediaType: "photo",
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

const pick = (cb) => {
    console.log("pick");
    ImagePicker.showImagePicker(options, (response) => {
        console.log('res', response);
    if (response.didCancel) {
        console.log('User cancelled photo picker');
    }
    else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
    }
    else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
    }
    else {
        console.log("success Image");
        let source = { uri: response.uri };
        // console.log("success Image",response.uri )
        cb(source, response.data, response.fileName);
        }
    });
}

module.exports = pick;
