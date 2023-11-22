
import { changeClass } from './utils.js';
import { renderBreadcrumbs } from './utils.js';
import { renderTopSectionInfo } from './utils.js';

const topSectionTitle = document.getElementById('topSectionTitle');
const topSectionEnTitle = document.getElementById('topSectionEnTitle');
const titleWireImg = document.getElementById('titleWireImg');
let videoTopBox = document.querySelector('.video .top_box .container');
let videoBottomBox = document.querySelector('.video .bottom_box .container');


let init = ()=> {
    getApiData();
}

let setVideoSections = (data)=> {

    for(let i = 0; i < data.length; i++) {
        let iframeBox = document.createElement('div');
        let iframe = document.createElement('iframe');
        let textBox = document.createElement('div');
        let title = document.createElement('h2');
        let text = document.createElement('p');
        let videoBottomItem = document.createElement('div');

        changeClass(iframeBox, ['iframe_box']).add();
        changeClass(iframe, ['iframe']).add();
        changeClass(textBox, ['text_box']).add();
        changeClass(title, ['section_title']).add();
        changeClass(text, ['text']).add();
        changeClass(videoBottomItem, ['item']).add();

        iframe.src = data[i].videoUrl;
        title.textContent = data[i].title;
        text.textContent = data[i].text;
        iframeBox.appendChild(iframe);
        textBox.append(title, text);

        if(i == 0){
            videoTopBox.append(iframeBox, textBox);
        }else{
            videoBottomItem.append(iframeBox, textBox);
            videoBottomBox.append(videoBottomItem);
        }
    }
}

let getApiData = async ()=> {
    try{
        const response = await fetch('https://janyu427.github.io/test/video.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const breadcrumbsLastTitle = data.title;
        let dataContent = data.content;
        
        renderBreadcrumbs(breadcrumbsLastTitle);
        renderTopSectionInfo(topSectionTitle, topSectionEnTitle, titleWireImg, data);
        setVideoSections(dataContent);

    }catch(error){
        console.error('Error fetching or parsing data:', error);
    }
}

document.addEventListener('DOMContentLoaded', ()=> {
    init();
})