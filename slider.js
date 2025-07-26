document.addEventListener('DOMContentLoaded', () => {
    const progressSlider = document.querySelector('.progress-slider');
    const currentTimeSpan = document.querySelector('.current-time');
    const playPauseButton = document.querySelector('.play-pause');
    const playPauseIcon = playPauseButton.querySelector('i');
    const rewindButton = document.querySelector('.rewind-10');
    const forwardButton = document.querySelector('.forward-10');
    const totalTimeSpan = document.querySelector('.total-time'); // For dynamic updates if needed

    let isPlaying = false;
    let currentPlaybackTime = 15 * 60 + 22; // Initial time in seconds (15:22)
    const totalPlaybackTime = 54 * 60 + 54; // Total time in seconds (54:54)

    // Function to format time from seconds to MM:SS
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    // Update the slider and current time display
    function updatePlayerDisplay() {
        const progressPercentage = (currentPlaybackTime / totalPlaybackTime) * 100;
        progressSlider.value = progressPercentage;
        currentTimeSpan.textContent = formatTime(currentPlaybackTime);

        // Update the background of the slider to reflect progress
        progressSlider.style.background = `linear-gradient(to right, #ffffff ${progressPercentage}%, #444 ${progressPercentage}%)`;
    }

    // Initialize display
    updatePlayerDisplay();

    // Event listener for slider input (when user drags the slider)
    progressSlider.addEventListener('input', (e) => {
        const newProgressPercentage = parseFloat(e.target.value);
        currentPlaybackTime = (newProgressPercentage / 100) * totalPlaybackTime;
        currentTimeSpan.textContent = formatTime(currentPlaybackTime);
        // Also update the track fill immediately
        progressSlider.style.background = `linear-gradient(to right, #ffffff ${newProgressPercentage}%, #444 ${newProgressPercentage}%)`;
    });

    // Event listener for play/pause button
    playPauseButton.addEventListener('click', () => {
        isPlaying = !isPlaying;
        if (isPlaying) {
            playPauseIcon.classList.remove('fa-play');
            playPauseIcon.classList.add('fa-pause');
            // In a real application, you'd start audio/video playback here
            console.log('Playing...');
            // Simulate progress (for demonstration)
            // In a real scenario, this would be tied to the actual media's timeupdate event
            // For now, we'll just keep the button state
        } else {
            playPauseIcon.classList.remove('fa-pause');
            playPauseIcon.classList.add('fa-play');
            // In a real application, you'd pause audio/video playback here
            console.log('Paused.');
        }
    });

    // Event listener for rewind button
    rewindButton.addEventListener('click', () => {
        currentPlaybackTime = Math.max(0, currentPlaybackTime - 10); // Rewind by 10 seconds
        updatePlayerDisplay();
        console.log(`Rewound to: ${formatTime(currentPlaybackTime)}`);
    });

    // Event listener for fast forward button
    forwardButton.addEventListener('click', () => {
        currentPlaybackTime = Math.min(totalPlaybackTime, currentPlaybackTime + 10); // Fast forward by 10 seconds
        updatePlayerDisplay();
        console.log(`Forwarded to: ${formatTime(currentPlaybackTime)}`);
    });

    // If you had an actual audio/video element, you'd integrate it like this:
    /*
    const audioElement = new Audio('your-audio-file.mp3'); // Or video element
    audioElement.addEventListener('timeupdate', () => {
        currentPlaybackTime = audioElement.currentTime;
        totalPlaybackTime = audioElement.duration; // Get actual duration
        updatePlayerDisplay();
    });

    playPauseButton.addEventListener('click', () => {
        if (isPlaying) {
            audioElement.pause();
        } else {
            audioElement.play();
        }
        isPlaying = !isPlaying;
        playPauseIcon.classList.toggle('fa-play', !isPlaying);
        playPauseIcon.classList.toggle('fa-pause', isPlaying);
    });

    progressSlider.addEventListener('input', (e) => {
        const newProgressPercentage = parseFloat(e.target.value);
        audioElement.currentTime = (newProgressPercentage / 100) * audioElement.duration;
    });

    rewindButton.addEventListener('click', () => {
        audioElement.currentTime = Math.max(0, audioElement.currentTime - 10);
    });

    forwardButton.addEventListener('click', () => {
        audioElement.currentTime = Math.min(audioElement.duration, audioElement.currentTime + 10);
    });
    */
});