<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import ImageWrapper from './ImageWrapper.astro';
	
	interface Props {
		images: string[];
		interval?: number;
		transition?: number;
		pauseOnHover?: boolean;
		showIndicators?: boolean;
		showControls?: boolean;
		effect?: 'fade' | 'slide';
		randomOrder?: boolean;
		position?: string;
		class?: string;
	}
	
	let {
		images,
		interval = 5000,
		transition: transitionDuration = 1000,
		pauseOnHover = false,
		showIndicators = true,
		showControls = false,
		effect = 'fade',
		randomOrder = false,
		position = 'center',
		class: className = ''
	}: Props = $props();
	
	let currentIndex = $state(0);
	let isPaused = $state(false);
	let intervalId: NodeJS.Timeout | null = null;
	let displayImages = $state<string[]>([]);
	
	// 初始化图片顺序
	onMount(() => {
		if (randomOrder) {
			displayImages = [...images].sort(() => Math.random() - 0.5);
		} else {
			displayImages = [...images];
		}
		
		startCarousel();
	});
	
	onDestroy(() => {
		stopCarousel();
	});
	
	function startCarousel() {
		if (displayImages.length <= 1) return;
		
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
		currentIndex = (currentIndex + 1) % displayImages.length;
	}
	
	function prevSlide() {
		currentIndex = (currentIndex - 1 + displayImages.length) % displayImages.length;
	}
	
	function goToSlide(index: number) {
		currentIndex = index;
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
</script>

<div 
	class="carousel-container {className}" 
	onmouseenter={handleMouseEnter}
	onmouseleave={handleMouseLeave}
>
	{#each displayImages as image, index}
		<div 
			class="carousel-slide {effect}-effect"
			class:active={index === currentIndex}
			style="transition-duration: {transitionDuration}ms; object-position: {position};"
		>
			<img 
				src={image} 
				alt="Background {index + 1}"
				class="carousel-image"
				style="object-position: {position};"
			/>
		</div>
	{/each}
	
	{#if showControls && displayImages.length > 1}
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
	
	{#if showIndicators && displayImages.length > 1}
		<div class="carousel-indicators">
			{#each displayImages as _, index}
				<button
					class="indicator"
					class:active={index === currentIndex}
					onclick={() => goToSlide(index)}
					aria-label="Go to slide {index + 1}"
				></button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.carousel-container {
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
	}
	
	.carousel-slide.active {
		opacity: 1;
		z-index: 1;
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
	
	.carousel-image {
		width: 100%;
		height: 100%;
		object-fit: cover;
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
	}
	
	.indicator {
		width: 0.75rem;
		height: 0.75rem;
		border-radius: 50%;
		border: 2px solid white;
		background: transparent;
		cursor: pointer;
		transition: background 0.3s;
	}
	
	.indicator.active {
		background: white;
	}
	
	.indicator:hover {
		background: rgba(255, 255, 255, 0.5);
	}
</style>