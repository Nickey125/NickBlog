---
title: 计算概论A-期中备考
published: 2026-11-06
description: 计算概论 A 期中复习笔记，涵盖 C++ 输入、字符串、排序与结构体，附成绩排名示例和自测题。
category: 学习笔记
tags: [计算概论A, C++, 期中备考, 排序, 结构体]
draft: false
lang: zh_CN
---

几个可能比较有用的东西
1.sort函数（稳定排序？） 2.结构体 3.

---
## 整数存储
:::caution[Long Long]

:::

## 输入

:::caution[cin与getline混搭注意]
应该清除cin后的换行符
:::

```cpp

int n;
cin >> n;
cin.ignore();

```


## 字符串处理的小巧思
通过对`string`类的变量的某位`a[k] - 'A' + 'a'`可以转化为小写字母

## 期中备考补充：排序与结构体

:::important[这两部分要学到什么程度？]
- **排序**：会确定排序范围、写升序和降序比较器，能判断题目是否需要稳定排序。
- **结构体**：会把一条记录的多个属性放在一起，完成定义、初始化、读写和数组存储。
- **综合运用**：能写出“按成绩降序，同分按学号升序”的排名程序。

下面的示例使用 C++11 及以上语法，围绕普通数组和普通函数展开。
:::

## 一、`sort` 与稳定排序

### 1. 先记住最常用的写法

排序函数位于头文件 `<algorithm>` 中。使用 `using namespace std;` 后，可以省略函数名前的 `std::`。

```cpp
#include <algorithm>
#include <iostream>
using namespace std;

int main()
{
    int a[] = {5, 2, 8, 2, 1};
    int n = 5;

    sort(a, a + n);

    for (int i = 0; i < n; ++i)
        cout << a[i] << (i + 1 == n ? '\n' : ' ');
    return 0;
}
```

输出：

```text
1 2 2 5 8
```

:::note[`sort` 做了什么？]
直接重新排列原数组中的元素，默认从小到大排序。**不会去重**，也不会自动保留一份原数组。

本文使用的普通 `std::sort` 返回 `void`，不能写成 `a = sort(a, a + n);`。
:::

### 2. 范围是左闭右开：`[first, last)`

**包含起点，不包含终点。** 对普通数组，`a + k` 表示下标 `k` 对应的位置；不是把数组中的每个数都加上 `k`。

| 想排序的元素 | 调用方式 | 元素个数 |
| --- | --- | --- |
| `a[0]` 到 `a[n-1]` | `sort(a, a + n);` | `n` |
| `a[1]` 到 `a[n]` | `sort(a + 1, a + n + 1);` | `n` |
| `a[l]` 到 `a[r-1]` | `sort(a + l, a + r);` | `r-l` |
| `a[l]` 到 `a[r]` | `sort(a + l, a + r + 1);` | `r-l+1` |

前提是这些位置组成有效范围，待排序的元素已经初始化，数组容量也足够。

```cpp
int a[] = {9, 5, 2, 8, 1, 7};
sort(a + 1, a + 5);
// 只排下标 1、2、3、4，结果为：9 1 2 5 8 7
```

:::warning[数组容量不等于有效数据个数]
`int a[100];` 只读入了前 `n` 个数，就应该排 `[a, a+n)`。不要把未初始化的其余元素一起排序，也不要把终点误写为 `a+n-1`，漏掉最后一个有效元素。
:::

### 3. 比较器：谁应该排在前面？

把 `cmp(a, b)` 读作：**按照题目规则，`a` 是否应该严格排在 `b` 前面？**

```cpp
bool descending(int a, int b)
{
    return a > b; // 大的排前面，因此是降序
}

// 在 main 中调用
sort(a, a + n, descending);
```

| 排序目标 | 比较器的返回表达式 |
| --- | --- |
| 数值升序 | `a < b` |
| 数值降序 | `a > b` |
| 字符串按长度升序 | `a.size() < b.size()` |

传入普通比较函数时写**函数名**，即 `descending`，而不是不带实参地调用 `descending()`。

:::caution[不要用 `<=`、`>=` 或直接返回差值]
- 升序写 `a < b`，不能写 `a <= b`。元素相等时，比较器必须返回 `false`，包括 `cmp(a, a)`。
- 不要写 `return a - b;`。这里需要的是“是否排在前面”，不是正负差值；非零整数转为 `bool` 都是真。
- 规则必须前后一致，不能出现“A 在 B 前、B 在 C 前、C 又在 A 前”的循环。

这些要求属于**严格弱序**。违反要求后，排序结果没有保证，可能出现未定义行为。
:::

注意：`cmp(a, b)` 为 `false`，也可能表示两者在规则下并列，不能直接解释成“`a` 一定排在 `b` 后面”；比较器也不是“返回真就交换”。

### 4. “稳定”到底指什么？

**稳定排序会保留比较规则下等价元素在本次排序前的相对顺序。**

例如，只按成绩从高到低排，不比较姓名：

