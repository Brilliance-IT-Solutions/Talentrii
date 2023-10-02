import { useNavigation } from '@react-navigation/native';

const useCustomNav = () => {
    const navigation = useNavigation();
    const goTo = to => navigation.navigate(to);
    const goBack = back =>  navigation.goBack(back)    
    return { goTo, goBack };
};
export default useCustomNav;