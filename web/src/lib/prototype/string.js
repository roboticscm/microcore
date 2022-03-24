
String.prototype.insertAt = function (index, string) {
  return this.substring(0, index) + string + this.substring(index);
}

String.prototype.replaceAll = function (find, replace) {
  if (!this) {
    return '';
  }
  if (typeof this === 'number' || typeof this === 'boolean') {
    return this;
  }

  return this.replace(new RegExp(find, 'g'), replace);
}


String.prototype.replaceAlls = function (finds, replaces) {
  if (!finds || !replaces) {
    return this;
  }
  let replaceStr = this.replaceAll(finds[0], replaces[0]);

  for (let i = 1; i < finds.length; i++) {
    replaceStr = replaceStr.replaceAll(finds[i], replaces[i]);
  }

  return replaceStr;
}


String.prototype.unaccent = function () {
  let str = this;
  str = str.toLowerCase();
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, '');
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // Â, Ê, Ă, Ơ, Ư
  return str;
}

String.prototype.toBool = function () {
  return JSON.parse(this.toLowerCase());
}

String.prototype.isEmpty = function () {
  if (typeof this !== 'string') {
    return this === null || this === undefined;
  }
  return this === null || this === undefined || this.trim().length === 0;
}

String.prototype.replaceAfter = function (search, replace, fromPosition) {
  if (this.length > fromPosition) {
    return this.slice(0, fromPosition) + this.slice(fromPosition).replace(search, replace);
  }
  return this;
}

String.prototype.toTitleCase = function () {
  if (!this) {
    return this;
  }

  return this.replace(
    /\w\S*/g,
    function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

String.prototype.removeExtraSpace = function () {
  if (!this) {
    return this;
  }

  return this.replace(/\s+/g, " ");
}

String.prototype.countSubString = function (subStr) {
  if(!this) {
    return 0;
  }

  return this.split(subStr).length - 1;
}