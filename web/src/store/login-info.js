import { BehaviorSubject } from "rxjs";

export class LoginInfo {
    static userId$ = new BehaviorSubject(undefined);
    static accountAvatar$ = new BehaviorSubject(undefined);
    static username$ =new BehaviorSubject(undefined);
    static displayName$ = new BehaviorSubject(undefined);
    static locale$ = new BehaviorSubject(undefined);
    static branch$ = new BehaviorSubject(undefined);
    static currentMenu$ = new BehaviorSubject(undefined);

    static reset() {
        LoginInfo.userId$.next(undefined);
        LoginInfo.accountAvatar$.next(undefined);
        LoginInfo.username$.next(undefined);
        LoginInfo.displayName$.next(undefined);
    }
}
