export const registerScrollbarHook = (elementId, modalId, showDropdownClass = 'show-dropdown') => {
    const ele = typeof elementId === 'string' ? document.getElementById(elementId) : elementId;
    if (!ele) {
        return;
    }

    ele.onmouseout = (e) => {
        ele.classList.remove('more-scroll-width');
    };

    ele.onmouseover = (e) => {
        if (ele) {
            const isModal = someParentHasClass(ele, 'modal') || someParentHasClass(ele, showDropdownClass);
            let modalLeft = 0;
            if (isModal) {
                if (modalId) {
                    const modalEle = document.getElementById(modalId);
                    modalLeft = +modalEle.style.left.replace('px', '');
                } else if (showDropdownClass) {
                    const dropdown = document.querySelector('.' + showDropdownClass);
                    if (dropdown) {
                        if (dropdown.style.left) {
                            modalLeft = +dropdown.style.left.replace('px', '');
                        } else {
                            const rect = dropdown.getBoundingClientRect();
                            modalLeft = rect.left
                        }

                    }
                }
                else {
                    // log.error('ModalId is required');
                }
            }

            let distance;
            if (isModal) {
                distance = modalLeft + ele.offsetLeft + ele.offsetWidth - e.pageX;
            } else {
                const rect = ele.getBoundingClientRect();
                distance = (ele.offsetLeft || rect.left) + ele.offsetWidth - e.pageX;
            }

            distance < 20 && distance > -20 ? ele.classList.add('more-scroll-width') : ele.classList.remove('more-scroll-width');

        }
    };
}

export const someParentHasClass = (element, classname) => {
    if (!element) {
        return false;
    }

    if (element.className && element.className.length > 0  && element.className.split(' ').map(it => it ? it.trim() : it).indexOf(classname) >= 0) {
        return true;
    }
    return element.parentNode && someParentHasClass(element.parentNode, classname);
}

export const someParentHasProperty = (element, property, value) => {
    if (!element) {
        return false;
    }

    if (element.style[property] === value) {
        return true;
    }
    return element.parentNode && someParentHasProperty(element.parentNode, property, value);
}

export const moveNextElement = (e) => {
    if (e.code === 'Enter') {
        const elements = Array.from(document.querySelectorAll('*')).filter((el) => {
            return typeof el.focus == 'function' && !el.disabled && el.tabIndex != -1 && !['BUTTON', 'TEXTAREA'].includes(el.tagName.toUpperCase());
        })

        elements.sort((a, b) => {
            if (a.tabIndex > b.tabIndex) {
                return 1;
            } else if (a.tabIndex < b.tabIndex) {
                return -1;
            } else {
                return 0;
            }
        });

        const index = elements.indexOf(document.activeElement);
        if (index > -1) {
            const nextElement = elements[index + 1] || elements[0];
            nextElement.focus();
        }
    }
}

export const isScrollbarVisible = (element) => {
    if (!element) {
        return false;
    }
    return element.scrollHeight > element.clientHeight;
}

export const getCssVar = (varName) => {
    const body = document.querySelector('body');
    return getComputedStyle(body).getPropertyValue(varName).trim();
}

export const getNumItemPerRow = (parentElementRef, className) => {
    const elements = Array.from(parentElementRef.querySelectorAll(`.${className}`));

    if (elements.length < 2) {
        return elements.length;
    }

    for (let i = 1; i < elements.length; i++) {
        if (elements[i].offsetTop !== elements[0].offsetTop) {
            return i;
        }
    }

    return 0;
}

export const removeAllClasses = (className, removedClassName) => {
    const elements = Array.from(document.querySelectorAll(`.${className}`));
    for (let ele of elements) {
        ele.classList.remove(removedClassName)
    }
}


