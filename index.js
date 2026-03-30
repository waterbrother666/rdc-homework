//----------菜谱轮播-----------
const slider = document.querySelector('.recipe-slider');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

let scrollAmount = 0;

nextBtn.onclick = function(){
    //外部总宽度
    const containerWidth = document.querySelector('.recipe-container').offsetWidth;
    //内部图片的宽度
    const totalWidth = slider.scrollWidth;
    //向左的极限
    const maxScroll = -(totalWidth - containerWidth);
    if(scrollAmount < maxScroll){
        scrollAmount = maxScroll;
    }
    scrollAmount -= 300; 
    slider.style.transform = `translateX(${scrollAmount}px)`;
};//已在css里面实现过渡

prevBtn.onclick = function(){
    scrollAmount += 300;
    if(scrollAmount > 0) scrollAmount = 0;
    slider.style.transform = `translateX(${scrollAmount}px)`;
};
//----------------------------




//----------调料产品轮播 同菜谱的逻辑-----------
const pTrack = document.querySelector('.product-track');
const pNext = document.querySelector('.p-next');
const pPrev = document.querySelector('.p-prev');
const pViewport = document.querySelector('.product-viewport');

let pScrollAmount = 0;

pNext.onclick = function() {
    const maxScroll = -(pTrack.scrollWidth - pViewport.offsetWidth);
    pScrollAmount -= 240;
    //卡片宽度+间距
    if (pScrollAmount < maxScroll) pScrollAmount = maxScroll;
    pTrack.style.transform = `translateX(${pScrollAmount}px)`;
};

pPrev.onclick = function() {
    pScrollAmount += 240;
    if (pScrollAmount > 0) pScrollAmount = 0;
    pTrack.style.transform = `translateX(${pScrollAmount}px)`;
};

//---------------------------------



//--------------------调料图片翻转--------------------
const flipImages = document.querySelectorAll('.flip-img');

flipImages.forEach(img => {
    const originalSrc = img.src;
    const hoverSrc = img.getAttribute('data-hover');

    //找到他的父亲绑定翻转
    if (hoverSrc) {
        img.parentNode.onmouseenter = () => {
            img.style.opacity = '0';
            setTimeout(() => {
                img.src = hoverSrc;
                img.style.opacity = '1';
            }, 300);
        };
        img.parentNode.onmouseleave = () => {
            img.style.opacity = '0';
            setTimeout(() => {
                img.src = originalSrc;
                img.style.opacity = '1';
            }, 300);
        };
    }
});

//--------------------------------------------------