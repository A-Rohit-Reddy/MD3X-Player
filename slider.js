document.addEventListener('DOMContentLoaded', () => {
    const progressSlider = document.querySelector('.progress-slider');
    const currentTimeSpan = document.querySelector('.current-time');
    const playPauseButton = document.querySelector('.play-pause');
    const playPauseIcon = playPauseButton.querySelector('i');
    const rewindButton = document.querySelector('.rewind-10');
    const forwardButton = document.querySelector('.forward-10');

    let isPlaying = false;
    let currentPlaybackTime = 0; // Initial time in seconds (00:00)
    const totalPlaybackTime = 3 * 60 + 14; // Total time in seconds (03:14)

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
        progressSlider.style.background = `linear-gradient(to right, white ${progressPercentage}%, gray ${progressPercentage}%)`;
    }

    // Initialize display
    updatePlayerDisplay();

    // Event listener for slider input (when user drags the slider)
    progressSlider.addEventListener('input', (e) => {
        const newProgressPercentage = parseFloat(e.target.value);
        currentPlaybackTime = (newProgressPercentage / 100) * totalPlaybackTime;
        currentTimeSpan.textContent = formatTime(currentPlaybackTime);
        // Also update the track fill immediately
        progressSlider.style.background = `linear-gradient(to right, white ${progressSlider.value}%, gray ${progressSlider.value}%)`;
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
});