export const calcDropdownPosition = (sourceRef, dropdownRef, dropdownWidth, dropdownHeight, deltaX, deltaY, tick) => {
    if (!dropdownRef || !sourceRef) {
        return;
    }

    if (dropdownWidth) {
        dropdownRef.style.width = dropdownWidth;
    } else {
        dropdownRef.style.width = 'auto';
    }

    if (dropdownHeight) {
        dropdownRef.style.height = dropdownHeight;
    }
    
    deltaX = +`${deltaX || 0}`.replace('px', '')
    deltaY = +`${deltaY || 0}`.replace('px', '')

    if (tick) {
        tick().then(() => {
            const documentWidth = document.body.clientWidth;
            const documentHeight = document.body.clientHeight;
            const _dropdownWidth = window['$'](dropdownRef).width();
            const _dropdownHeight = window['$'](dropdownRef).height();
            const _sourceHeight = window['$'](sourceRef).height();

            let {left, top} = getElementCoords(sourceRef);

            if (left + _dropdownWidth > documentWidth) {
                left = documentWidth - _dropdownWidth - deltaX;
            } else {
                left += deltaX
            }

            if (top + _dropdownHeight > documentHeight) {
                top = documentHeight - _dropdownHeight - _sourceHeight + deltaY;
            } else {
                top += _sourceHeight + deltaY;
            }

            
            dropdownRef.style.left = left - 1 + 'px';
            dropdownRef.style.top = top + 'px';
        })
    } else {
        setTimeout(() => {
            const documentWidth = document.body.clientWidth;
            const documentHeight = document.body.clientHeight;
            const _dropdownWidth = window['$'](dropdownRef).width();
            const _dropdownHeight = window['$'](dropdownRef).height();
            const _sourceHeight = window['$'](sourceRef).height();
    
            let {left, top} = getElementCoords(sourceRef);
    
            if (left + _dropdownWidth > documentWidth) {
                left = documentWidth - _dropdownWidth - deltaX;
            } 
    
            if (top + _dropdownHeight > documentHeight) {
                top = documentHeight - _dropdownHeight - _sourceHeight + deltaY;
            } else {
                top += _sourceHeight + deltaY;
            }
    
            
            dropdownRef.style.left = left - 1 + 'px';
            dropdownRef.style.top = top + 'px';
        });
    }

    
};

export const getElementCoords = (ele) => { 
    const box = ele.getBoundingClientRect();

    const body = document.body;
    const docEle = document.documentElement;

    const scrollTop = window.pageYOffset || docEle.scrollTop || body.scrollTop;
    const scrollLeft = window.pageXOffset || docEle.scrollLeft || body.scrollLeft;

    const clientTop = docEle.clientTop || body.clientTop || 0;
    const clientLeft = docEle.clientLeft || body.clientLeft || 0;

    const top  = box.top +  scrollTop - clientTop;
    const left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top), left: Math.round(left) };
}

export const getComputedValue = (el, styleProp) => {
    const zIndex = window.document.defaultView.getComputedStyle(el).getPropertyValue(styleProp);
    if (!zIndex) {
        return getComputedValue(el.parentNode, styleProp);
    }
    return zIndex; 
}

export const disableAllElemenets = (node, disabled, property="disabled") => {
    for (let i = 0; i < node.childNodes.length; i++) {
        const child = node.childNodes[i];
        if(child) {
            if(child.isContentEditable) {
                // child.contentEditable = disabled;
            } else {
                
            }

            if(property) {
                try {
                    if(child[property] !== undefined) {
                        child[property] = disabled;
                    }
                } catch {
                    
                }
                
                
            } else {
                child.disabled = disabled;
            }
        }
        
        disableAllElemenets(child, disabled, property);    
    }
}

export const getAllElemenetsWithTags = (node, tagList) => {
    let tags = [];
    for (let i = 0; i < node.childNodes.length; i++) {
        const child = node.childNodes[i];
        if(child) {
            const curTag = child.tagName;
            if(curTag && tagList.includes(curTag.toUpperCase())) {
                tags.push({name: child.getAttribute("name"), value: child.value})
            }
        }
        const t = getAllElemenetsWithTags(child, tagList);   
        tags = [...tags, ...t]
    }

    return tags;
}

export const parseHTML = (htmlString) => {
    const isHTML = RegExp.prototype.test.bind(/(<([^>]+)>)/i);

    if(!htmlString || !isHTML(htmlString)) {
        return null;
    }
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "application/xml");
    return doc.querySelector('parsererror');
}



export const registerInputMask = () => {
    for (const el of document.querySelectorAll("[placeholder][data-slots]")) {
        const pattern = el.getAttribute("placeholder"),
            slots = new Set(el.dataset.slots || "_"),
            prev = (j => Array.from(pattern, (c,i) => slots.has(c)? j=i+1: j))(0),
            first = [...pattern].findIndex(c => slots.has(c)),
            accept = new RegExp(el.dataset.accept || "\\d", "g"),
            clean = input => {
                input = input.match(accept) || [];
                return Array.from(pattern, c =>
                    input[0] === c || slots.has(c) ? input.shift() || c : c
                );
            },
            format = () => {
                const [i, j] = [el.selectionStart, el.selectionEnd].map(i => {
                    i = clean(el.value.slice(0, i)).findIndex(c => slots.has(c));
                    return i<0? prev[prev.length-1]: back? prev[i-1] || first: i;
                });
                el.value = clean(el.value).join``;
                el.setSelectionRange(i, j);
                back = false;
            };
        let back = false;
        el.addEventListener("keydown", (e) => back = e.key === "Backspace");
        el.addEventListener("input", format);
        el.addEventListener("focus", format);
        el.addEventListener("blur", () => el.value === pattern && (el.value=""));
    }
  }