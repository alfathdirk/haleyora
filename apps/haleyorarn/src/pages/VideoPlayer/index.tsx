import { GlobalStyles } from "ColorScheme";
import Text from "components/text";
import React, { useEffect, useRef, useState } from "react";
import { Button, Dimensions, StyleSheet, View } from "react-native";
import { OrientationLocker } from "react-native-orientation-locker";
import Video from 'react-native-video';

var styles = StyleSheet.create({
    backgroundVideo: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    container: {
        flex: 1,
        backgroundColor: '#000',
    },
  });
const VideoPlayer = () => {
    const videoRef = useRef(null);
    const [showVideo, setShowVideo] = useState(false);
    const [loading, setLoading] = useState(false);
    const background = 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4'

    const onBuffer = () => {
        console.log("onBuffer")
    }
    const onError = () => {
        console.log("onError")
    }

    useEffect(() => {
        setLoading(true)
        if(!showVideo) {
            setTimeout(() => {
                setShowVideo(true)
                setLoading(false)
            }, 1000)
        }
        if(showVideo) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            videoRef?.current?.presentFullscreenPlayer()
        }
    }, [showVideo])

    return (
        <View style={styles.container}>
            <OrientationLocker
                orientation={"PORTRAIT"}
                onChange={orientation => console.log('onChange', orientation)}
                onDeviceChange={orientation => console.log('onDeviceChange', orientation)}
            />
            {showVideo && (
                <>
                <OrientationLocker orientation="LANDSCAPE" />
                
                <Video
                    ref={videoRef}
                    source={{ uri: background }}
                    style={styles.backgroundVideo}
                    controls={true}
                    onBuffer={onBuffer}
                    onError={onError}
                    resizeMode="contain"
                />
            </>
            )}
        </View>
    )
}
        
       
export default VideoPlayer;