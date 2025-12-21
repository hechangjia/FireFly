<script lang="ts">
	import { onMount } from 'svelte';
	
	interface Props {
		src: string;
		poster?: string;
		loop?: boolean;
		muted?: boolean;
		autoplay?: boolean;
		objectFit?: 'cover' | 'contain' | 'fill';
		opacity?: number;
		playbackRate?: number;
		controls?: boolean;
		class?: string;
	}
	
	let {
		src,
		poster,
		loop = true,
		muted = true,
		autoplay = true,
		objectFit = 'cover',
		opacity = 1,
		playbackRate = 1,
		controls = false,
		class: className = ''
	}: Props = $props();
	
	let videoElement: HTMLVideoElement;
	let isPlaying = $state(false);
	
	onMount(() => {
		if (videoElement && playbackRate !== 1) {
			videoElement.playbackRate = playbackRate;
		}
		
		// 尝试自动播放
		if (autoplay) {
			const playPromise = videoElement?.play();
			if (playPromise !== undefined) {
				playPromise
					.then(() => {
						isPlaying = true;
					})
					.catch((error) => {
						console.warn('Video autoplay failed:', error);
						isPlaying = false;
					});
			}
		}
	});
	
	function handlePlay() {
		isPlaying = true;
	}
	
	function handlePause() {
		isPlaying = false;
	}
</script>

<div class="video-background-container {className}" style="opacity: {opacity};">
	<video
		bind:this={videoElement}
		{src}
		{poster}
		{loop}
		{muted}
		{controls}
		playsinline
		class="video-background"
		style="object-fit: {objectFit};"
		onplay={handlePlay}
		onpause={handlePause}
	>
		<track kind="captions" />
		Your browser does not support the video tag.
	</video>
</div>

<style>
	.video-background-container {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		z-index: 0;
	}
	
	.video-background {
		width: 100%;
		height: 100%;
		object-position: center;
	}
</style>