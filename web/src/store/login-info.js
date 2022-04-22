import { getMenu } from "$src/components/nav/helper";
import { BehaviorSubject } from "rxjs";

export class LoginInfo {
    static userId$ = new BehaviorSubject(undefined);
    static accountAvatar$ = new BehaviorSubject(undefined);
    static username$ = new BehaviorSubject(undefined);
    static email$ = new BehaviorSubject(undefined);
    static displayName$ = new BehaviorSubject(undefined);
    static locale$ = new BehaviorSubject(undefined);
    static branch$ = new BehaviorSubject(undefined);
    static currentMenu$ = new BehaviorSubject(undefined);

    static set(body) {
        const { accountAvatar, branchId, menuId, accountId, username, displayName, email, locale } =
            body;
        LoginInfo.accountAvatar$.next(accountAvatar);
        LoginInfo.branch$.next(branchId);
        // LoginInfo.currentMenu$.next(getMenu(menuId));
        LoginInfo.displayName$.next(displayName);
        LoginInfo.locale$.next(locale);
        LoginInfo.userId$.next(accountId);
        LoginInfo.username$.next(username);
        LoginInfo.email$.next(email);
    }
}
