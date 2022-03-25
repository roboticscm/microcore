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
}