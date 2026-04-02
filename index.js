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

//--------------------视频轮播以及活跃点实现--------------------
document.addEventListener('DOMContentLoaded', function(){
    const carouseItems = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 0;//指引轮播的视频的关键
    const totalItems = carouseItems.length;
    let autoPlayInterval;
    //设置一个关闭


    //初始化
    function updateCarousel(){
        carouseItems.forEach(item => {
            item.classList.remove('active', 'next', 'prev','hide');
            const video = item.querySelector('video');
            video.pause();
        });
        dots.forEach(dot => dot.classList.remove('active'));

        let nextIndex = (currentIndex + 1) % totalItems;//加1表示向右
        let prevIndex = (currentIndex - 1 + totalItems) % totalItems;//减1表示向左
        //存在疑问+1和-1的问题
        carouseItems[currentIndex].classList.add('active');
        carouseItems[nextIndex].classList.add('next');
        carouseItems[prevIndex].classList.add('prev');

        carouseItems[currentIndex].querySelector('video').play();

        carouseItems.forEach((item, index) => {
            if(index !== currentIndex && index !== nextIndex && index !== prevIndex){
                item.classList.add('hide');
            }
        });
        if(dots[currentIndex]) dots[currentIndex].classList.add('active');
    }
    
    function startAutoPlay(){
        //如果已经有定时器了 删掉防止出现超速bug
        if (autoPlayInterval) clearInterval(autoPlayInterval);
        autoPlayInterval = setInterval(function(){
            currentIndex = (currentIndex + 1) % totalItems;
            updateCarousel();
        }, 4000); 
    }


    dots.forEach((dot, index) => {
        dot.addEventListener('click', function(){
            currentIndex = index;
            updateCarousel();
            startAutoPlay();
        });
    });

    updateCarousel();
    startAutoPlay();
});




//------------------------------------------------------------


// ---------------悬浮变亮海报以及补全文字的轮播区域-------------
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('cardsContainer');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentIndex = 0; 
    const totalCards = 8; 
    const cardsPerPage = 5.5; 
    const maxIndex = totalCards - cardsPerPage;

    function updateGallery() {
        if(currentIndex === 3) {
            const offfset = 2.5* (100 / cardsPerPage);
            container.style.transform = `translateX(-${offfset}%)`;
        }else{
            const offset = currentIndex * (100 / cardsPerPage);
            container.style.transform = `translateX(-${offset}%)`;
        }


        //到达边界时降低透明度提醒
        prevBtn.style.opacity = currentIndex === 0 ? "0.3" : "1";
        prevBtn.style.cursor = currentIndex === 0 ? "default" : "pointer";
        
        //由于显示5.5所以要大于
        nextBtn.style.opacity = currentIndex >= maxIndex ? "0.3" : "1";
        nextBtn.style.cursor = currentIndex >= maxIndex ? "default" : "pointer";
    }

    nextBtn.addEventListener('click', function(){
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateGallery();
            //向右最多不过3
        }
    });

    prevBtn.addEventListener('click', function(){
        if (currentIndex > 0) {
            currentIndex--;
            updateGallery();
        }
    });

    updateGallery();
});

// -----------------------------------------------------------