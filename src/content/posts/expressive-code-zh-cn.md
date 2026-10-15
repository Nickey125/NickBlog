---
title: Expressive Code 代码块示例（中文版）
published: 2024-04-10
description: 展示 Expressive Code 的语法高亮、代码框、标记、自动换行、折叠和行号功能。
tags: [Markdown, 博客, 演示]
category: 示例
draft: false
lang: zh_CN
---

英文原文：[Expressive Code Example](../expressive-code/)。

本文展示使用 [Expressive Code](https://expressive-code.com/) 渲染代码块时的效果。示例基于官方文档，更多细节可查看各节的文档链接。

下方保留了示例代码和匹配文本的英文内容，便于对照语法、行号与高亮结果。代码围栏后的参数用于控制每个代码块的显示效果。

## Expressive Code

### 语法高亮

[语法高亮文档](https://expressive-code.com/key-features/syntax-highlighting/)

#### 常规语法高亮

在代码围栏后写上语言名称，例如 `js`、`python` 或 `html`，即可启用对应语言的语法高亮。

```js
console.log('This code is syntax highlighted!')
```

#### 渲染 ANSI 转义序列

将语言设为 `ansi` 可以渲染 ANSI 颜色与文字样式。下面保留原示例的文本；仅写出颜色名称并不会产生对应颜色，还需要文本中实际包含 ANSI 转义序列。

```ansi
ANSI colors:
- Regular: [31mRed[0m [32mGreen[0m [33mYellow[0m [34mBlue[0m [35mMagenta[0m [36mCyan[0m
- Bold:    [1;31mRed[0m [1;32mGreen[0m [1;33mYellow[0m [1;34mBlue[0m [1;35mMagenta[0m [1;36mCyan[0m
- Dimmed:  [2;31mRed[0m [2;32mGreen[0m [2;33mYellow[0m [2;34mBlue[0m [2;35mMagenta[0m [2;36mCyan[0m

256 colors (showing colors 160-177):
[38;5;160m160 [38;5;161m161 [38;5;162m162 [38;5;163m163 [38;5;164m164 [38;5;165m165[0m
[38;5;166m166 [38;5;167m167 [38;5;168m168 [38;5;169m169 [38;5;170m170 [38;5;171m171[0m
[38;5;172m172 [38;5;173m173 [38;5;174m174 [38;5;175m175 [38;5;176m176 [38;5;177m177[0m

Full RGB colors:
[38;2;34;139;34mForestGreen - RGB(34, 139, 34)[0m

Text formatting: [1mBold[0m [2mDimmed[0m [3mItalic[0m [4mUnderline[0m
```

### 编辑器与终端样式的代码框

[代码框文档](https://expressive-code.com/key-features/frames/)

#### 代码编辑器样式

使用 `title="文件名"` 设置标题，也可以通过代码第一行的文件名注释提供文件信息。

```js title="my-test-file.js"
console.log('Title attribute example')
```

---

```html
<!-- src/content/index.html -->
<div>File name comment example</div>
```

#### 终端样式

Shell 等终端语言可以显示为终端样式；同样可以用 `title` 设置标题。

```bash
echo "This terminal frame has no title"
```

---

```powershell title="PowerShell terminal example"
Write-Output "This one has a title!"
```

#### 手动指定代码框类型

`frame="none"` 隐藏代码框装饰，`frame="code"` 强制使用编辑器样式。

```sh frame="none"
echo "Look ma, no frame!"
```

---

```ps frame="code" title="PowerShell Profile.ps1"
# Without overriding, this would be a terminal frame
function Watch-Tail { Get-Content -Tail 20 -Wait $args }
New-Alias tail Watch-Tail
```

### 文本与行标记

[文本与行标记文档](https://expressive-code.com/key-features/text-markers/)

#### 标记整行或连续多行

使用 `{1, 4, 7-8}` 标记指定行号和行号范围。

```js {1, 4, 7-8}
// Line 1 - targeted by line number
// Line 2
// Line 3
// Line 4 - targeted by line number
// Line 5
// Line 6
// Line 7 - targeted by range "7-8"
// Line 8 - targeted by range "7-8"
```

#### 选择行标记类型（mark、ins、del）

`ins={3-4}` 表示新增行，`del={2}` 表示删除行，未指定类型的 `{6}` 使用默认标记。

```js title="line-markers.js" del={2} ins={3-4} {6}
function demo() {
  console.log('this line is marked as deleted')
  // This line and the next one are marked as inserted
  console.log('this is the second inserted line')

  return 'this line uses the neutral default marker type'
}
```

#### 为行标记添加标签

可以在行号前附加标签，例如 `{"1":5}`，为第 5 行添加标签“1”。

```jsx {"1":5} del={"2":7-8} ins={"3":10-12}
// labeled-line-markers.jsx
<button
  role="button"
  {...props}
  value={value}
  className={buttonClassName}
  disabled={disabled}
  active={active}
>
  {children &&
    !active &&
    (typeof children === 'string' ? <span>{children}</span> : children)}
</button>
```

#### 将较长的标签单独显示在一行

标签也可以是较长的说明文字，用来解释某段代码的修改目的。

```jsx {"1. Provide the value prop here:":5-6} del={"2. Remove the disabled and active states:":8-10} ins={"3. Add this to render the children inside the button:":12-15}
// labeled-line-markers.jsx
<button
  role="button"
  {...props}

  value={value}
  className={buttonClassName}

  disabled={disabled}
  active={active}
>

  {children &&
    !active &&
    (typeof children === 'string' ? <span>{children}</span> : children)}
</button>
```

#### 使用类似 diff 的语法

使用 `diff` 语言时，可以通过行首的 `+` 和 `-` 表示新增与删除内容。

```diff
+this line will be marked as inserted
-this line will be marked as deleted
this is a regular line
```

---

```diff
--- a/README.md
+++ b/README.md
@@ -1,3 +1,4 @@
+this is an actual diff file
-all contents will remain unmodified
 no whitespace will be removed either
```

#### 将语法高亮与 diff 风格的标记结合

使用 `diff lang="js"`，可以同时显示 JavaScript 语法高亮和 diff 标记。

```diff lang="js"
  function thisIsJavaScript() {
    // This entire block gets highlighted as JavaScript,
    // and we can still add diff markers to it!
-   console.log('Old code to be removed')
+   console.log('New and shiny code!')
  }
```

#### 标记行内的指定文本

在代码围栏后使用引号指定要匹配的文本，同一代码块中的多个匹配项都会被标记。

```js "given text"
function demo() {
  // Mark any given text inside lines
  return 'Multiple matches of the given text are supported';
}
```

#### 使用正则表达式匹配文本

可以使用 `/正则表达式/` 匹配文本，例如 `/ye[sp]/` 匹配 `yes` 和 `yep`。

```ts /ye[sp]/
console.log('The words yes and yep will be marked.')
```

#### 转义正斜杠

正则表达式中的正斜杠需要写为 `\/`，例如匹配文件路径时。

```sh /\/ho.*\//
echo "Test" > /home/test.txt
```

#### 选择行内标记类型（mark、ins、del）

使用 `ins="文本"` 和 `del="文本"` 指定新增、删除标记，单独的字符串使用默认标记。

```js "return true;" ins="inserted" del="deleted"
function demo() {
  console.log('These are inserted and deleted marker types');
  // The return statement uses the default marker type
  return true;
}
```

### 自动换行

[自动换行文档](https://expressive-code.com/key-features/word-wrap/)

#### 为单个代码块设置自动换行

`wrap` 启用自动换行，`wrap=false` 关闭自动换行。

```js wrap
// Example with wrap
function getLongString() {
  return 'This is a very long string that will most probably not fit into the available space unless the container is extremely wide'
}
```

---

```js wrap=false
// Example with wrap=false
function getLongString() {
  return 'This is a very long string that will most probably not fit into the available space unless the container is extremely wide'
}
```

#### 设置换行后的缩进

`preserveIndent` 保留换行后的缩进（默认启用），`preserveIndent=false` 关闭这一行为。

```js wrap preserveIndent
// Example with preserveIndent (enabled by default)
function getLongString() {
  return 'This is a very long string that will most probably not fit into the available space unless the container is extremely wide'
}
```

---

```js wrap preserveIndent=false
// Example with preserveIndent=false
function getLongString() {
  return 'This is a very long string that will most probably not fit into the available space unless the container is extremely wide'
}
```

## 可折叠区域

使用 `collapse={1-5, 12-14, 21-24}` 指定初始折叠的行号范围，读者可以展开查看。

[可折叠区域文档](https://expressive-code.com/plugins/collapsible-sections/)

```js collapse={1-5, 12-14, 21-24}
// All this boilerplate setup code will be collapsed
import { someBoilerplateEngine } from '@example/some-boilerplate'
import { evenMoreBoilerplate } from '@example/even-more-boilerplate'

const engine = someBoilerplateEngine(evenMoreBoilerplate())

// This part of the code will be visible by default
engine.doSomething(1, 2, 3, calcFn)

function calcFn() {
  // You can have multiple collapsed sections
  const a = 1
  const b = 2
  const c = a + b

  // This will remain visible
  console.log(`Calculation result: ${a} + ${b} = ${c}`)
  return c
}

// All this code until the end of the block will be collapsed again
engine.closeConnection()
engine.freeMemory()
engine.shutdown({ reason: 'End of example boilerplate code' })
```

## 行号

[行号文档](https://expressive-code.com/plugins/line-numbers/)

### 为单个代码块显示行号

`showLineNumbers` 显示行号，`showLineNumbers=false` 隐藏行号。

```js showLineNumbers
// This code block will show line numbers
console.log('Greetings from line 2!')
console.log('I am on line 3')
```

---

```js showLineNumbers=false
// Line numbers are disabled for this block
console.log('Hello?')
console.log('Sorry, do you know what line I am on?')
```

### 修改起始行号

使用 `startLineNumber=5` 将显示的起始行号设为 5。

```js showLineNumbers startLineNumber=5
console.log('Greetings from line 5!')
console.log('I am on line 6')
```
