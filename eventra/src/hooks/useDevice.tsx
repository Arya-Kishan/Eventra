import { AppConstants } from '@constants/AppConstants';
import { Share } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const useDevice = () => {

    const { top: statusBarHeight, bottom } = useSafeAreaInsets();

    const shareLink = async (link: string) => {
        try {
            const result = await Share.share({
                message: `${AppConstants.appUniversalLink}${link}`,
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log('Shared with activity type:', result.activityType);
                } else {
                    console.log('Link shared');
                }
            } else if (result.action === Share.dismissedAction) {
                console.log('Share dismissed');
            }
        } catch (error) {
            console.error('Error sharing link:', error);
        }
    };

    return ({ statusBarHeight, shareLink })
}

export default useDevice