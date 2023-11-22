export let changeClass = (element, classNames = [])=> {
    return {
        toggle: () => {
            for(let i = 0; i < classNames.length; i ++){
                element.classList.toggle(classNames[i]);
            }
        },
        add: () => {
            for(let i = 0; i < classNames.length; i ++){
                element.classList.add(classNames[i]);
            }
        },
        remove: () => {
            for(let i = 0; i < classNames.length; i ++){
                element.classList.remove(classNames[i]);
            }
        }
    };
}

export let renderBreadcrumbs = (breadcrumbsTitle)=> {
    let list = document.createElement('li');
    let lastList = document.createElement('li');
    let link = document.createElement('a');
    let arrow = document.createElement('span');

    const breadcrumbsListBox = document.getElementById('breadcrumbsListBox');

    changeClass(link, ['link']).add();
    link.setAttribute('title', '首頁');
    link.setAttribute('href', '/');
    link.textContent = '首頁',
    list.appendChild(link);

    arrow.textContent = '>';
    list.appendChild(arrow);
    
    lastList.textContent = breadcrumbsTitle;

    breadcrumbsListBox.append(list, lastList);

}

export let renderTopSectionInfo = (title, enTitle, titleImg, data)=> {
    title.textContent = data.title; 
    enTitle.textContent = data.enTitle;
    titleImg.src = data.titleImgUrl;
}