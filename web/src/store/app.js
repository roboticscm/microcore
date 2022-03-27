import { BehaviorSubject } from 'rxjs';

export class AppStore {
    static resources$ = new BehaviorSubject({});
    static notify$ = new BehaviorSubject(undefined);
    static locale$ = new BehaviorSubject(undefined);
    static currentMenu$ = new BehaviorSubject(undefined);
}