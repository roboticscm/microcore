import { genUUID } from './random';
import { escapeRegExp } from './regexp';
import { HtmlPrefixParser } from './constants';
import { compileTemplate } from './html';

export class StringUtil {
  static unaccentVietnamese = (str) => {
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
  };

  static toSnackCase(str, sep = '_') {
    let ret = '';
    for (let i = 0; i < str.length; i++) {
      let ch = str[i];
      if (ch === ch.toUpperCase()) {
        ret += sep + ch.toLowerCase();
      } else ret += ch;
    }

    return ret;
  }

  static insertAt(source, insString, pos) {
    if (typeof pos == 'undefined' || pos < 0) {
      pos = 0;
    }

    if (pos > source.length) {
      pos = source.length;
    }

    if (typeof insString == 'undefined') {
      insString = '';
    }
    return source.slice(0, pos) + insString + source.slice(pos);
  }

  static isEmpty(source) {
    if (typeof source !== 'string') {
      return source === null || source === undefined;
    }
    return source === null || source === undefined || source.trim().length === 0;
  }

  static replaceAll(source, find, replace) {
    if (StringUtil.isEmpty(source)) {
      return '';
    }
    if (typeof source === 'number' || typeof source === 'boolean') {
      return source;
    }

    return source.replace(new RegExp(escapeRegExp(find), 'g'), replace);
  }

  static replaceAlls(source, finds, replaces) {
    if (finds.length === 0 || replaces.length === 0 || StringUtil.isEmpty(source) || finds.length !== replaces.length) {
      return source;
    }
    let replaceStr = StringUtil.replaceAll(source, finds[0], replaces[0]);

    for (let i = 1; i < finds.length; i++) {
      replaceStr = StringUtil.replaceAll(replaceStr, finds[i], replaces[i]);
    }

    return replaceStr;
  }

