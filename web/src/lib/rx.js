import { fromEvent, merge, EMPTY, BehaviorSubject } from 'rxjs';

export const fromEvents = (dom, ...eventNames) => {
  return eventNames.reduce((prev, name) => merge(prev, fromEvent(dom, name)), EMPTY);
};

export const debounceTime = (ms, fn) => {
  let timer;
  return function() {
    clearTimeout(timer);
    let args = Array.prototype.slice.call(arguments);
    args.unshift(this);
    timer = setTimeout(fn.bind.apply(fn, args), ms);
  };
};

export class SuntechSubject extends BehaviorSubject {
  constructor(initValue) {
    super(initValue);
  }

	set(value) {
		super.next(value);
	}
	
	lift(operator) {
		const result = new SuntechSubject();
		result.operator = operator;
		result.source = this;
		return result;
	}
}
