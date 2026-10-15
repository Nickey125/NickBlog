---
title: Fuwari 简明使用指南（中文版）
published: 2024-04-01
description: 了解如何使用这个博客模板。
image: "./cover.jpeg"
tags: [Fuwari, 博客, 自定义]
category: 指南
draft: false
lang: zh_CN
---

英文原文：[Simple Guides for Fuwari](../)。

> 封面图片来源：[原图](https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/208fc754-890d-4adb-9753-2c963332675d/width=2048/01651-1456859105-(colour_1.5),girl,_Blue,yellow,green,cyan,purple,red,pink,_best,8k,UHD,masterpiece,male%20focus,%201boy,gloves,%20ponytail,%20long%20hair,.jpeg)

这个博客模板基于 [Astro](https://astro.build/) 构建。对于本指南未涉及的内容，可以查阅 [Astro 文档](https://docs.astro.build/)。

## 文章元信息（Front Matter）

在 Markdown 文件开头，用两行 `---` 包裹文章元信息：

```yaml
---
title: 我的第一篇博客
published: 2023-09-09
description: 这是我的新 Astro 博客的第一篇文章。
image: ./cover.jpg
tags: [技术, 笔记]
category: 前端
draft: false
lang: zh_CN
---
```

| 字段 | 说明 |
| --- | --- |
| `title` | 文章标题。 |
| `published` | 文章的发布日期，必填。 |
| `updated` | 可选的修改日期，需要手动维护；与发布日期不同时，会在文章详情页显示。 |
| `description` | 文章的简短描述，显示在首页的文章卡片中。 |
| `image` | 文章封面路径。<br/>1. 以 `http://` 或 `https://` 开头：使用网络图片。<br/>2. 以 `/` 开头：使用 `public` 目录中的图片。<br/>3. 不带上述前缀：路径相对于当前 Markdown 文件。 |
| `tags` | 文章标签，可以设置多个，例如 `[技术, 笔记]`。 |
| `category` | 文章分类，每篇文章设置一个。 |
| `draft` | 是否为草稿。设为 `true` 时不会发布；设为 `false` 时正常发布。 |
| `lang` | 文章语言，例如 `zh_CN`（简体中文）；留空时使用站点语言。 |

分类和标签会自动汇总，归档页面则会根据文章发布日期整理文章。

## 文章文件放在哪里

文章文件应放在 `src/content/posts/` 目录中。也可以创建子目录，将文章与它使用的图片等资源放在一起：

```text
src/content/posts/
├── post-1.md
└── post-2/
    ├── cover.png
    └── index.md
```

在这个例子中，`post-2/index.md` 可以通过 `image: ./cover.png` 使用同目录下的封面图片。
