# 背景壁纸新功能使用指南

本文档介绍如何使用背景壁纸的轮播和视频功能。

## 功能概述

backgroundWallpaper 现已支持以下三种模式：

1. **静态图片** - 单张背景图片
2. **图片轮播** - 多张图片自动轮播
3. **视频背景** - 使用视频作为背景

## 1. 图片轮播配置

### 基本配置

在 `src/config/siteConfig.ts` 中配置：

```typescript
backgroundWallpaper: {
  mode: "banner",
  switchable: true,
  
  // 配置多张图片（数组）
  src: {
    desktop: [
      "/assets/images/desktop/1.webp",
      "/assets/images/desktop/2.webp",
      "/assets/images/desktop/3.webp",
    ],
    mobile: [
      "/assets/images/mobile/1.webp",
      "/assets/images/mobile/2.webp",
      "/assets/images/mobile/3.webp",
    ],
  },
  
  // 启用轮播配置
  carousel: {
    enable: true,              // 启用轮播
    interval: 5000,            // 切换间隔（毫秒）
    transition: 1000,          // 过渡时间（毫秒）
    pauseOnHover: false,       // 鼠标悬停时暂停
    showIndicators: true,      // 显示指示器（小圆点）
    showControls: false,       // 显示控制按钮（上一张/下一张）
    effect: "fade",            // 效果："fade"（淡入淡出）或 "slide"（滑动）
    randomOrder: false,        // 是否随机顺序播放
  },
}
```

### 参数说明

- **enable**: 启用轮播功能（必须为 true）
- **interval**: 图片切换间隔时间，单位毫秒，默认 5000（5秒）
- **transition**: 过渡动画时间，单位毫秒，默认 1000（1秒）
- **pauseOnHover**: 鼠标悬停时暂停轮播，默认 false
- **showIndicators**: 显示底部指示器，默认 true
- **showControls**: 显示左右控制按钮，默认 false
- **effect**: 切换效果
  - `"fade"`: 淡入淡出效果
  - `"slide"`: 滑动效果
- **randomOrder**: 随机顺序播放图片，默认 false

## 2. 视频背景配置

### 基本配置

```typescript
backgroundWallpaper: {
  mode: "banner",
  switchable: true,
  
  // 视频背景会覆盖图片背景
  video: {
    enable: true,              // 启用视频背景
    src: {
      desktop: "/assets/images/desktop/background.mp4",
      mobile: "/assets/images/mobile/background.webm",  // 可选
    },
    poster: "/assets/images/desktop/1.webp",  // 视频封面图
    loop: true,                // 循环播放
    muted: true,               // 静音（建议保持 true）
    autoplay: true,            // 自动播放
    objectFit: "cover",        // 填充方式
    opacity: 1,                // 透明度 0-1
    playbackRate: 1,           // 播放速度
    controls: false,           // 显示控制条
  },
}
```

### 参数说明

- **enable**: 启用视频背景（必须为 true）
- **src**: 视频文件路径
  - 可以是字符串（桌面端和移动端使用同一视频）
  - 可以是对象（分别设置桌面端和移动端）
- **poster**: 视频封面图片，视频加载前显示
- **loop**: 是否循环播放，默认 true
- **muted**: 是否静音，默认 true（建议保持静音以确保自动播放）
- **autoplay**: 是否自动播放，默认 true
- **objectFit**: 视频填充方式
  - `"cover"`: 覆盖整个区域（可能裁剪）
  - `"contain"`: 完整显示（可能有黑边）
  - `"fill"`: 拉伸填充
- **opacity**: 视频透明度，0-1 之间，默认 1
- **playbackRate**: 播放速度，默认 1（正常速度）
- **controls**: 是否显示视频控制条，默认 false

### 视频格式建议

- **桌面端**: MP4 (H.264) 或 WebM
- **移动端**: WebM (VP9) 或 MP4
- **推荐尺寸**: 1920x1080 或更高
- **文件大小**: 建议小于 10MB 以确保快速加载

## 3. 使用示例

### 示例 1: 简单图片轮播

```typescript
backgroundWallpaper: {
  mode: "banner",
  src: {
    desktop: [
      "/assets/images/desktop/1.webp",
      "/assets/images/desktop/2.webp",
      "/assets/images/desktop/3.webp",
    ],
  },
  carousel: {
    enable: true,
    interval: 6000,
    effect: "fade",
  },
}
```

### 示例 2: 高级轮播配置

```typescript
backgroundWallpaper: {
  mode: "banner",
  src: {
    desktop: [
      "/assets/images/desktop/1.webp",
      "/assets/images/desktop/2.webp",
      "/assets/images/desktop/3.webp",
      "/assets/images/desktop/4.webp",
      "/assets/images/desktop/5.webp",
    ],
  },
  carousel: {
    enable: true,
    interval: 4000,
    transition: 1500,
    pauseOnHover: true,
    showIndicators: true,
    showControls: true,
    effect: "fade",
    randomOrder: true,
  },
}
```

### 示例 3: 视频背景

```typescript
backgroundWallpaper: {
  mode: "banner",
  video: {
    enable: true,
    src: "/assets/videos/background.mp4",
    poster: "/assets/images/poster.webp",
    loop: true,
    muted: true,
    autoplay: true,
    objectFit: "cover",
    opacity: 0.8,
  },
}
```

### 示例 4: 分设备配置

```typescript
backgroundWallpaper: {
  mode: "banner",
  src: {
    desktop: [
      "/assets/images/desktop/1.webp",
      "/assets/images/desktop/2.webp",
    ],
    mobile: "/assets/images/mobile/1.webp",  // 移动端使用单张图片
  },
  carousel: {
    enable: true,  // 只在桌面端生效（因为移动端是单张图片）
    interval: 5000,
  },
}
```

## 4. 注意事项

1. **性能考虑**
   - 轮播图片数量建议不超过 10 张
   - 视频文件大小建议控制在 10MB 以内
   - 移动端可以使用较小的图片/视频

2. **优先级**
   - 视频背景 > 图片轮播 > 静态图片
   - 如果同时启用视频和轮播，视频会覆盖轮播

3. **浏览器兼容性**
   - 轮播功能支持所有现代浏览器
   - 视频自动播放需要静音（muted: true）

4. **文件路径**
   - 所有路径都相对于 `public` 目录
   - 例如：`/assets/images/desktop/1.webp` 对应文件 `public/assets/images/desktop/1.webp`

## 5. 故障排查

### 轮播不工作
- 检查 `carousel.enable` 是否为 `true`
- 确保 `src` 是数组且包含多个图片
- 检查图片路径是否正确

### 视频不自动播放
- 确保 `muted` 设置为 `true`
- 检查视频格式是否支持
- 查看浏览器控制台是否有错误

### 性能问题
- 减少轮播图片数量
- 压缩视频文件大小
- 降低视频分辨率
- 使用更高效的视频编码格式（WebM VP9）

## 6. 最佳实践

1. **图片优化**
   - 使用 WebP 格式
   - 桌面端: 1920x1080
   - 移动端: 800x600

2. **视频优化**
   - 使用 H.264 或 VP9 编码
   - 比特率: 2-4 Mbps
   - 帧率: 24-30 fps

3. **用户体验**
   - 轮播间隔不要太快（建议 ≥ 4 秒）
   - 过渡时间适中（建议 1-1.5 秒）
   - 移动端考虑使用静态图片以节省流量