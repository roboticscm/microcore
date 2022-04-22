import { post } from "$lib/http";
import { error } from "$src/lib/log";
import { LoginInfo } from "$src/store/login-info";


export class SettingService {
    static getInitialUserSetting = () => {
        return post('setting/get-initial', {
        })
    }

    static saveUserSetting = (keys, values) => {
        return post('setting/save', {
            branchId: (LoginInfo.branch$.value)?.id,
            menuId: (LoginInfo.currentMenu$.value)?.id,
            keys,
            values,
        })
    }

    static findUserSetting = () => {
        return post('setting/find', {
            branchId: (LoginInfo.branch$.value)?.id,
            menuId: (LoginInfo.currentMenu$.value)?.id,
        })
    }

    static reloadSettings = () => {
        SettingService.getInitialUserSetting()
            .then(({ body }) => {
                LoginInfo.set(body.data);
            })
            .catch((err) => {
                error(err);
            });
    };
}

export const fetchInitialUserSetting = async (fetch) => {
    try {
        const res = await fetch(`${import.meta.env.VITE_API_PREFIX}setting/get-initial`, {
            method: 'POST',
            body: JSON.stringify({})
        });

        if(res.ok) {
            return (await res.json()).data
        }
    } catch (err) {
        throw err
    }
};