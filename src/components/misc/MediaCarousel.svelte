<script lang="ts">
import { onDestroy, onMount } from "svelte";

type MediaItem = {
	type: "image" | "video";
	src: string;
};

interface Props {
	items: MediaItem[];
	interval?: number;
	transition?: number;
	pauseOnHover?: boolean;
	showIndicators?: boolean;
	showControls?: boolean;
	effect?: "fade" | "slide";
	randomOrder?: boolean;
	position?: string;
	videoSettings?: {
		muted?: boolean;
		loop?: boolean;
		objectFit?: "cover" | "contain" | "fill";
	};
	class?: string;
}

let {
	items,
	interval = 5000,
	transition: transitionDuration = 1000,
	pauseOnHover = false,
	showIndicators = true,
	showControls = false,
	effect = "fade",
	randomOrder = false,
	position = "center",
	videoSettings = {
		muted: true,
		loop: false,
		objectFit: "cover",
	},
	class: className = "",
}: Props = $props();

let currentIndex = $state(0);
let isPaused = $state(false);
let intervalId: NodeJS.Timeout | null = null;
let displayItems = $state<MediaItem[]>([]);
let videoElements: HTMLVideoElement[] = [];

// 初始化媒体项顺序
onMount(() => {
	if (randomOrder) {
		displayItems = [...items].sort(() => Math.random() - 0.5);
	} else {
		displayItems = [...items];
	}

	startCarousel();
});

onDestroy(() => {
	stopCarousel();
	// 清理所有视频
	videoElements.forEach((video) => {
		if (video) {
			video.pause();
			video.src = "";
		}
	});
});

function startCarousel() {
	if (displayItems.length <= 1) return;

	// 如果当前是视频且设置了循环播放，等待视频结束
	const currentItem = displayItems[currentIndex];
	if (currentItem?.type === "video" && !videoSettings.loop) {
		// 视频会在结束时触发 nextSlide
		return;
	}

	intervalId = setInterval(() => {
		if (!isPaused) {
			nextSlide();
		}
	}, interval);
}

function stopCarousel() {
	if (intervalId) {
		clearInterval(intervalId);
		intervalId = null;
	}
}

function nextSlide() {
	// 暂停当前视频
	const currentVideo = videoElements[currentIndex];
	if (currentVideo) {
		currentVideo.pause();
	}

	currentIndex = (currentIndex + 1) % displayItems.length;

	// 重启定时器
	stopCarousel();
	startCarousel();

	// 播放新的视频
	const nextItem = displayItems[currentIndex];
	if (nextItem?.type === "video") {
		const nextVideo = videoElements[currentIndex];
		if (nextVideo) {
			nextVideo.currentTime = 0;
			nextVideo.play().catch((e) => console.warn("Video play failed:", e));
		}
	}
}

function prevSlide() {
	const currentVideo = videoElements[currentIndex];
	if (currentVideo) {
		currentVideo.pause();
	}

	currentIndex = (currentIndex - 1 + displayItems.length) % displayItems.length;

	stopCarousel();
	startCarousel();

	const prevItem = displayItems[currentIndex];
	if (prevItem?.type === "video") {
		const prevVideo = videoElements[currentIndex];
		if (prevVideo) {
			prevVideo.currentTime = 0;
			prevVideo.play().catch((e) => console.warn("Video play failed:", e));
		}
	}
}

function goToSlide(index: number) {
	const currentVideo = videoElements[currentIndex];
	if (currentVideo) {
		currentVideo.pause();
	}

	currentIndex = index;

	stopCarousel();
	startCarousel();

	const item = displayItems[currentIndex];
	if (item?.type === "video") {
		const video = videoElements[currentIndex];
		if (video) {
			video.currentTime = 0;
			video.play().catch((e) => console.warn("Video play failed:", e));
		}
	}
}

function handleMouseEnter() {
	if (pauseOnHover) {
		isPaused = true;
	}
}

function handleMouseLeave() {
	if (pauseOnHover) {
		isPaused = false;
	}
}

function handleVideoEnded(index: number) {
	// 如果是当前视频且未设置循环，切换到下一个
	if (index === currentIndex && !videoSettings.loop) {
		nextSlide();
	}
}

