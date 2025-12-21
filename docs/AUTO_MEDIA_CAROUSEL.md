# 自动媒体轮播功能使用指南

## 功能简介

自动媒体轮播功能会自动读取指定文件夹中的所有图片和视频文件，并进行混合轮播展示。这是最简单、最方便的背景配置方式。

## 快速开始

### 1. 准备媒体文件

将你的图片和视频文件放入以下文件夹：

- 桌面端媒体：`public/assets/images/desktop/`
- 移动端媒体：`public/assets/images/mobile/`

支持的格式：
- 图片：`.webp`, `.jpg`, `.jpeg`, `.png`, `.gif`
- 视频：`.mp4`, `.webm`

### 2. 启用自动媒体轮播

在 `src/config/siteConfig.ts` 中配置：

```typescript
backgroundWallpaper: {
  mode: "banner",
  switchable: true,
  
  src: {
    desktop: "/assets/images/desktop/1.webp", // 备用图片
    mobile: "/assets/images/mobile/1.webp",
  },
  
  autoMediaCarousel: {
    enable: true, // 启用自动媒体轮播
    folders: {
      desktop: "/assets/images/desktop/", // 桌面端文件夹
      mobile: "/assets/images/mobile/",   // 移动端文件夹
    },
    interval: 5000,      // 5秒切换一次
    randomOrder: true,   // 随机播放
    effect: "fade",      // 淡入淡出效果
  },
}
```

### 3. 完成！

重启开发服务器，页面会自动读取文件夹中的所有媒体文件并进行轮播。

## 详细配置

### 基本配置

```typescript
autoMediaCarousel: {
  enable: true,  // 启用功能
  
  folders: {
    desktop: "/assets/images/desktop/",
    mobile: "/assets/images/mobile/",
  },
}
```

### 完整配置选项

```typescript
autoMediaCarousel: {
  enable: true,
  
  // 文件夹路径
  folders: {
    desktop: "/assets/images/desktop/",
    mobile: "/assets/images/mobile/",
  },
  
  // 支持的文件扩展名（可选）
  imageExtensions: ['.webp', '.jpg', '.jpeg', '.png', '.gif'],
  videoExtensions: ['.mp4', '.webm'],
  
  // 轮播设置
  interval: 5000,         // 切换间隔（毫秒）
  transition: 1000,       // 过渡时间（毫秒）
  pauseOnHover: false,    // 鼠标悬停时暂停
  showIndicators: true,   // 显示指示器
  showControls: false,    // 显示控制按钮
  effect: "fade",         // "fade" 或 "slide"
  randomOrder: true,      // 随机顺序播放
  
  // 视频设置
  videoSettings: {
    muted: true,          // 静音
    loop: false,          // 单个视频是否循环
    objectFit: "cover",   // 填充方式
  },
}
```

## 参数说明

### 文件夹配置

- **folders.desktop**: 桌面端媒体文件夹路径（相对于 `public` 目录）
- **folders.mobile**: 移动端媒体文件夹路径（可选，不设置则使用桌面端文件夹）

### 文件扩展名

- **imageExtensions**: 支持的图片格式数组
- **videoExtensions**: 支持的视频格式数组

### 轮播设置

- **interval**: 切换间隔时间（毫秒），默认 5000
- **transition**: 过渡动画时间（毫秒），默认 1000
- **pauseOnHover**: 鼠标悬停时是否暂停，默认 false
- **showIndicators**: 是否显示底部指示器，默认 true
- **showControls**: 是否显示左右控制按钮，默认 false
- **effect**: 切换效果
  - `"fade"`: 淡入淡出（推荐）
  - `"slide"`: 滑动效果
- **randomOrder**: 是否随机顺序播放，默认 false

### 视频设置

- **videoSettings.muted**: 视频是否静音，默认 true（必须为 true 才能自动播放）
- **videoSettings.loop**: 单个视频是否循环播放
  - `true`: 视频会一直循环播放
  - `false`: 视频播放完后自动切换到下一个媒体项
- **videoSettings.objectFit**: 视频填充方式
  - `"cover"`: 覆盖整个区域（推荐）
  - `"contain"`: 完整显示视频
  - `"fill"`: 拉伸填充

## 使用示例

### 示例 1: 仅图片轮播

```typescript
autoMediaCarousel: {
  enable: true,
  folders: {
    desktop: "/assets/images/desktop/",
  },
  interval: 6000,
  effect: "fade",
  randomOrder: true,
}
```

### 示例 2: 图片和视频混合

```typescript
autoMediaCarousel: {
  enable: true,
  folders: {
    desktop: "/assets/images/desktop/",  // 包含 .webp 和 .mp4 文件
  },
  interval: 5000,
  randomOrder: true,
  videoSettings: {
    muted: true,
    loop: false,  // 视频播放完自动切换
  },
}
```

### 示例 3: 分设备配置

```typescript
autoMediaCarousel: {
  enable: true,
  folders: {
    desktop: "/assets/images/desktop/",  // 高分辨率文件
    mobile: "/assets/images/mobile/",    // 低分辨率文件（节省流量）
  },
  interval: 5000,
  randomOrder: true,
}
```

### 示例 4: 高级配置

```typescript
autoMediaCarousel: {
  enable: true,
  folders: {
    desktop: "/assets/images/desktop/",
  },
  imageExtensions: ['.webp', '.jpg'],  // 只加载 webp 和 jpg
  videoExtensions: ['.mp4'],           // 只加载 mp4
  interval: 4000,
  transition: 1500,
  pauseOnHover: true,
  showIndicators: true,
  showControls: true,
  effect: "fade",
  randomOrder: true,
  videoSettings: {
    muted: true,
    loop: false,
    objectFit: "cover",
  },
}
```

