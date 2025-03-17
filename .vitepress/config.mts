import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
    title: "西兰花笔记",
    description: "经典，恒古不变",
    head: [
        ['link', { rel: 'icon', href: '/favicon.png', type: 'image/png' }]
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
            { text: '主页', link: '/' },
            {
                text: 'NodeJs',
                items: [
                    { text: 'NodeJs', link: '/node/nodejs/base/nodeBase' },
                    { text: 'Express', link: '/node/express/expressBase' },
                ]
            }
        ],

        sidebar: {
            '/node/nodejs/': [
                {
                    text: 'NodeJs基础',
                    collapsed: true,
                    items: [
                        { text: 'node简介', link: '/node/nodejs/base/nodeBase' },
                        { text: 'npm', link: '/node/nodejs/base/npm' },
                        { text: 'npx', link: '/node/nodejs/base/npx' },
                        { text: '模块化', link: '/node/nodejs/base/模块化' },
                    ]
                },
                {
                    text: 'NodeJsAPI',
                    collapsed: true,
                    items: [
                        { text: '全局变量', link: '/node/nodejs/api/全局变量' },
                        { text: '内置模块', link: '/node/nodejs/api/内置模块' },
                    ]
                }, {
                    text: 'NodeJs进阶',
                    collapsed: true,
                    items: [
                        { text: 'crypto', link: '/node/nodejs/Advanced/crypto' },
                        { text: 'ffmpeg', link: '/node/nodejs/Advanced/ffmpeg' },
                        { text: 'pngquant', link: '/node/nodejs/Advanced/pngquant' },
                        { text: '命令行工具', link: '/node/nodejs/Advanced/cmd' },
                        { text: 'zlib压缩', link: '/node/nodejs/Advanced/zlib' },
                        { text: '定时任务', link: '/node/nodejs/Advanced/定时任务' },
                    ]
                }
            ],
            '/node/express/': [
                {
                    text: 'Express',
                    items: [
                        { text: '基本使用', link: '/node/express/expressBase' },
                        { text: 'express防盗链', link: '' },
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
