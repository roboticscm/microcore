

export class SettingService {
    static getInitialUserSetting = () => {
        return new Promise((resolve, reject) => {
            resolve({
                userId: '1',
                accountAvatar: '',
                displayName: '',
                locale: '',
                menuCode: '' 
            });
        });
    }

    static saveUserSetting = () => {

    }

    static findUserSetting = () => {

    }
}