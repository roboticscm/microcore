import { BehaviorSubject } from "rxjs";

export class LoginInfo {
    static userId = undefined;
    static accountAvatar$ = new BehaviorSubject(undefined);
    static username = undefined;
    static displayName$ = new BehaviorSubject(undefined);
    static locale$ = new BehaviorSubject(undefined);
    static branch$ = new BehaviorSubject(undefined);
    static currentMenu$ = new BehaviorSubject(undefined);

    static reset() {
        LoginInfo.userId = undefined;
        LoginInfo.accountAvatar$ = new BehaviorSubject(undefined);
        LoginInfo.username = undefined;
        LoginInfo.displayName$ = new BehaviorSubject(undefined);
    }
}
