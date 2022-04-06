import { post } from "$lib/http";
import { LoginInfo } from "$src/store/login-info";


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

    static saveUserSetting = (keys, values) => {
        return post('/api/setting/save-setting', {
            branchId: (LoginInfo.branch$.value)?.id,
            menuId: (LoginInfo.currentMenu$.value)?.id,
            keys,
            values,

        })
    }

    static findUserSetting = () => {

    }
}