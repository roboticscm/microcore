export class Dropdown {
    static show(ref) {
      ref && ref.classList.add('show-dropdown');
    }
  
    static hide(ref) {
        ref && ref.classList.remove('show-dropdown');
    }

    static toggle (ref) {
        if(ref && ref.classList.contains('show-dropdown')) {
            Dropdown.hide(ref);
        } else {
            Dropdown.show(ref);
        }
    }

    static toggleClass (className) {
        const el = document.querySelector(`.${className}`);
        if(!el) {
            return;
        }

        const display = getComputedStyle(el).getPropertyValue('display').trim();
       
        if(display === 'none') {
            el.classList.add('show-dropdown');
        } else {
            el.classList.remove('show-dropdown');
        }
    }

    static hideFixedClass (className) {
        const el = document.querySelector(`.${className}`);
        if(!el) {
            return;
        }

        const position = getComputedStyle(el).getPropertyValue('position').trim();
        if(position === 'fixed') {
            el.classList.remove('show-dropdown');
        }
    }
}