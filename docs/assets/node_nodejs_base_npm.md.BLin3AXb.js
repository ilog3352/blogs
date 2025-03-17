import{_ as s,c as e,o as a,ag as n}from"./chunks/framework.DuJzXpJq.js";const l="/blogs/node/1.png",g=JSON.parse('{"title":"","description":"","frontmatter":{},"headers":[],"relativePath":"node/nodejs/base/npm.md","filePath":"node/nodejs/base/npm.md","lastUpdated":1742196467000}'),o={name:"node/nodejs/base/npm.md"};function t(p,i,d,c,h,r){return a(),e("div",null,i[0]||(i[0]=[n('<h2 id="package-json" tabindex="-1">package.json <a class="header-anchor" href="#package-json" aria-label="Permalink to &quot;package.json&quot;">​</a></h2><p>执行<code>npm init</code>便可以初始化一个package.json</p><ol><li><code>name</code>：项目名称，必须是唯一的字符串，通常采用小写字母和连字符的组合。</li><li><code>version</code>：项目版本号，通常采用语义化版本号规范。</li><li><code>description</code>：项目描述。</li><li><code>main</code>：项目的主入口文件路径，通常是一个 JavaScript 文件。</li><li><code>keywords</code>：项目的关键字列表，方便他人搜索和发现该项目。</li><li><code>author</code>：项目作者的信息，包括姓名、邮箱、网址等。</li><li><code>license</code>：项目的许可证类型，可以是自定义的许可证类型或者常见的开源许可证（如 MIT、Apache 等）。</li><li><code>dependencies</code>：项目所依赖的包的列表，这些包会在项目运行时自动安装。</li><li><code>devDependencies</code>：项目开发过程中所需要的包的列表，这些包不会随项目一起发布，而是只在开发时使用。</li><li><code>peerDependencies</code>：项目的同级依赖，即项目所需要的模块被其他模块所依赖。</li><li><code>scripts</code>：定义了一些脚本命令，比如启动项目、运行测试等。</li><li><code>repository</code>：项目代码仓库的信息，包括类型、网址等。</li><li><code>bugs</code>：项目的 bug 报告地址。</li><li><code>homepage</code>：项目的官方网站地址或者文档地址。</li></ol><h2 id="npm-install原理" tabindex="-1">npm install原理 <a class="header-anchor" href="#npm-install原理" aria-label="Permalink to &quot;npm install原理&quot;">​</a></h2><p>默认采用扁平化的方式安装，使用的算法是广度优先遍历</p><p>扁平化只是理想状态 当依赖版本相同时，会采用扁平化安装，当依赖版本不同时，会采用嵌套安装</p><h2 id="npm-install-的执行流程" tabindex="-1">npm install 的执行流程 <a class="header-anchor" href="#npm-install-的执行流程" aria-label="Permalink to &quot;npm install 的执行流程&quot;">​</a></h2><p><img src="'+l+`" alt="图片描述"></p><p>FAQ:</p><ol><li>为什么会找这么多.npmrc文件 <ul><li><strong>npm 需要找所有的配置文件，这是因为它们可能包含不同的配置项，而不仅仅是相同配置项的不同值。</strong></li><li>高优先级的配置会覆盖低优先级的配置</li><li>项目级别 &gt; 用户级别 &gt; 全局级别 &gt; node内置级别</li></ul></li></ol><h2 id="package-lock-json作用" tabindex="-1">package-lock.json作用 <a class="header-anchor" href="#package-lock-json作用" aria-label="Permalink to &quot;package-lock.json作用&quot;">​</a></h2><ul><li><code>version</code> 该参数指定了当前包的版本号</li><li><code>resolved</code> 该参数指定了当前包的下载地址</li><li><code>integrity</code> 用于验证包的完整性</li><li><code>dev</code> 该参数指定了当前包是一个开发依赖包</li><li><code>bin</code> 该参数指定了当前包中可执行文件的路径和名称</li><li><code>engines</code> 该参数指定了当前包所依赖的 Node.js 版本范围</li><li><code>package-lock.json</code> 帮我们做了缓存，他会通过 <strong>name + version + integrity</strong> 信息生成一个唯一的key，这个key能找到对应的index-v5 下的缓存记录 在npm cache 文件夹</li></ul><h2 id="npm-run-原理" tabindex="-1">npm run 原理 <a class="header-anchor" href="#npm-run-原理" aria-label="Permalink to &quot;npm run 原理&quot;">​</a></h2><p>package.json 中 scripts 字段定义了脚本命令，npm run 命令会根据 scripts 字段中的命令来执行相应的脚本。</p><p>查找规则</p><ol><li>当前项目查找node_modules/.bin目录下的命令</li><li>如果没找到就去全局的node_modules 去找可执行命令vite</li><li>环境变量</li><li>报错</li></ol><h2 id="npm-生命周期" tabindex="-1">npm 生命周期 <a class="header-anchor" href="#npm-生命周期" aria-label="Permalink to &quot;npm 生命周期&quot;">​</a></h2><p>nodejs的sonsole.log跟浏览器console.log 是不同的</p><div class="language-js vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">script</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">:{</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;predev&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;node prev.js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;dev&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;node index.js&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">,</span></span>
<span class="line"><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">    &quot;postdev&quot;</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">: </span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;">&quot;node post.js&quot;</span></span>
<span class="line"><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;">}</span></span></code></pre></div><p>predev 是前置脚本，在dev之前执行</p><p>postdev 是后置脚本，在dev之后执行</p><h2 id="发布npm包" tabindex="-1">发布npm包 <a class="header-anchor" href="#发布npm包" aria-label="Permalink to &quot;发布npm包&quot;">​</a></h2><ol><li>添加npm账号 必须是官方源</li><li>包名不能重复 版本不能重复</li></ol><div class="language-sh vp-adaptive-theme"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki shiki-themes github-light github-dark vp-code" tabindex="0"><code><span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> adduser</span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> login</span><span style="--shiki-light:#24292E;--shiki-dark:#E1E4E8;"> </span></span>
<span class="line"><span style="--shiki-light:#6F42C1;--shiki-dark:#B392F0;">npm</span><span style="--shiki-light:#032F62;--shiki-dark:#9ECBFF;"> publish</span></span></code></pre></div><h2 id="搭建npm私服" tabindex="-1">搭建npm私服 <a class="header-anchor" href="#搭建npm私服" aria-label="Permalink to &quot;搭建npm私服&quot;">​</a></h2><p><a href="https://verdaccio.org/zh-cn/" target="_blank" rel="noreferrer">https://verdaccio.org/zh-cn/</a></p>`,26)]))}const m=s(o,[["render",t]]);export{g as __pageData,m as default};
