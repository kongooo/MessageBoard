import '../css/loading.scss';

import ico from '../image/logo.png';

let ico_link = document.createElement('link');
ico_link.rel = 'icon';
ico_link.href = ico;
document.head.appendChild(ico_link);

let load = <HTMLDivElement>document.querySelector('.load');

window.onload = () => {
    load.classList.add('load-clear');
    console.log('window load');
    let img = document.querySelector(
        ".publish-gravatar"
    ) as HTMLImageElement;
    img.src = "https://s1.ax1x.com/2020/07/29/aeJE6K.png";
    img.onload = () => { console.log('image load') };
    setTimeout(() => {
        load.style.display = 'none';
    }, 500)
}