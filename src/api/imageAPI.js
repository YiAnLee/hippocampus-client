var ImagePicker = require('react-native-image-picker');

var options = {
  // title: 'Select Avatar',
  // customButtons: [
  //   {name: 'fb', title: 'Choose Photo from Facebook'},
  // ],
  cancelButtonTitle: "cancel",
    storageOptions: {
        skipBackup: true
        // path: 'Documents'
    }
};

const pick = (cb) => {
    console.log('pick');
    ImagePicker.showImagePicker(options, (response) => {
        console.log('tt');
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
        let source = { uri: response.uri };
        cb(source, response.data, response.fileName);
        }
    });
}

module.exports = pick;
