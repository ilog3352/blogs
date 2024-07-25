import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "zhangshuo blog",
    description: "",
    outDir: "docs", // 打包文件夹
    base: "/blogs/",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        // 顶部导航
        nav: [
            { text: '主页', link: '/' },
            { text: '前端面试题', link: '/interview/network/跨域' },
            { text: '知识点', link: '/knowledge-point/nginx' }
        ],
        // 左侧导航
        sidebar: {
            "/interview/": [
                {
                    text: 'project',
                    items: [
                        { text: 'vite webpack区别', link: '/interview/project/vite跟webpack区别' },
                    ]
                },
                {
                    text: 'Network',
                    items: [
                        { text: '跨域', link: '/interview/network/跨域' },
                    ]
                }, {
                    text: 'other',
                    items: [
                        { text: '埋点', link: '/interview/other/埋点' },
                    ]
                }
            ],
            "/knowledge-point/": [
                {
                    text: '知识点',
                    items: [
                        { text: 'nginx', link: '/knowledge-point/nginx' },
                        { text: 'WebRTC', link: '/knowledge-point/WebRTC' },
                        { text: 'ci/cd', link: '/knowledge-point/cicd' }
                    ]
                },
            ]
        },

        // 上一页 下一页
        docFooter: {
            prev: '上一页',
            next: '下一页'
        },
        // 最后更改时间 配合git
        lastUpdated: {
            text: '最后修改时间',
            formatOptions: {
                dateStyle: 'short',
                timeStyle: 'short'
            }
        },
        // 搜索
        search: {
            provider: 'local'
        },
        // 社交链接
        socialLinks: [
            { icon: 'github', link: 'https://github.com/ilog3352/blogs' }
        ]
    }
})
