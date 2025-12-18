---
title: 草稿示例
published: 2025-12-17
tags: [Markdown, 博客, 演示]
category: 文章示例
image: "./cover.webp"
draft: false
---

# 这篇文章是草稿

这篇文章目前处于草稿状态，尚未发布。因此，它不会对普通读者可见。内容仍在进行中，可能需要进一步编辑和审查。

当文章准备发布时，您可以在 Frontmatter 中将 "draft" 字段更新为 "false"：

```markdown
---
title: 草稿示例
published: 2024-01-11T04:40:26.381Z
tags: [Markdown, 博客, 演示]
category: 示例
draft: false
---
```


# 数学公式$\LaTeX$

$\LaTeX$

$$\LaTeX$$

$$
\int_a^b f(x),dx
$$


$$
\int_0^\infty x^2 dx
$$

$$
\begin{bmatrix}
1 & 2 & 3 \\
4 & 5 & 6 \\
7 & 8 & 9
\end{bmatrix}
$$

$$
\begin{bmatrix}
  1 & 2 & 3 \\
  4 & 5 & 6 \\
  7 & 8 & 9
\end{bmatrix}
\times
\begin{pmatrix}
  x \\ y \\ z
\end{pmatrix}
=
\begin{vmatrix}
  a & b \\
  c & d
\end{vmatrix}
$$

$$
f(x) = \begin{cases}
  x^2, & \text{if } x > 0 \\
  0, & \text{if } x = 0 \\
  -x, & \text{if } x < 0
\end{cases}
$$

# 测试 $$\int_0^\infty x^2 dx$$