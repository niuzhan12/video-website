// 视频数据
const videoData = {
    all: [
        {
            id: 1,
            title: "奥特之父和奥特之母",
            thumbnail: "https://via.placeholder.com/300x200/ff6b6b/ffffff?text=AI换脸",
            video: "lbxx/蜡笔小新_爱给网_aigei_com.mp4",
            views: 585,
            duration: "11:03",
            brand: "OL传媒",
            category: "domestic"
        },
        {
            id: 2,
            title: "【日韩精选】小爱和小心的深入交流",
            thumbnail: "https://via.placeholder.com/300x200/4ecdc4/ffffff?text=爱豆传媒",
            video: "sample-video2.mp4",
            views: 1266,
            duration: "21:50",
            brand: "爱豆传媒",
            category: "media"
        },
        {
            id: 3,
            title: "沸羊羊终于舔到了美羊羊",
            thumbnail: "https://via.placeholder.com/300x200/45b7d1/ffffff?text=致命出轨",
            video: "sample-video3.mp4",
            views: 667,
            duration: "35:42",
            brand: "麻豆传媒",
            category: "domestic"
        },
        {
            id: 4,
            title: "禁忌之恋，王母娘娘和美猴王",
            thumbnail: "https://via.placeholder.com/300x200/96ceb4/ffffff?text=恋爱时",
            video: "sample-video4.mp4",
            views: 361,
            duration: "39:54",
            brand: "MD543.COM",
            category: "japan"
        },
        {
            id: 5,
            title: "【日韩精选】校园青春恋爱物语",
            thumbnail: "https://via.placeholder.com/300x200/feca57/ffffff?text=校园青春",
            video: "sample-video5.mp4",
            views: 892,
            duration: "28:15",
            brand: "日韩传媒",
            category: "japan"
        },
 
        // 添加你的新视频 - 示例
        {
            id: 9,
            title: "肥嘟嘟左卫门大人的精彩表演",
            thumbnail: "your-thumbnail.jpg", // 替换为你的缩略图路径
            video: "your-video.mp4", // 替换为你的视频文件路径
            views: 1234,
            duration: "15:30",
            brand: "肥嘟嘟传媒",
            category: "domestic" // 可选分类：domestic, media, gossip, japan, commentary, dating, spring
        }
    ],
    domestic: [],
    media: [],
    gossip: [],
    japan: [],
    commentary: [],
    dating: [],
    spring: [],
    more: []
};

// 初始化分类数据
Object.keys(videoData).forEach(category => {
    if (category !== 'all') {
        videoData[category] = videoData.all.filter(video => video.category === category);
    }
});

// DOM元素
const videoGrid = document.getElementById('videoGrid');
const navItems = document.querySelectorAll('.nav-item');
const navLeft = document.getElementById('navLeft');
const navRight = document.getElementById('navRight');
const navScroll = document.getElementById('navScroll');
const videoModal = document.getElementById('videoModal');
const closeModal = document.getElementById('closeModal');
const videoPlayer = document.getElementById('videoPlayer');
const videoTitle = document.getElementById('videoTitle');
const videoDescription = document.getElementById('videoDescription');

// 当前选中的分类
let currentCategory = 'all';

// 初始化页面
document.addEventListener('DOMContentLoaded', () => {
    renderVideos(currentCategory);
    setupEventListeners();
    setupNavigation();
});

// 渲染视频网格
function renderVideos(category) {
    const videos = videoData[category] || [];
    videoGrid.innerHTML = '';
    
    if (videos.length === 0) {
        videoGrid.innerHTML = '<div class="loading">暂无视频内容</div>';
        return;
    }
    
    videos.forEach(video => {
        const videoElement = createVideoElement(video);
        videoGrid.appendChild(videoElement);
    });
}

// 创建视频元素
function createVideoElement(video) {
    const videoDiv = document.createElement('div');
    videoDiv.className = 'video-item';
    videoDiv.innerHTML = `
        <div class="video-thumbnail">
            <img src="${video.thumbnail}" alt="${video.title}" loading="lazy">
            <div class="video-overlay">
                <div class="video-brand">${video.brand}</div>
                <div class="video-stats">
                    <div class="stat-item">
                        <i class="fas fa-eye"></i>
                        <span>${video.views}</span>
                    </div>
                    <div class="stat-item">
                        <i class="fas fa-clock"></i>
                        <span>${video.duration}</span>
                    </div>
                </div>
                <div class="video-actions">
                    <button class="action-button" onclick="event.stopPropagation(); hideVideo(${video.id})">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            </div>
        </div>
        <div class="video-info">
            <div class="video-title">${video.title}</div>
            <div class="video-meta">
                <span>${video.brand}</span>
                <span>${video.duration}</span>
            </div>
        </div>
    `;
    
    videoDiv.addEventListener('click', () => openVideoModal(video));
    return videoDiv;
}