function handleVideoLoaded(index: number) {
	// 视频加载完成后，如果是当前项则自动播放
	if (index === currentIndex) {
		const video = videoElements[index];
		if (video) {
			video.play().catch((e) => console.warn("Video autoplay failed:", e));
		}
	}
}
</script>

<div 
	class="media-carousel-container {className}" 
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
>
	{#each displayItems as item, index}
		<div 
			class="carousel-slide {effect}-effect"
			class:active={index === currentIndex}
			style="transition-duration: {transitionDuration}ms;"
		>
			{#if item.type === 'image'}
				<img 
					src={item.src} 
					alt="Background {index + 1}"
					class="carousel-media"
					style="object-position: {position}; object-fit: cover;"
				/>
			{:else if item.type === 'video'}
				<video
					bind:this={videoElements[index]}
					src={item.src}
					class="carousel-media"
					style="object-fit: {videoSettings.objectFit}; object-position: {position};"
					muted={videoSettings.muted ?? true}
					loop={videoSettings.loop ?? false}
					playsinline
					onended={() => handleVideoEnded(index)}
					onloadeddata={() => handleVideoLoaded(index)}
				>
					<track kind="captions" />
				</video>
			{/if}
		</div>
	{/each}
	
	{#if showControls && displayItems.length > 1}
		<button 
			class="carousel-control prev"
			onclick={prevSlide}
			aria-label="Previous slide"
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<polyline points="15 18 9 12 15 6"></polyline>
			</svg>
		</button>
		<button 
			class="carousel-control next"
			onclick={nextSlide}
			aria-label="Next slide"
		>
			<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<polyline points="9 18 15 12 9 6"></polyline>
			</svg>
		</button>
	{/if}
	
	{#if showIndicators && displayItems.length > 1}
		<div class="carousel-indicators">
			{#each displayItems as item, index}
				<button
					class="indicator"
					class:active={index === currentIndex}
					class:video-indicator={item.type === 'video'}
					onclick={() => goToSlide(index)}
					aria-label="Go to {item.type} {index + 1}"
					title={item.type === 'video' ? 'Video' : 'Image'}
				></button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.media-carousel-container {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
	}
	
	.carousel-slide {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
		transition-property: opacity, transform;
		transition-timing-function: ease-in-out;
		pointer-events: none;
	}
	
	.carousel-slide.active {
		opacity: 1;
		z-index: 1;
		pointer-events: auto;
	}
	
	.fade-effect {
		transform: scale(1);
	}
	
	.fade-effect.active {
		transform: scale(1);
	}
	
	.slide-effect {
		transform: translateX(100%);
	}
	
	.slide-effect.active {
		transform: translateX(0);
	}
	
	.carousel-media {
		width: 100%;
		height: 100%;
	}
	
	.carousel-control {
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		z-index: 10;
		background: rgba(0, 0, 0, 0.5);
		color: white;
		border: none;
		padding: 1rem;
		cursor: pointer;
		transition: background 0.3s;
		border-radius: 0.25rem;
	}
	
	.carousel-control:hover {
		background: rgba(0, 0, 0, 0.7);
	}
	
	.carousel-control.prev {
		left: 1rem;
	}
	
	.carousel-control.next {
		right: 1rem;
	}
	
	.carousel-indicators {
		position: absolute;
		bottom: 1rem;
		left: 50%;
		transform: translateX(-50%);
		z-index: 10;
		display: flex;
		gap: 0.5rem;
		padding: 0.5rem;
		background: rgba(0, 0, 0, 0.3);
		border-radius: 1rem;
	}
	
	.indicator {
		width: 0.75rem;
		height: 0.75rem;
		border-radius: 50%;
		border: 2px solid white;
		background: transparent;
		cursor: pointer;
		transition: all 0.3s;
		position: relative;
	}
	
	.indicator.video-indicator::after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 0;
		height: 0;
		border-style: solid;
		border-width: 3px 0 3px 5px;
		border-color: transparent transparent transparent white;
	}
	
	.indicator.active {
		background: white;
	}
	
	.indicator:hover {
		background: rgba(255, 255, 255, 0.5);
		transform: scale(1.2);
	}
</style>