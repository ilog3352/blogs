import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "",
    description: "A VitePress Site",
    outDir: "docs", // 打包文件夹
    base: "/blogs/",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        // 顶部导航
        nav: [
            { text: '主页', link: '/' },
            { text: '前端面试题', link: '/interview/network/url' },
            { text: '知识点', link: '/knowledge-point/nginx' }
        ],
        // 左侧导航
        sidebar: [
            {
                text: 'HTML',
                items: [

                ]
            },
            {
                text: 'CSS',
                items: [

                ]
            },
            {
                text: 'Javascript',
                items: [

                ]
            },
            {
                text: 'TypeScript',
                items: [

                ]
            },
            {
                text: 'Vue',
                items: [

                ]
            },
            {
                text: 'Network',
                items: [
                    { text: '输入url浏览器发生了什么', link: '/interview/network/url' }
                ]
            }
        ],

        // // 上一页 下一页
        // docFooter: {
        //     prev: '上一页',
        //     next: '下一页'
        // },
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
            { icon: 'github', link: 'https://github.com/ilog3352/blogs' }
        ]
    }
})
