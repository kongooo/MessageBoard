import '../css/loading.scss';

import ico from '../image/logo.png';

let ico_link = document.createElement('link');
ico_link.rel = 'icon';
ico_link.href = ico;
document.head.appendChild(ico_link);

let load = <HTMLDivElement>document.querySelector('.load');

window.onload = () => {
    load.classList.add('load-clear');
    setTimeout(() => {
        load.style.display = 'none';
    }, 500)
}