import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "My Awesome Project",
    description: "A VitePress Site",
    outDir: "docs", // 打包文件夹
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        // 顶部导航
        nav: [
            { text: 'Home', link: '/' },
            { text: 'Examples', link: '/markdown-examples' }
        ],
        // 左侧导航
        sidebar: [
            {
                text: 'Examples',
                items: [
                    { text: '左侧', link: '/markdown-examples' },
                    { text: 'Runtime API Examples', link: '/api-examples' }
                ]
            }
        ],
        // 上一页 下一页
        docFooter: {
            prev: '上一页',
            next: '下一页'
        },
        // 最后更改时间 配合git
        lastUpdated: {
            text: '最后修改时间',
            formatOptions: {
                dateStyle: 'full',
                timeStyle: 'short'
            }
        },
        // 搜索
        search: {
            provider: 'local'
        },
        // 社交链接
        socialLinks: [
            { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
        ]
    }
})
