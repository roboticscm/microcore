import { Errors } from './errors';
import { RxHttp } from '../rx-http';
import { BJSON } from '../bjson';

export default class Form {
  constructor(data, autoReset = true) {
    this.originalData = data;
    for (let field in data) {
      this[field] = data[field];
    }
    this.errors = new Errors();
    this.autoReset = autoReset;
  }

  data() {
    let data = {};
    for (let property in this.originalData) {
      data[property] = this[property];
    }
    return data;
  }

  reset() {
    if (this.autoReset) {
      for (let field in this.originalData) {
        if (typeof this[field] === 'number') {
          if (field === 'id') {
            this[field] = null;
          } else {
            this[field] = 0;
          }
        } else {
          this[field] = '';
        }
      }
    }
    this.errors.clearAll();
  }

  post(baseUrl, url) {
    return this.submit('post', baseUrl, url);
  }

  put(baseUrl, url) {
    return this.submit('put', baseUrl, url);
  }

  patch(baseUrl, url) {
    return this.submit('patch', baseUrl, url);
  }

  delete(baseUrl, url) {
    return this.submit('delete', baseUrl, url);
  }

  submit(requestType, baseUrl, url) {
    return RxHttp.callApi(requestType, baseUrl, url, undefined, BJSON.stringify(this.data()));
  }

  recordErrors(error) {
    if (error.field) {
      this.errors.record({ [error.field]: error.message });
    } else if (error.unknownError){
      throw error;
    } else {
      this.errors.record(error);
    }

    return this.errors.errors;
  }
}
