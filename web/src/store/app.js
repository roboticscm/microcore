import { BehaviorSubject } from 'rxjs';

export class AppStore {
    static resources$ = new BehaviorSubject({});
    static notify$ = new BehaviorSubject(undefined);
    static formLoading$ = new BehaviorSubject(false);
}