| 记录 | 排序前的位置 | 成绩 |
| --- | --- | --- |
| Alice | 1 | 90 |
| Bob | 2 | 85 |
| Carol | 3 | 90 |
| David | 4 | 85 |

稳定排序后一定是：

```text
Alice 90 → Carol 90 → Bob 85 → David 85
```

Alice 仍在 Carol 前面，Bob 仍在 David 前面。这里“等价”指成绩相同，**不要求姓名等其他成员也相同**。

| 对比 | `sort` | `stable_sort` |
| --- | --- | --- |
| 能否按自定义规则排序 | 能 | 能 |
| 是否修改原序列 | 是 | 是 |
| 是否保证等价元素的原相对顺序 | 不保证 | 保证 |
| 常见比较次数复杂度 | $O(n\log n)$ | 额外内存充足时为 $O(n\log n)$；否则可到 $O(n\log^2 n)$ |

:::tip[看到什么题意，选什么写法？]
- “同分保持输入顺序”：若数组仍按输入顺序存放，使用 `stable_sort`，比较器只比较成绩。
- “同分按学号升序”：在比较器里明确比较学号，通常用 `sort` 就够了。
- “把整数从小到大排”：通常直接用 `sort`。

`sort` 是**不保证稳定**，不代表它每次都会打乱等价元素。`stable_sort` 保留的是排序前的顺序；如果此前已经重排过数据，它不会自动找回最初输入顺序。
:::

## 二、结构体 `struct`

### 1. 为什么要用结构体？

一名学生有学号、姓名、成绩。若分别用三个数组保存，排序成绩时很容易把成绩与姓名、学号错配。结构体可以把它们组成一条完整记录。

```cpp
#include <string>
using namespace std;

struct Student
{
    int id;
    string name;
    int score;
}; // 注意：结构体定义结束后有分号
```

:::note[类型与对象要分清]
`Student` 是新定义的**类型**，类似 `int`；`Student s;` 中的 `s` 才是这个类型的**对象（变量）**。

`struct` 中的成员默认可从外部访问；C++ 中定义好类型后，可以直接写 `Student s;`，不必每次加 `struct`。
:::

### 2. 定义、初始化和访问成员

```cpp
Student s = {103, "Alice", 90};

cout << s.id << ' ' << s.name << ' ' << s.score << '\n';
s.score = 95;
```

- 大括号中的初始值，按本例结构体成员的**声明顺序**对应：学号、姓名、成绩。
- 通过 `对象名.成员名` 访问成员，如 `s.score`。
- 给成员赋值和读取成员，与操作普通变量类似。

```cpp
Student t{}; // 本例中：id、score 为 0，name 为空字符串
cin >> t.id >> t.name >> t.score;
```

:::warning[两个容易忽略的小问题]
- 本例若在函数内只写 `Student t;`，`name` 会正常构造为空字符串，但两个 `int` 成员不会自动初始化为 0。读取它们之前必须赋值；可先写 `Student t{};`。
- `cin >> t.name` 读取到空白处就停止。本笔记假设姓名不包含空格；如果题目允许空格，需要改用合适的整行读取方式。
:::

### 3. 结构体数组：每个元素都是一整条记录

```cpp
Student students[4] = {
    {103, "Alice", 90},
    {101, "Bob",   85},
    {102, "Carol", 90},
    {104, "David", 85}
};

cout << students[2].name; // Carol，下标从 0 开始
students[1].score = 88;   // 修改 Bob 的成绩
```

| 表达式 | 含义 |
| --- | --- |
| `Student` | 一种类型 |
| `students` | 存放多名学生的数组 |
| `students[i]` | 第 `i` 个学生对象 |
| `students[i].score` | 第 `i` 个学生的成绩 |

**排序结构体数组时，移动的是整个对象。** 学号、姓名、成绩会一起移动，仍对应同一名学生。

### 4. 结构体可以赋值，也可以作为函数参数

```cpp
Student a = {103, "Alice", 90};
Student b = a; // 本例的各成员被复制
b.score = 100; // a.score 仍是 90
```

下面两种形参写法要分清：

| 形参写法 | 本节需要理解的含义 |
| --- | --- |
| `Student s` | 值传递，复制一份对象；修改这份副本不影响调用者的对象 |
| `const Student& s` | 只读引用，避免复制整个对象，也不允许通过它修改成员 |

:::tip[和函数笔记联系起来]
比较器通常只需要读取两名学生的信息，因此常用 `const Student&`。排序算法本身仍会重排数组元素。

可以结合 《函数笔记》 中的“形参与值传递”理解；当前先会识别这个写法即可。
:::

## 三、把两部分连起来：学生成绩排名

### 1. 先把题意翻译成比较器

题目要求：**成绩从高到低；成绩相同时，学号从小到大。**

```cpp
bool cmp(const Student& a, const Student& b)
{
    if (a.score != b.score)
        return a.score > b.score; // 主关键字：成绩降序
    return a.id < b.id;           // 次关键字：学号升序
}
```

