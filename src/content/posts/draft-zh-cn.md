---
title: 草稿示例（中文版）
published: 2022-07-01
description: 了解如何通过 draft 字段控制文章是否发布。
tags: [Markdown, 博客, 演示]
category: 示例
draft: true
lang: zh_CN
---

英文原文：[Draft Example](../draft/)。

# 这篇文章是一份草稿

这篇文章目前处于草稿状态，尚未发布，因此不会向普通读者展示。内容仍在编写中，可能需要进一步修改和审阅。

当文章准备好发布时，将顶部元信息（Front Matter）中的 `draft` 字段改为 `false`：

```markdown
---
title: 草稿示例
published: 2024-01-11T04:40:26.381Z
tags: [Markdown, 博客, 演示]
category: 示例
draft: false
lang: zh_CN
---
```
