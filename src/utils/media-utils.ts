import fs from "node:fs";
import path from "node:path";
import { siteConfig } from "../config";

export type MediaItem = {
	type: "image" | "video";
	src: string;
};

/**
 * 扫描指定文件夹获取所有媒体文件
 * @param folderPath 相对于 public 目录的文件夹路径，如 "/assets/images/desktop/"
 * @param imageExtensions 支持的图片扩展名
 * @param videoExtensions 支持的视频扩展名
 * @returns 媒体文件列表
 */
export function scanMediaFolder(
	folderPath: string,
	imageExtensions: string[] = [".webp", ".jpg", ".jpeg", ".png", ".gif"],
	videoExtensions: string[] = [".mp4", ".webm", ".mov", ".avi"],
): MediaItem[] {
	try {
		// 移除开头的斜杠并构建完整路径
		const cleanPath = folderPath.replace(/^\//, "");
		const fullPath = path.join(process.cwd(), "public", cleanPath);

		// 检查文件夹是否存在
		if (!fs.existsSync(fullPath)) {
			console.warn(`Media folder not found: ${fullPath}`);
			return [];
		}

		// 读取文件夹内容
		const files = fs.readdirSync(fullPath);

		// 过滤并分类文件
		const mediaItems = files
			.map((file) => {
				const ext = path.extname(file).toLowerCase();
				const src = path.join(folderPath, file).replace(/\\/g, "/");

				if (imageExtensions.includes(ext)) {
					return { type: "image" as const, src };
				}
				if (videoExtensions.includes(ext)) {
					return { type: "video" as const, src };
				}
				return null;
			})
			.filter((item): item is MediaItem => item !== null);

		return mediaItems;
	} catch (error) {
		console.error(`Error scanning media folder ${folderPath}:`, error);
		return [];
	}
}

/**
 * 获取自动媒体轮播的文件列表
 */
export function getAutoMediaCarouselItems(): {
	desktop: MediaItem[];
	mobile: MediaItem[];
} {
	const autoConfig = siteConfig.backgroundWallpaper.autoMediaCarousel;

	if (!autoConfig?.enable) {
		return { desktop: [], mobile: [] };
	}

	const imageExtensions = autoConfig.imageExtensions || [
		".webp",
		".jpg",
		".jpeg",
		".png",
		".gif",
	];
	const videoExtensions = autoConfig.videoExtensions || [".mp4", ".webm"];

	const desktop = autoConfig.folders.desktop
		? scanMediaFolder(
				autoConfig.folders.desktop,
				imageExtensions,
				videoExtensions,
			)
		: [];

	const mobile = autoConfig.folders.mobile
		? scanMediaFolder(
				autoConfig.folders.mobile,
				imageExtensions,
				videoExtensions,
			)
		: [];

	// 如果移动端文件夹为空，使用桌面端文件
	if (mobile.length === 0 && desktop.length > 0) {
		return { desktop, mobile: desktop };
	}

	return { desktop, mobile };
}

/**
 * 检查是否启用自动媒体轮播
 */
export function isAutoMediaCarouselEnabled(): boolean {
	const autoConfig = siteConfig.backgroundWallpaper.autoMediaCarousel;
	if (!autoConfig?.enable) return false;

	const items = getAutoMediaCarouselItems();
	return items.desktop.length > 0 || items.mobile.length > 0;
}
