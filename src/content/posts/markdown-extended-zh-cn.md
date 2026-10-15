---
title: Markdown 扩展功能（中文版）
published: 2024-05-01
updated: 2024-11-29
description: 了解 Fuwari 支持的 Markdown 扩展功能。
image: ''
tags: [演示, 示例, Markdown, Fuwari]
category: 示例
draft: false
lang: zh_CN
---

英文原文：[Markdown Extended Features](../markdown-extended/)。

## GitHub 仓库卡片

你可以添加链接到 GitHub 仓库的动态卡片。页面加载时，会通过 GitHub API 获取仓库信息。

::github{repo="Fabrizz/MMM-OnSpotify"}

使用 `::github{repo="<owner>/<repo>"}` 创建仓库卡片，将 `<owner>/<repo>` 替换为仓库所有者和仓库名称：

```markdown
::github{repo="saicaca/fuwari"}
```

## 提示块

支持以下类型的提示块：`note`（说明）、`tip`（提示）、`important`（重要）、`warning`（警告）、`caution`（注意）。

:::note
突出显示读者需要了解的信息，即使只是快速浏览，也不应忽略。
:::

:::tip
提供有助于读者更顺利完成任务的补充信息。
:::

:::important
提供完成任务所必需的关键信息。
:::

:::warning
指出潜在风险，提醒读者立即关注。
:::

:::caution
说明某项操作可能带来的不良后果。
:::

### 基础语法

```markdown
:::note
突出显示读者需要了解的信息，即使只是快速浏览，也不应忽略。
:::

:::tip
提供有助于读者更顺利完成任务的补充信息。
:::
```

### 自定义标题

提示块的标题可以自定义。

:::note[我的自定义标题]
这是一个带有自定义标题的说明块。
:::

```markdown
:::note[我的自定义标题]
这是一个带有自定义标题的说明块。
:::
```

### GitHub 风格语法

> [!TIP]
> 同样支持 [GitHub 风格的提示语法](https://github.com/orgs/community/discussions/16925)。

```markdown
> [!NOTE]
> 同样支持 GitHub 风格的提示语法。

> [!TIP]
> 同样支持 GitHub 风格的提示语法。
```

### 隐藏内容（防剧透）

可以在正文中添加默认隐藏的内容，其中也支持 **Markdown** 语法。

这段内容 :spoiler[默认隐藏，**点击查看**]！

```markdown
这段内容 :spoiler[默认隐藏，**点击查看**]！
```
