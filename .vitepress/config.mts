import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "前端笔记",
    description: "经典，恒古不变",
    head: [
        ['link', { rel: 'icon', href: '/blogs/favicon.png', type: 'image/png' }]
    ],
    outDir: 'docs',
    base: "/blogs/",
    themeConfig: {
        logo: '/favicon.png',
        search: {
            provider: 'local',
        },
        lastUpdated: {
            text: '上次更新时间',
            formatOptions: {
                dateStyle: 'long',
                timeStyle: 'short',
            },
        },
        nav: [
            { text: '首页', link: '/' },
            {
                text: 'NodeJs',
                items: [
                    { text: 'NodeJs', link: '/node/nodejs/base/nodeBase' },
                    { text: 'nestjs', link: '/node/nestjs/base' }
                ]
            }, {
                text: 'React', link: '/react/hooks/useState'
            }, {
                text: 'everything', link: '/interview/vue/vue2和vue3的区别'
            }
        ],

        sidebar: {
            '/node/nodejs/': [
                {
                    text: 'NodeJs基础',
                    // collapsed: true,
                    items: [
                        { text: 'node简介', link: '/node/nodejs/base/nodeBase' },
                        { text: 'npm', link: '/node/nodejs/base/npm' },
                        { text: 'npx', link: '/node/nodejs/base/npx' },
                        { text: '模块化', link: '/node/nodejs/base/模块化' },
                    ]
                }, {
                    text: 'NodeJs进阶',
                    // collapsed: true,
                    items: [
                        { text: 'crypto', link: '/node/nodejs/Advanced/crypto' },
                        { text: 'ffmpeg', link: '/node/nodejs/Advanced/ffmpeg' },
                        { text: 'pngquant', link: '/node/nodejs/Advanced/pngquant' },
                        { text: '命令行工具', link: '/node/nodejs/Advanced/cmd' },
                        { text: 'zlib压缩', link: '/node/nodejs/Advanced/zlib' },
                        { text: '定时任务', link: '/node/nodejs/Advanced/定时任务' },
                        { text: 'puppeteer', link: '/node/nodejs/Advanced/puppeteer' },
                        { text: 'socket', link: '/node/nodejs/Advanced/socket' },
                        { text: '大文件上传', link: '/node/nodejs/Advanced/bigFileUpload' },
                        { text: '文件流下载', link: '/node/nodejs/Advanced/download' },
                        { text: 'http缓存', link: '/node/nodejs/Advanced/httpcache' },
                        { text: '登录系列', link: '/node/nodejs/Advanced/login' },
                    ]
                }, {
                    text: 'NodeJsAPI',
                    // collapsed: true,
                    items: [
                        { text: '全局变量', link: '/node/nodejs/api/全局变量' },
                        { text: '内置模块', link: '/node/nodejs/api/内置模块' },
                    ]
                },
            ],
            '/node/nestjs/': [
                { text: 'nest介绍', link: 'node/nestjs/base' },
                { text: '常用命令', link: 'node/nestjs/order' },
                { text: 'prisma', link: 'node/nestjs/prisma' }
            ],
            '/react/': [
                {
                    text: 'Hooks',
                    items: [
                        { text: 'useState', link: 'react/hooks/useState' },
                        { text: 'useReducer', link: 'react/hooks/useReducer' },
                        { text: 'useEffect', link: 'react/hooks/useEffect' },
                    ]
                }, {
                    text: "Router",
                    items: [
                        { text: 'react-router', link: 'react/router/react-router' },
                    ]
                }
            ],
            'interview': [
                {
                    text: 'vue',
                    items: [
                        { text: 'vue2和vue3的区别', link: '/interview/vue/vue2和vue3的区别' },
                        { text: 'diff算法', link: '/interview/vue/diff' },
                        { text: '响应式原理', link: '/interview/vue/响应式原理' },
                        { text: '虚拟dom', link: '/interview/vue/虚拟dom' },

                    ]
                },
                {
                    text: 'react',
                    items: [
                    ]
                }
            ]
        },
        socialLinks: [
            { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
        ],
        outline: {
            level: [2, 3],
            // label: '目录'
        }
    }
})
