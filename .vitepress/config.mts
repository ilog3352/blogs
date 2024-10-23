import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "前端知识汇总",
    description: "",
    outDir: "docs", // 打包文件夹
    base: "/blogs/",
    themeConfig: {
        // https://vitepress.dev/reference/default-theme-config
        // 顶部导航
        nav: [
            { text: '知识点', link: '/knowledge/nginx' },
            { text: '面试题', link: '/interview/yuanxinglian' },
        ],
        // 左侧导航
        sidebar: {
            "/knowledge/": [
                {
                    text: '知识点',
                    items: [
                        { text: 'node', link: '/knowledge/node' },
                        { text: 'react', link: '/knowledge/react' },
                        { text: 'nginx', link: '/knowledge/nginx' },
                        { text: 'WebRTC', link: '/knowledge/WebRTC' },
                        { text: 'ci/cd', link: '/knowledge/cicd' },
                        { text: 'typescript', link: '/knowledge/TypeScript' },
                        { text: 'git命令', link: '/knowledge/git' },
                        { text: 'webpack', link: '/knowledge/webpack' },

                    ]
                },
            ],
            "/interview/": [
                {
                    text: '面试题',
                    items: [
                        { text: '原型链', link: '/interview/yuanxinglian' },
                        { text: '跨域', link: '/interview/跨域' },
                        { text: '埋点', link: '/interview/埋点' },
                        { text: 'diff算法', link: '/interview/diff' },
                        { text: 'for of', link: '/interview/forof' },
                        { text: 'vite跟webpack区别', link: '/interview/vite跟webpack区别' },
                    ]
                },
            ],
        },

        // 上一页 下一页
        docFooter: {
            prev: '上一页',
            next: '下一页'
        },
        // 社交链接
        socialLinks: [
            { icon: 'github', link: 'https://github.com/ilog3352/blogs' }
        ]
    }
})