**先判断主关键字是否不同；只有相同时，才比较次关键字。** 如果两者的成绩和学号都相同，最后一行自然返回 `false`。

:::warning[不要把多条件比较直接连成“或”]
`return a.score > b.score || a.id < b.id;` 是错误写法。

例如 A 为 90 分、学号 103，B 为 85 分、学号 101。正向比较因成绩返回真，反向比较又因学号返回真，出现相互矛盾。
:::

### 2. 完整可运行程序

约定 `0 <= n <= 100`，姓名不含空格。输入第一行是人数，接下来每行依次给出学号、姓名和成绩。

```cpp
#include <algorithm>
#include <iostream>
#include <string>
using namespace std;

struct Student
{
    int id;
    string name;
    int score;
};

bool cmp(const Student& a, const Student& b)
{
    if (a.score != b.score)
        return a.score > b.score;
    return a.id < b.id;
}

int main()
{
    int n;
    if (!(cin >> n) || n < 0 || n > 100)
        return 0;

    Student students[100];
    for (int i = 0; i < n; ++i)
        cin >> students[i].id >> students[i].name >> students[i].score;

    sort(students, students + n, cmp);

    for (int i = 0; i < n; ++i)
        cout << students[i].id << ' '
             << students[i].name << ' '
             << students[i].score << '\n';
    return 0;
}
```


输入：

```text
4
103 Alice 90
101 Bob 85
102 Carol 90
104 David 85
```

输出：

```text
102 Carol 90
103 Alice 90
101 Bob 85
104 David 85
```

### 3. 如果题目改成“同分保持输入顺序”

比较器改为只比较成绩，并在读入后使用 `stable_sort`，替换上面的排序调用：

```cpp
bool scoreOnly(const Student& a, const Student& b)
{
    return a.score > b.score;
}

// main 中：此时 students 仍按输入顺序存放
stable_sort(students, students + n, scoreOnly);
```

这里 `scoreOnly` 的定义应放在 `main` 之前。对上面同一份输入，输出变为：

```text
103 Alice 90
102 Carol 90
101 Bob 85
104 David 85
```

:::important[稳定排序不会替你决定次关键字]
“同分保持输入顺序”和“同分按学号升序”是两种要求。

若仍保留比较学号的 `cmp`，即使换成 `stable_sort`，90 分组仍是 Carol 在 Alice 前面，因为比较器已经按学号区分了她们。
:::

## 四、合上笔记后自测

### 自测 1：范围

```cpp
int a[] = {8, 4, 7, 1, 9};
sort(a + 1, a + 4);
```

执行后数组是什么？

<details>
<summary>展开答案</summary>

`8 1 4 7 9`。排序的下标是 1、2、3，下标 0 和 4 不动。

</details>

### 自测 2：稳定性

有三条记录 `A(90)`、`B(90)`、`C(80)`，按成绩降序，比较器只比较成绩。`sort` 和 `stable_sort` 对 A、B 的顺序分别有什么保证？

<details>
<summary>展开答案</summary>

`stable_sort` 保证 A 在 B 前面；`sort` 不保证两者的先后，不能断定它一定会反转，也不能断定一定不变。二者都应把这两条 90 分记录排在 C 前面。

</details>

### 自测 3：结构体与多条件比较

请独立写出 `Student`，包含 `id`、`name`、`score`；再写一个比较器，要求“成绩升序，同分学号降序”。

<details>
<summary>展开参考比较器</summary>

```cpp
bool cmp(const Student& a, const Student& b)
{
    if (a.score != b.score)
        return a.score < b.score;
    return a.id > b.id;
}
```

升降序由各个关键字分别决定，不能把成绩和学号一概写成同一个方向。

</details>

### 掌握情况清单

- [ ] 能不看笔记写出 `sort(a, a+n)`，并解释为什么终点不是 `a+n-1`。
- [ ] 能写升序、降序比较器，知道相等时必须返回 `false`。
- [ ] 能解释稳定排序中的“等价”，并根据题意选择 `sort` 或 `stable_sort`。
- [ ] 能定义结构体、初始化对象，用 `.` 访问成员，并存入数组。
- [ ] 能独立完成上面的排名程序，并将同分规则改成“保持输入顺序”。

---

## 延伸复习与资料

- 排序的更多用法：《sort 与 stable_sort 专项笔记》，包括 `vector`、字符串、Lambda 和多次稳定排序。
- 函数相关概念：《函数笔记》。
- [`sort` 的接口、范围和复杂度（C++ 标准草案）](https://eel.is/c++draft/sort)。
- [`stable_sort` 的稳定性与复杂度（C++ 标准草案）](https://eel.is/c++draft/stable.sort)。
- [比较器与严格弱序（C++ 标准草案）](https://eel.is/c++draft/alg.sorting.general)。
- [`struct` 的定义和成员访问（Microsoft Learn）](https://learn.microsoft.com/en-us/cpp/cpp/struct-cpp?view=msvc-170)。