## 工作原理

1. **构建时扫描**：在 Astro 构建时，系统会扫描指定文件夹
2. **自动识别**：根据文件扩展名自动识别图片和视频
3. **混合轮播**：将所有媒体文件混合在一起进行轮播
4. **智能切换**：
   - 图片：按设定的间隔自动切换
   - 视频：如果 `loop: false`，视频播放完后自动切换到下一个

## 优势

### vs 手动配置

- ✅ 无需手动列出每个文件
- ✅ 添加新文件无需修改配置
- ✅ 自动识别文件类型
- ✅ 支持图片视频混合

### vs 单视频背景

- ✅ 支持多个视频轮播
- ✅ 可以混合图片和视频
- ✅ 更灵活的展示方式

## 文件组织建议

### 推荐的文件结构

```
public/
└── assets/
    └── images/
        ├── desktop/
        │   ├── 01.webp
        │   ├── 02.webp
        │   ├── 03.mp4
        │   ├── 04.webp
        │   └── 05.webm
        └── mobile/
            ├── 01.webp
            ├── 02.webp
            └── 03.webp
```

### 命名建议

- 使用数字前缀便于排序：`01.webp`, `02.webp`, `03.mp4`
- 使用描述性名称：`sunset.webp`, `ocean-waves.mp4`
- 保持一致的命名风格

## 性能优化

### 图片优化

1. **格式选择**
   - 首选 WebP 格式（体积小，质量高）
   - 备选 JPEG（兼容性好）

2. **分辨率建议**
   - 桌面端：1920x1080 或 2560x1440
   - 移动端：800x600 或 1080x720

3. **文件大小**
   - 单张图片：< 500KB
   - 总大小：< 10MB（所有图片加起来）

### 视频优化

1. **编码格式**
   - 首选：H.264 (MP4) 或 VP9 (WebM)
   - 比特率：2-4 Mbps

2. **分辨率**
   - 桌面端：1920x1080
   - 移动端：1280x720

3. **文件大小**
   - 单个视频：< 5MB
   - 视频时长：10-30 秒

4. **优化建议**
   - 使用工具压缩视频（如 FFmpeg）
   - 移除音频轨道（反正会静音）
   - 降低帧率到 24-30 fps

### 数量建议

- 图片：5-15 张
- 视频：2-5 个
- 总文件数：< 20 个

## 故障排查

### 轮播不工作

1. 检查 `enable` 是否为 `true`
2. 确认文件夹路径正确
3. 检查文件夹中是否有支持的文件
4. 查看浏览器控制台是否有错误

### 视频不播放

1. 确保 `muted: true`（浏览器限制）
2. 检查视频格式是否支持
3. 确认视频文件没有损坏
4. 查看控制台错误信息

### 没有找到文件

1. 确认文件夹路径以 `/` 开头和结尾
2. 检查文件是否在 `public` 目录下
3. 确认文件扩展名在支持列表中
4. 重启开发服务器

### 性能问题

1. 减少文件数量
2. 压缩图片和视频
3. 降低轮播频率（增大 interval）
4. 移动端使用较小的文件

## 与其他功能的关系

### 优先级

1. **自动媒体轮播** (autoMediaCarousel) - 最高优先级
2. 单视频背景 (video)
3. 手动轮播 (carousel)
4. 静态图片 (src)

### 组合使用

- ❌ 不能同时启用自动媒体轮播和手动轮播
- ❌ 不能同时启用自动媒体轮播和单视频背景
- ✅ 可以设置静态图片作为备用

## 最佳实践

1. **优先使用自动媒体轮播**
   - 最简单、最灵活的方式
   - 适合有多个媒体文件的场景

2. **合理设置间隔时间**
   - 图片：4-6 秒
   - 视频：让视频播放完（loop: false）

3. **启用随机播放**
   - 每次访问都有新鲜感
   - 避免审美疲劳

4. **移动端优化**
   - 使用较小的文件
   - 可以只用图片，不用视频

5. **测试不同设备**
   - 桌面端
   - 平板
   - 手机

## 示例项目结构

```
FireFly/
├── public/
│   └── assets/
│       └── images/
│           ├── desktop/
│           │   ├── 01-mountain.webp    (500KB)
│           │   ├── 02-ocean.webp       (450KB)
│           │   ├── 03-city.mp4         (3MB, 15s)
│           │   ├── 04-forest.webp      (480KB)
│           │   └── 05-sky.webm         (2.5MB, 12s)
│           └── mobile/
│               ├── 01-mountain.webp    (200KB)
│               ├── 02-ocean.webp       (180KB)
│               ├── 03-city.webp        (220KB)
│               └── 04-forest.webp      (190KB)
└── src/
    └── config/
        └── siteConfig.ts
```

配置：

```typescript
autoMediaCarousel: {
  enable: true,
  folders: {
    desktop: "/assets/images/desktop/",
    mobile: "/assets/images/mobile/",
  },
  interval: 5000,
  randomOrder: true,
  effect: "fade",
  videoSettings: {
    muted: true,
    loop: false,
  },
}
```

这样就能实现一个包含 5 个桌面端媒体（3 张图片 + 2 个视频）和 4 张移动端图片的自动轮播背景！