# Furina 的博客

基于 Jekyll 的个人博客，托管于 GitHub Pages：**https://furina-1314.github.io**

设计基调参考 Equora 官网：浅色、留白、细线、红色点缀（`#c32f37`）。

## 目录结构

```
├── _config.yml            # 站点配置（主题色、背景图、标题等）★ 常改
├── _data/navigation.yml   # 顶部导航栏目 ★ 常改
├── _posts/                # 所有文章（Markdown）★ 常改
├── assets/gallery/        # 相册图片（放进来就自动展示）
├── assets/img/            # 文章配图等素材
├── _layouts/ _includes/   # 页面模板（改版式才需要动）
├── blog/ gallery/         # 文章列表页 / 相册页
├── about.md               # 「关于我」页面内容
└── index.html             # 首页（文案可在此直接修改）
```

改完任何文件，执行 `git add . && git commit -m "..." && git push`，
GitHub Pages 约 1 分钟后自动重新构建上线。

## 常用维护操作

### 1. 发布文章

在 `_posts/` 新建文件，命名 **必须是** `YYYY-MM-DD-英文或拼音标题.md`，例如
`2026-10-01-my-new-post.md`：

```markdown
---
title: "文章的中文标题"
categories: [随笔]        # 栏目（可写多个，决定首页栏目卡片与筛选）
---

正文用普通 Markdown 书写，支持图片、代码块、表格等 GitHub 语法。
```

推送后文章自动出现在首页「最新文章」、文章列表页，RSS 同步更新。
文章里插图：把图片放进 `assets/img/`，正文写 `![说明](/assets/img/xxx.jpg)`。

### 2. 更换主题色

打开 `_config.yml`，改 `accent_color` 为任意 HEX 色值（如 `"#2563eb"` 蓝色），
推送即可全站生效（按钮、链接、点缀、浏览器状态栏颜色）。

### 3. 设置背景图片

把图片放进 `assets/img/`，然后在 `_config.yml` 填写：

```yml
background_image: assets/img/bg.jpg
```

背景会自动叠加 90% 白色纱罩保证文字可读；留空 `""` 即恢复纯白背景。

### 4. 上传相册

把图片直接放进 `assets/gallery/` 推送即可，相册页自动展示所有图片，
文件名（不含扩展名，`-` 会替换为空格）显示为图片说明。
建议命名如 `2026-09-西湖-断桥.jpg`。点击图片可查看大图。

### 5. 上传普通图片（文章配图、头像等）

放进 `assets/img/`，在文章或页面中用标准 Markdown 引用即可。

### 6. 栏目管理

- **顶部导航栏目**：编辑 `_data/navigation.yml`，增删改都按现有格式；
  外部链接加 `external: true`。
- **文章栏目（分类）**：由每篇文章 front matter 的 `categories` 自动生成，
  首页「栏目」卡片和文章页筛选按钮会自动跟着文章变化，无需手工登记。

### 7. 修改首页 / 关于页文案

- 首页大标题、导语、三句格言：编辑 `index.html` 顶部对应文字。
- 「关于我」：编辑 `about.md`。

## 本地预览（可选）

需安装 Ruby（https://rubyinstaller.org）与 Jekyll：

```bash
gem install github-pages
bundle exec jekyll serve   # 打开 http://localhost:4000
```

不装也没关系——直接 push 后在仓库的 **Actions / Deployments** 页可看构建状态。

## 其他

- RSS 订阅地址：https://furina-1314.github.io/feed.xml
- 页面 404 已配置；构建失败会在仓库 Settings → Pages 顶部与邮件中提示。
- 站点图标：`assets/favicon.svg`（替换此文件即可换 logo）。