// 打开视频模态框
function openVideoModal(video) {
    videoPlayer.src = video.video;
    videoTitle.textContent = video.title;
    videoDescription.textContent = `观看次数: ${video.views} | 时长: ${video.duration} | 分类: ${getCategoryName(video.category)}`;
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// 关闭视频模态框
function closeVideoModal() {
    videoModal.classList.remove('active');
    videoPlayer.pause();
    videoPlayer.src = '';
    document.body.style.overflow = 'auto';
}

// 隐藏视频
function hideVideo(videoId) {
    const videoIndex = videoData.all.findIndex(v => v.id === videoId);
    if (videoIndex > -1) {
        videoData.all.splice(videoIndex, 1);
        // 更新分类数据
        Object.keys(videoData).forEach(category => {
            if (category !== 'all') {
                videoData[category] = videoData.all.filter(video => video.category === category);
            }
        });
        renderVideos(currentCategory);
    }
}

// 获取分类名称
function getCategoryName(category) {
    const categoryNames = {
        'all': '全部',
        'domestic': '国产',
        'media': '传媒',
        'gossip': '吃瓜',
        'japan': '日韩',
        'commentary': '解说',
        'dating': '同城交友',
        'spring': '春',
        'more': '更多'
    };
    return categoryNames[category] || category;
}

// 设置事件监听器
function setupEventListeners() {
    // 分类导航
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const category = item.dataset.category;
            switchCategory(category);
        });
    });
    
    // 关闭模态框
    closeModal.addEventListener('click', closeVideoModal);
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) {
            closeVideoModal();
        }
    });
    
    // 键盘事件
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) {
            closeVideoModal();
        }
    });
}

// 切换分类
function switchCategory(category) {
    currentCategory = category;
    
    // 更新导航状态
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.dataset.category === category) {
            item.classList.add('active');
        }
    });
    
    // 渲染视频
    renderVideos(category);
}

// 设置导航滚动
function setupNavigation() {
    let scrollPosition = 0;
    const scrollStep = 200;
    
    navLeft.addEventListener('click', () => {
        scrollPosition = Math.max(0, scrollPosition - scrollStep);
        navScroll.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    });
    
    navRight.addEventListener('click', () => {
        const maxScroll = navScroll.scrollWidth - navScroll.clientWidth;
        scrollPosition = Math.min(maxScroll, scrollPosition + scrollStep);
        navScroll.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    });
    
    // 监听滚动位置
    navScroll.addEventListener('scroll', () => {
        const maxScroll = navScroll.scrollWidth - navScroll.clientWidth;
        navLeft.style.opacity = navScroll.scrollLeft > 0 ? '1' : '0.5';
        navRight.style.opacity = navScroll.scrollLeft < maxScroll ? '1' : '0.5';
    });
    
    // 初始化按钮状态
    navLeft.style.opacity = '0.5';
}

// 搜索功能
function searchVideos(query) {
    const allVideos = videoData.all;
    const filteredVideos = allVideos.filter(video => 
        video.title.toLowerCase().includes(query.toLowerCase()) ||
        video.brand.toLowerCase().includes(query.toLowerCase())
    );
    
    // 临时替换数据
    const originalData = { ...videoData };
    videoData.all = filteredVideos;
    renderVideos('all');
    
    // 恢复原始数据（这里可以根据需要调整）
    setTimeout(() => {
        Object.assign(videoData, originalData);
    }, 1000);
}

// 添加新视频
function addVideo(video) {
    video.id = Date.now(); // 简单的ID生成
    videoData.all.unshift(video);
    
    // 更新分类数据
    if (video.category && video.category !== 'all') {
        videoData[video.category].unshift(video);
    }
    
    renderVideos(currentCategory);
}

// 获取视频统计
function getVideoStats() {
    const totalVideos = videoData.all.length;
    const totalViews = videoData.all.reduce((sum, video) => sum + video.views, 0);
    const categories = Object.keys(videoData).filter(key => key !== 'all');
    
    return {
        totalVideos,
        totalViews,
        categories: categories.map(cat => ({
            name: cat,
            count: videoData[cat].length
        }))
    };
}

// 导出功能（用于调试）
window.videoApp = {
    switchCategory,
    searchVideos,
    addVideo,
    getVideoStats,
    videoData
};

// 页面加载完成后的初始化
console.log('蜜桃视频网站已加载完成');
console.log('视频统计:', getVideoStats());