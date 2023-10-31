import React, { useRef, useState, useContext } from 'react';
import { View, TouchableWithoutFeedback, Text, ActivityIndicator } from 'react-native';
import Video from 'react-native-video';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import HomeComponent from '../../component/home/HomeComponent';
import styles from './styles';
import CustomFooter from '../../component/customHeader/footer';
import { RouterNames } from '../../constants/routeNames';
import { Enums } from '../../constants/Enum/enum';
import DoubleClick from 'react-native-double-tap'
import { AuthContext } from '../../context/context'
import { GlobalContext } from '../../context/Provider';
import { dashboardAction } from '../../context/actions/dashboardAction';
import { DASHBOARD_FAIL, DASHBOARD_LOADING, DASHBOARD_SUCCESS } from '../../constants/actionTypes';
import { APIs } from '../../constants/api';
import axios from "react-native-axios";
import axiosManager from '../../helpers/axiosHandler';
const HomeScreen = ({ navigation }) => {

    const { signOut } = React.useContext(AuthContext)
    const [pause, setPause] = useState(false);
    const [count, setCount] = useState(0);
    const pressLike = () => setCount(prevCount => prevCount + 1);
    const [currentRenderVideoIndex, setCurrentRenderVideoIndex] = useState(0);
    // const { authState, authDispatch} = useContext(GlobalContext);
    const [users, setUsers] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);

    const viewabilityConfig = {
        itemVisiblePercentThreshold: 95,
        waitForInteraction: true,
    };

    const videoRef = useRef(null)
    const onBuffer = (e) => {
        // setIsLoading(false)
    //    buffering: true
        // console.log("buffering....", e)
    }
    const onError = (e) => {
        // console.log("error released....", e)
    }
    const onLoad = (e)=>{
        // console.log("error loader....", e)
        /* set loader to true*/}

    const navigatePage = (index) => {
        var link = RouterNames.HOME_SCREEN;
        switch (index) {
            case Enums.HomeIconRedirection.HOME:
                link = RouterNames.HOME_SCREEN; break;
            case Enums.ChallengeIconRedirection.CREATE_CHALLENGE_SCREEN:
                link =RouterNames.CHALLENGE, {screen:RouterNames.CHALLENGE_SCREEN}; break;
            case Enums.HomeIconRedirection.PROFILE:
                link = RouterNames.PROFILE_SCREEN; break;
            default: break;
        }
        // console.log("....", link)
        navigation.navigate(link)
    }
    const onViewableItemsChanged = ({ viewableItems, changed }) => {

        if (viewableItems !== undefined) {
            if (viewableItems.length > 0) {
                // console.log(viewableItems[0].index)
                setCurrentRenderVideoIndex(viewableItems[0].index ?? 0)
            }
        }
    }

    React.useEffect(() => {
        async function fetchMyAPI() {
            const url = APIs.BASE_URL + APIs.DASHBOARD_LINK
            const param = {
                
            }
                await axiosManager.post(url, param).then(response =>{
                    console.log(response)
                setUsers(response.data)

            }).catch(error => {
                showError(error.response.data.response.message)

            })
        }
        // setIsLoading(false);
        fetchMyAPI()
    
    }, [])


    // const callDashboardAPI = async () => {

    //     authDispatch({
    //         type: DASHBOARD_LOADING
    //     })
    //     try {
    //         const res = await dashboardAction();
    //         authDispatch({
    //             type: DASHBOARD_SUCCESS,
    //             payload: res
    //         })
    //         setUsers(res)

    //     } catch (error) {
    //          console.log("error is ", error)
    //         authDispatch({
    //             type: DASHBOARD_FAIL,
    //             payload: error
    //         });
    //     }
    // }

    return (
        <View style={{ flex: 1 }}>
            <View >
                <SwiperFlatList vertical data={users}
                    // onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={viewabilityConfig}
                    slidesToScroll={3}
                    renderAll={true}
                    renderItem={({ item, index }) => (
                    (item.type==="video/mp4" && 
                        <View>
                            <DoubleClick
                                singleTap={() => {
                                    console.log("single tap")
                                }}
                                doubleTap={() => {
                                    console.log("double tap");
                                    signOut()
                                }}>
                                <Video source={{ uri: item.original_url}}
                                    ref={videoRef} 
                                    onBuffer={onBuffer}
                                     onError={onError} 
                                    // onLoad={onLoad}
                                    repeat
                                    // paused={true}
                                     style={styles.bgvideo}
                                    resizeMode="cover" 
                                    // paused={index !== currentRenderVideoIndex} 
                                    muted autoplay
                                />
                            </DoubleClick>

                            <HomeComponent item={item} index={index} />

                        </View>
                        )
                    )}
                    keyExtractor={(item, index) => index.toString()}
                />
                 <View style={{
         position: 'absolute',
         bottom: 0,
      }}>
      <CustomFooter didTapped={(index) => {
        console.log("sf", index)
        navigatePage(index)}}/>
      </View>
            </View>
        </View>
    )
};
export default HomeScreen;