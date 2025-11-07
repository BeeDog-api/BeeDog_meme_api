// 极简图片API
class SimpleImageAPI {
    constructor(username, repo, branch = 'main') {
        this.username = username;
        this.repo = repo;
        this.branch = branch;
        this.baseUrl = `https://raw.githubusercontent.com/${username}/${repo}/${branch}`;
    }

    /**
     * 获取所有图片文件名列表
     */
    async getImageList() {
        try {
            const response = await fetch(`${this.baseUrl}/images.json`);
            if (!response.ok) {
                throw new Error('无法获取图片列表');
            }
            return await response.json();
        } catch (error) {
            console.error('获取图片列表失败:', error);
            return [];
        }
    }

    /**
     * 获取指定图片的完整URL
     */
    getImageUrl(filename) {
        return `${this.baseUrl}/images/${filename}`;
    }

    /**
     * 获取随机一张图片的URL
     */
    async getRandomImage() {
        const images = await this.getImageList();
        if (images.length === 0) {
            throw new Error('没有可用的图片');
        }
        const randomFile = images[Math.floor(Math.random() * images.length)];
        return this.getImageUrl(randomFile);
    }
}

// 自动创建实例（使用当前仓库信息）
const currentScript = document.currentScript.src;
const match = currentScript.match(/raw\.githubusercontent\.com\/([^\/]+)\/([^\/]+)/);
let imageAPI;

if (match) {
    const [, username, repo] = match;
    imageAPI = new SimpleImageAPI(username, repo);
} else {
    // 手动指定（如果自动检测失败）
    imageAPI = new SimpleImageAPI('BeeDog-api', 'BeeDog_meme_api');
}

// 暴露到全局
window.imageAPI = imageAPI;