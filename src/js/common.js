import { changeClass } from './utils.js';

const mobileNav = document.getElementById('mobileNav');
const mobileNavBox = document.getElementById('mobileNavList');
const mobileNavLogo = document.getElementById('mobileNavLogo');
const mobileNavList = document.getElementById('mobileNavList');
const mobileNavBurger = document.getElementsByClassName('burger');
const mobileNavCross = document.getElementById('mobileNavCross');
const mobileNavInfoTopBox = document.getElementById('mobileNavInfoTopBox');
const mobileNavInfoBottomBox = document.getElementById('mobileNavInfoBottomBox');
const goTop = document.getElementById('goTop');
const navBox = document.getElementById('nav');
const navLogo = document.getElementById('navLogo');
const bannerNavBox = document.getElementById('bannerNav');
const footerInfoTopBox = document.getElementById('footerInfoTopBox');
const footerInfoBottomBox = document.getElementById('footerInfoBottomBox');
const footerLogo = document.getElementById('footerLogo');
const socialMediaBox = document.getElementsByClassName('social_media');

let init = ()=> {
    mobileNavToggle();
    pageGoTop();
    getApiData();
}

// Open And Close Mobile Nav
let mobileNavToggle = ()=> {
    for(let i=0;i<mobileNavBurger.length;i++){
        mobileNavBurger[i].addEventListener("click", () => {
            changeClass(mobileNav, ['show']).toggle();
            changeClass(mobileNavLogo, ['show']).toggle();
            changeClass(mobileNavList, ['show']).toggle();
        });
    }

    mobileNavCross.addEventListener("click", ()=> {
        changeClass(mobileNav, ['show']).toggle();
        changeClass(mobileNavLogo, ['show']).toggle();
        changeClass(mobileNavList, ['show']).toggle();
    });
}

// Go Top 
let pageGoTop = ()=> {
    goTop.addEventListener("click", ()=> {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    })
}

// Create Nav List 
let createNavListElement = (navList)=> {
    let list = document.createElement('li');
    let link = document.createElement('a');

    changeClass(list, ['list']).add();
    changeClass(link, ['link']).add();

    link.textContent = navList.title;
    link.href = navList.link;
    link.setAttribute('title', navList.titleTag);
    list.append(link);

    return list;
}

let renderNavList = (navData, navBox)=> {
    for(let i = 0; i < navData.length; i ++){
        let navList = createNavListElement(navData[i]);
        navBox.append(navList);
    }
}

// Create Mobile Nav List
let createMobileNavListElement = (navList)=> {
    let list = document.createElement('li');
    let link = document.createElement('a');

    changeClass(list, ['mobile_list']).add();
    changeClass(link, ['link']).add();

    link.textContent = navList.title;
    link.href = navList.link;
    link.setAttribute('title', navList.titleTag);
    list.append(link);

    return list;
}

let renderMobileNavList = (navData, navBox)=> {
    for(let i = 0; i < navData.length; i ++){
        let navList = createMobileNavListElement(navData[i]);
        navBox.append(navList);
    }
}

// Create Company Basic Info
let createBasicInfoElement = (InfoElement)=> {
    let list = document.createElement('div');
    let title = document.createElement('span');
    let link = document.createElement('a');

    changeClass(list, ['list']).add();
    changeClass(title, ['title']).add();
    changeClass(link, ['link']).add();

    link.textContent = InfoElement.text;
    link.href = InfoElement.link;
    link.setAttribute('title', InfoElement.titleTag);
    title.textContent = InfoElement.title;
    
    if(InfoElement.key == 'categoryAddress'){

        return link;

    }else{

        list.append(title, link);
        return list;

    }
}

let renderBasicInfo = (basicInfoData, topDataBox, bottomDataBox)=> {
    for(let i = 0; i < basicInfoData.length; i ++){

        let footerInfo = createBasicInfoElement(basicInfoData[i]);

        if (basicInfoData[i].key === 'address') {
            topDataBox.append(footerInfo);
        } else {
            bottomDataBox.append(footerInfo);
        }
        
    }
}

let renderSocialMediaInfo = (mediaList)=> {

    for(let i = 0; i < socialMediaBox.length; i ++){
        let links = socialMediaBox[i].getElementsByTagName('a');
        for(let j = 0; j < links.length; j ++){
            let link = links[j];
            let linkClasses = link.classList;
    
            for(let k = 0; k < mediaList.length; k ++){
                if (linkClasses.contains(mediaList[k].key)) {
                    link.title = mediaList[k].titleTag;
                    link.href = mediaList[k].link;
                }
            }
            
        }
    }

}

// Get Api and 
let getApiData = ()=> {
    fetch('https://janyu427.github.io/test/companyInfo.json')
        .then((response)=> {
            return response.json();
        })
        .then((data)=> {

            const navData = data.navList;
            const companyBasicInfo = data.basicInfo;
            const companySocialMediaInfo = data.socialMediaInfo;

            navLogo.src = data.logo.logoNormal;
            navLogo.alt = data.logo.alt;
            mobileNavLogo.src = data.logo.logoNormal;
            mobileNavLogo.alt = data.logo.alt;
            footerLogo.src = data.logo.logoNormal;
            footerLogo.alt = data.logo.alt;
            
            renderNavList(navData, navBox);
            if(bannerNavBox){
                renderNavList(navData, bannerNavBox);
            }
            // renderNavList(navData, bannerNavBox);
            renderMobileNavList(navData, mobileNavBox);
            renderBasicInfo(companyBasicInfo, footerInfoTopBox, footerInfoBottomBox);
            renderBasicInfo(companyBasicInfo, mobileNavInfoTopBox, mobileNavInfoBottomBox);
            renderSocialMediaInfo(companySocialMediaInfo);

        })
        .catch((error)=> {
                console.error('Error fetching or parsing data:', error);
        })
}

document.addEventListener("DOMContentLoaded", ()=> {

    init();

})