  static toTitleCase(str) {
    if (!str) return str;
    return str.replace(/\w\S*/g, function (txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }

  static capitalize = (s) => {
    if (typeof s !== 'string' || s.length === 0) {
      return '';
    }
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  static toUpperCaseWithUnderscore(str) {
    if (str) {
      return str
        .split(/(?=[A-Z])/)
        .join('_')
        .toUpperCase();
    } else {
      return str;
    }
  }

  static snakeToCamelCase = (str) =>
    str.replace(/([-_][a-z])/g, (group) =>
      group
        .toUpperCase()
        .replace('-', '')
        .replace('_', ''),
    );

  static removeMark = (str) => {
    if (!str || typeof str !== 'string') return str;
    return str.replace(/<mark>/g, '').replace(/<\/mark>/g, '');
  };

  static removeHtmlTag = (source) => {
    if (!source || typeof source !== 'string') return source;
    return source.replace(/<\/?[^>]+(>|$)/g, '');
  };

  static removeExtraSpace = (source) => {
    if(!source) {
      return '';
    }

    return source.replace(/\s+/g, " ");
  };

  static splitHumanName = (fullName) => {
    if (!fullName) {
      return ['', ''];
    }
    fullName = StringUtil.removeExtraSpace(fullName);
    const splits = fullName.split(' ');
    return [splits.slice(0, length - 1).join(' '), splits[splits.length - 1]];
  };

  static toBoolean(str) {
    return JSON.parse(str.toLowerCase());
  }

  static distinctArrayString(array) {
    return [...new Set(array)];
  }

  static formatFTSParam(value) {
    if (StringUtil.isEmpty(value)) {
      return '';
    }

    if (value.startsWith('"')) {
      return StringUtil.replaceAll(value, ' ', '<->');
    }

    if (value.startsWith('`')) {
      return StringUtil.replaceAll(value, '`', '');
    }

    return StringUtil.unaccentVietnamese(
      StringUtil.replaceAll(StringUtil.replaceAll(value, ' ', ':*&') + ':*', '#', ''),
    );
  }

  static formatSearchParam(value) {
    if (StringUtil.isEmpty(value)) {
      return '%%';
    }

    return '%' + StringUtil.replaceAll(StringUtil.unaccentVietnamese(value), "'", '') +'%';
  }

  static formatExactlySearchParam(value) {
    if (StringUtil.isEmpty(value)) {
      return '';
    }

    return StringUtil.replaceAll(StringUtil.replaceAll(StringUtil.unaccentVietnamese(value), "'", ''), '#', '');
  }

  static getFirstWord = (source) => {
    if (StringUtil.isEmpty(source)) {
      return source;
    }

    const split = source.split(' ');
    if (split.length > 0) {
      return split[0];
    }

    return source;
  };

  static getAvatar = (name) => {
    if (StringUtil.isEmpty(name)) {
      return name;
    }

    const split = name.split(' ');
    if (split.length > 1) {
      return (split[0].substring(0, 1) + split[split.length - 1].substring(0, 1)).toUpperCase();
    } else {
      return split[0].substring(0, 1).toUpperCase();
    }
  };

  static countDiv(source) {
    return (source.match(/<div>/g) || []).length;
  }

  static markStringSearch = (source, searchs, removeAccent = true) => {
    if (!source || !searchs) {
      return source;
    }

    if (typeof source !== 'string') {
      source = `${source}`;
    }

    let newSource;
    if (removeAccent) {
      newSource = StringUtil.unaccentVietnamese(source);
      searchs = StringUtil.unaccentVietnamese(searchs);
    } else {
      newSource = source;
    }

    for (let search of searchs.split('|')) {
      const re = new RegExp(escapeRegExp(search), 'gi');
      const indices = new Array();
      let current;
      while ((current = re.exec(newSource)) != null) {
        indices.push(current.index);
      }

      for (let i = indices.length - 1; i >= 0; i--) {
        source = StringUtil.insertAt(source, `</mark>`, indices[i] + search.length);
        source = StringUtil.insertAt(source, `<mark>`, indices[i]);
      }
      newSource = source;
    }

    return source;
  };

  static normalizeSearchKeyword = (searchText) => {
    if (!searchText) {
      return '';
    }

    if (searchText.startsWith('#')) {
      return searchText.replace('#', '');
    }

    if (searchText.startsWith('@')) {
      return searchText.replace('@', '');
    }

    return searchText;
  }

  static countSubString(source, subStr) {
    return source.split(subStr).length - 1;
  }

  static byte2Text(bytes, factor = 1024) {
    var i = -1;
    var byteUnits = [' kB', ' MB', ' GB', ' TB', ' PB', ' EB', ' ZB', ' YB'];
    do {
      bytes = bytes / factor;
      i++;
    } while (bytes > factor);
    return Math.max(bytes, 0.1).toFixed(1) + byteUnits[i];
  }

  static replaceParamAsTag = async (stringSource, paramObj, disabled = false, textareaRows = 4, textareaCols = 100, namePrefix='') => {
    if (!paramObj) {
      paramObj = {}
    }
    let newSource = stringSource;
    let skipIndex = -1;
    let startEachLoopIndex = 0;
    let startEachLoopMatch = '';
    let startEachLoopVar = '';
    let isNestedEachBlock = false;
    let startNestedEachLoopIndex = 0;
    // const  rxp = /{{([^)}]+)}/g;
    const  rxp = /{{(.*)}}/g;
    let curMatch;
    const input = (name, value, id, forceDisabled, type='text') => `<input autocomplete="off" ${type === 'date' ? 'data-slots="dmyh"' : undefined} ${type === 'date' ? 'placeholder="dd/mm/yyyy"' : undefined}  ${(disabled || forceDisabled) ? 'disabled': ''} class="report-margin-bottom" ${id ? 'id="' + id + '"' : ''} name="${name}" value="${value || ''}">`;
    const textarea = (name, value, id) => `<textarea autocomplete="off" ${disabled ? 'disabled': ''} class="report-textarea" ${id ? 'id="' + id + '"' : ''} name="${name}" rows="${textareaRows}" columns="${textareaCols}">${value || ''}</textarea>`;
    const titleButton = 'SYS.LABEL.ADD_NEW_ROW'.t();
    const btnStyle = `
      position: absolute;
      right: 0;
    `;

    const btnContainerStyle=`
      position: relative;
    `;

    const button = (onClick) => `<button ${disabled ? 'disabled': ''} class="default-btn-control" title="${titleButton}" style="${btnStyle}" type="button" onclick="${onClick};">+</button>`;

    const inputBuilder = (prefix, name, builderFunc, onClick, uuid) => {
      if(paramObj) {
        realParam = name.replace(prefix, '').trim();
        values = paramObj[realParam];

        if (values && Array.isArray(values) && values.length > 0) {
          let html='';
          for (let i = 0; i < values.length; i++) {
            if(i === 0) {
              html += `<div style="${btnContainerStyle}"> ${builderFunc(name, values[i], uuid)} ${button(onClick)}</div>`;
            } else {
              html += builderFunc(name, values[i]);
            }
          }

          newSource = newSource.replace(`{{${name}}}`, html);
          
        } else {
          const html = `<div style="${btnContainerStyle}">${builderFunc(name, '', uuid)} ${button(onClick)}</div>`;
          newSource = newSource.replace(`{{${name}}}`, html);
        }
      } else {
        const html = `<div style="${btnContainerStyle}"> ${builderFunc(name, '', uuid)} ${button(onClick)}</div>`;
        newSource = newSource.replace(`{{${name}}}`, html);
      }
    }

    while(curMatch = rxp.exec(stringSource)) {
      if (curMatch.index < skipIndex) {
        continue;
      }

      const param = curMatch[1];

      
      if (paramObj && Array.isArray(paramObj)) {
        let html = '';
        for(let i = 0 ; i < paramObj.length; i++) {
          let newRow = stringSource;
          for(let field in paramObj[i]) {
            if(field.endsWith('__multi__')) {
              const tdContent = textarea(namePrefix + field, paramObj[i][field]);
              newRow = newRow.replace(`{{${field}}}`, tdContent);
            } else {
              const tdContent = input(namePrefix + field, paramObj[i][field]);
              newRow = newRow.replace(`{{${field}}}`, tdContent);
            }
          }
          html += newRow;
        }

        newSource = html;
      } else if(param && param.trim().startsWith(HtmlPrefixParser.REPEAT)) { //repeat input
        const uuid = genUUID();
        
        const onClick = `
          const parentElement = document.getElementById('${uuid}').parentElement.parentElement;
          const newTag = document.createElement('input');
          newTag.name = '${param}';
          newTag.disabled = ${disabled};
          newTag.classList.add('', 'report-margin-bottom');
          parentElement.appendChild(newTag);
        `;
        
        inputBuilder(HtmlPrefixParser.REPEAT, param, input, onClick, uuid);
        
      } else if (param && param.trim().startsWith(HtmlPrefixParser.REPEAT_MULTI)) {//repea multi 
        const uuid = genUUID();
        
        const onClick = `
          const parentElement = document.getElementById('${uuid}').parentElement.parentElement;
          const newTag = document.createElement('textarea');
          newTag.name = '${param}';
          newTag.rows = '${textareaRows}';
          newTag.columns = '${textareaCols}';
          newTag.disabled = ${disabled};
          newTag.classList.add('textarea', 'report-margin-bottom');
          parentElement.appendChild(newTag);
        `;

        inputBuilder(HtmlPrefixParser.REPEAT_MULTI, param, textarea, onClick, uuid);

      } else if (param && param.trim().startsWith(HtmlPrefixParser.MULTI)) {//textarea
        const realParam = param.replace(HtmlPrefixParser.MULTI, '');
        const value = paramObj[realParam] || '';
        const html = textarea(param, value);
        newSource = newSource.replace(curMatch[0], html);
      } else if (param && param.trim().startsWith(HtmlPrefixParser.READONLY)) {

        // support handlebars helper function
        const parts = StringUtil.removeExtraSpace(param).split(" ");

        let indexField = 0;
        let helperFunction = undefined;

        if (parts.length > 1) {
          indexField = 1;
          helperFunction = parts[0].replace(HtmlPrefixParser.READONLY, '');
        }

        const fieldName = parts[indexField].replace(HtmlPrefixParser.READONLY, '');
        const replaceContent = curMatch[0];
        if (helperFunction) {
          const res = await import('/src/lib/helper_function.js');
          if(res[helperFunction]) {
            const value = res[helperFunction](paramObj[fieldName] || '');
            const html = `${value}`;
            newSource = newSource.replace(replaceContent, html);
          }
        } else {
          const value = paramObj[fieldName] || '';
          const html = `${value}`;
          newSource = newSource.replace(replaceContent, html);
        }

        
      } else if (param && param.trim().startsWith(HtmlPrefixParser.LINK)) { // link to other content
        const realParam = param.replace(HtmlPrefixParser.LINK, '').trim();
        const value = paramObj[realParam] || '';
        const html = `${value}`;
        newSource = newSource.replace(curMatch[0], html);
      } else if (param && param.trim().startsWith(HtmlPrefixParser.EACH_LOOP)) { //each loop
          const nextOpenEachBlockIndex = curMatch.input.indexOf(`{{${HtmlPrefixParser.EACH_LOOP}`, curMatch.index + 1);

          startEachLoopIndex = curMatch.index + curMatch[0].length;
          startEachLoopMatch = curMatch[0];
          startEachLoopVar = curMatch[1];
          skipIndex = curMatch.input.indexOf(`{{${HtmlPrefixParser.END_EACH_LOOP}`, skipIndex + 1);
  
          if (nextOpenEachBlockIndex < skipIndex) {
            isNestedEachBlock = true;
            startNestedEachLoopIndex = curMatch.index;
          } else {
            isNestedEachBlock = false;
            if (skipIndex < 0) {
              console.error(`Syntax error: Wrong end of  ${curMatch[0]}. Make sure end of each loop is: {{/each}}`)
            }
          }
      } else if (param && param.trim().startsWith(HtmlPrefixParser.END_EACH_LOOP)) {
        if(isNestedEachBlock) {
          const endNestedEachLoopIndex = curMatch.input.indexOf(`{{${HtmlPrefixParser.END_EACH_LOOP}`, curMatch.index + 1);
          if(endNestedEachLoopIndex >= 0) {
            const replaceContent = curMatch.input.substring(startNestedEachLoopIndex, endNestedEachLoopIndex + curMatch[0].length + 1);
            const normalizedContent =  StringUtil.transformToHandlesbarTemplate(replaceContent);
            const html = compileTemplate(normalizedContent, paramObj);
            newSource = newSource.replace(replaceContent, html);
          }
          

        } else {
          const addUUID = genUUID();
          const removeUUID = genUUID();
          const content = curMatch.input.substring(startEachLoopIndex, curMatch.index);
          const fullContent = startEachLoopMatch + content + curMatch[0];
          const fieldName = startEachLoopVar.replace(HtmlPrefixParser.EACH_LOOP, '').trim();
          const namePrefix = fieldName + '.';

          let html, blankHTML;
          if (paramObj && paramObj[fieldName]) {
            html = await StringUtil.replaceParamAsTag (content, paramObj[fieldName], disabled, textareaRows, textareaCols, namePrefix);
            blankHTML = await StringUtil.replaceParamAsTag (content, {}, disabled, textareaRows, textareaCols, namePrefix);
          } else {
            html = await StringUtil.replaceParamAsTag (content, {}, disabled, textareaRows, textareaCols, namePrefix);
            blankHTML = html;
          }
                  
          const onAddClick = `
            const table = (document.getElementById('${addUUID}').nextSibling).nextSibling;
            const tbody = table.tBodies[0];
            tbody.innerHTML+=\`${blankHTML.replaceAll('"', '\'')}\`;
          `;


          
          const onRemoveClick = `
            const table = document.getElementById('${removeUUID}').nextSibling;
            const tbody = table.tBodies[0];
            let start = tbody.innerHTML.lastIndexOf('<tr');
            start = tbody.innerHTML.lastIndexOf('<tr', start - 1 );
            const end = tbody.innerHTML.lastIndexOf('</tr');
            const newContent =  tbody.innerHTML.substring(0, start - 1) + tbody.innerHTML.substring(end, tbody.innerHTML.length);
            tbody.innerHTML = newContent;
          `;

          const addButton = `<button style="margin-left: 156px;" type="button" id="${addUUID}" onclick="${onAddClick}">+</button>`;
          const removeButton = `<button type="button" id="${removeUUID}" onclick="${onRemoveClick}">-</button>`;
          newSource = newSource.replace(fullContent, addButton + removeButton + html);
        }
      } else if (param) { // input
        // support handlebars helper function
        const parts = StringUtil.removeExtraSpace(param).split(" ");

        let indexField = 0;

        if (parts.length > 1) {
          indexField = 1;
        }

        const fieldName = parts[indexField].replace(HtmlPrefixParser.READONLY, '');
        
        let html;
        if(fieldName.endsWith('__date__')) {
          const _fieldName = fieldName.replace('__date__', '');
          const value = paramObj[_fieldName] || '';
          html = input(namePrefix + (_fieldName), value, undefined, false, 'date');
        } else {
          if(fieldName.endsWith('__multi__')) {
            const value = paramObj[fieldName] || '';
            html = textarea(namePrefix + fieldName, value);
          } else {
            const value = paramObj[fieldName] || '';
            html = input(namePrefix + fieldName, value);
          }
        }

        if(parts.length > 1) {
          newSource = newSource.replace(curMatch[0], html);
        } else {
          newSource = newSource.replace(`{{${fieldName}}}`, html);
        }
      }
    }
    return newSource;
  }


  static replaceTagAsParam = (stringSource) => {
    let newSource = stringSource;
    let rxp, curMatch;
    //remove button tag
    newSource = stringSource.replace(/<button [^>]+>(.*?)<\/button>/g, ''); 

    //replace input tag
    rxp = /<input [^>]+>/g;
    while(curMatch = rxp.exec(stringSource)) {
      const tag = curMatch[0];
      const divEle = document.createElement('div');
      divEle.innerHTML = tag;
      const inputEles = divEle.getElementsByTagName('input')
      const tagName = inputEles[0].name
      newSource = newSource.replace(tag, `{{${tagName}}}`)
    }

    //replace textarea tag
    rxp =/<textarea [^>]+>(.*?)<\/textarea>/g;
    while(curMatch = rxp.exec(stringSource)) {
      const tag = curMatch[0];
      const divEle = document.createElement('div');
      divEle.innerHTML = tag;
      const inputEles = divEle.getElementsByTagName('textarea')
      const tagName = inputEles[0].name
      newSource = newSource.replace(tag, `{{${tagName}}}`)
    }

    return newSource;
  }

  static transformToHandlesbarTemplate (template) {
    let newSource = template;
    //remove _#, _asFormat, __date__
    newSource = newSource.replace(/#_|_asFormat|__date__/g, '');

    const  rxp = /{{(.*)}}/g;
    let curMatch;
    while(curMatch = rxp.exec(newSource)) {
      const fieldName = curMatch[1];
      if(fieldName.endsWith('__multi__')) {
        newSource = newSource.replaceAfter(`${curMatch[0]}`, `{${curMatch[0]}}`, curMatch.index);
      }
    }

    return newSource;
  }

  static normalizeParam (paramAsString) {
   return paramAsString.replace(/\\n/g, '<br/>');
  }

  static normalizeKey = (key) => {
    if(typeof key !== 'string'){
      return key
    }
    
    key = key.removeExtraSpace()
    return key.toLowerCase();
  }
}
