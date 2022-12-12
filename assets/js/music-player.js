let index = 0;
let songID = 1;

// Vị trí bài hát yêu thích
let favorIndex;
let favorID;

// Biến kiểm tra
let isPlay = false;
let isRandom = false;
let isRepeat = false;
let isMute = false;
let isFavor = false;

// Audio của bài hát (mặc định là bài hát đầu tiên)
audio.src = getSong(index).path;
// Hiển thị bài hát trên player-control (mặc định hiển thị bài hát đầu tiên)
loadSong(songID);
// Hiển thị bài hát trên playlist 
loadSongs(index);

// Xử lý các sự kiện
toggleBtn.addEventListener('click', togglePlay);
playlistBtn.addEventListener('click', togglePlay);

nextBtn.addEventListener('click', () => {
    if (isRandom) {
        randomSong();
    } else if (isFavor) {
        nextFavoriteSong();
    } else {
        nextSong();
    }
});

prevBtn.addEventListener('click', () => {
    if (isRandom) {
        randomSong();
    } else if (isFavor) {
        previousFavoriteSong();
    } else {
        previousSong();
    }
});

randomBtn.addEventListener('click', () => {
    const random = document.querySelector('.btn-random-icon');
    isRandom = !isRandom;
    random.classList.toggle('active', isRandom);
});

repeatBtn.addEventListener('click', () => {
    const repeat = document.querySelector('.btn-repeat-icon');
    isRepeat = !isRepeat;
    repeat.classList.toggle('active', isRepeat);
});

audio.addEventListener('timeupdate', (e) => {
    const totalTime = e.target.duration;
    const time = e.target.currentTime;
    if (totalTime) {
        const progressTime = Math.floor(time / totalTime * 100);
        progressBar.max = Math.floor(totalTime);
        progressBar.value = Math.floor(time);
        progressInput.value = progressTime;
        timeStart.innerText = formatSecond(Math.floor(time));
        timeEnd.innerText = formatMinute(totalTime);
    }
});

audio.addEventListener('play', () => {
    toggleIcon.classList.replace('bi-play-circle-fill', 'bi-pause-circle-fill');
    cdThumbnailIcon.classList.replace('bi-play-circle-fill', 'bi-pause-circle-fill');
    cd.style.transform = '';
    cdThumbnail.style.borderRadius = '50%';
    cdAnimation.play();
    playlistBtn.innerText = 'PAUSE';
    isPlay = true;
});

audio.addEventListener('pause', () => {
    toggleIcon.classList.replace('bi-pause-circle-fill', 'bi-play-circle-fill');
    cdThumbnailIcon.classList.replace('bi-pause-circle-fill', 'bi-play-circle-fill');
    cd.style.transform = 'rotate(360deg)';
    cdThumbnail.style.borderRadius = '';
    cdAnimation.pause();
    playlistBtn.innerText = 'CONTINUE';
    isPlay = false;
});

audio.addEventListener('ended', () => {
    if (isRandom) {
        randomSong();
    } else if (isRepeat) {
        repeatSong();
    } else {
        nextSong();
    }
});

progressBar.addEventListener('mouseover', () => {
    progressInput.style.display = 'block';
});

progressInput.addEventListener('mouseout', () => {
    progressInput.style.display = 'none';
});

progressInput.addEventListener('input', (e) => {
    const time = Math.floor((audio.duration / 100) * e.target.value);
    audio.currentTime = time;
});

volumeBar.addEventListener('mouseover', () => {
    volumeInput.style.display = 'block';
});

volumeInput.addEventListener('mouseout', () => {
    volumeInput.style.display = 'none';
});

volumeInput.addEventListener('input', (e) => {
    const volumeValue = e.target.value;
    if (volumeValue === "0") {
        volumeIcon.classList.replace('bi-volume-up', 'bi-volume-mute');
    } else {
        volumeIcon.classList.replace('bi-volume-mute', 'bi-volume-up');
        isMute = false;
        mute(isMute);
    }
    volumeBar.value = volumeValue;
    adjustVolume(volumeValue);
});

volumeBtn.addEventListener('click', () => {
    if (isMute) {
        volumeIcon.classList.replace('bi-volume-mute', 'bi-volume-up');
        isMute = false;
        mute(isMute);
        volumeBar.value = audio.volume;
        volumeInput.value = audio.volume;
    } else {
        volumeIcon.classList.replace('bi-volume-up', 'bi-volume-mute');
        isMute = true;
        mute(isMute);
        volumeBar.value = 0;
        volumeInput.value = 0;
    }
});

songLists.addEventListener('click', (e) => {
    const songItem = e.target.closest('.song-item');
    const favoriteItem = e.target.closest('.favorite-item');
    const songFavorite = e.target.closest('.song-item-favorite-icon');
    const songOptions = e.target.closest('.song-item-options-icon');

    if (songFavorite) {
        addToFavorite(songID);
    } else if (songOptions) {
        console.log('remove');
    } else if (favoriteItem) {
        favoriteID = Number(favoriteItem.getAttribute('id'));
        favoriteIndex = Number(favoriteItem.getAttribute('index'));
        audio.src = getFavoriteSong(favoriteIndex).path;
        audio.play();
        loadSong(favoriteID);
        loadFavoriteSongs(favoriteID);
        favorID = favoriteID;
        favorIndex = favoriteIndex;
    } else {
        songID = Number(songItem.getAttribute('id'));
        index = Number(songItem.getAttribute('index'));
        audio.src = getSong(index).path;
        audio.play();
        loadSong(songID);
        loadSongs(index);
    }
});

selectionList.addEventListener('click', selectCate);

cd.addEventListener('click', togglePlay);

const cdAnimation = cd.animate([
    {
        transform: 'rotate(360deg)'
    }
], 
    {
        duration: 10000,
        iterations: Infinity
    }
);
cdAnimation.pause();
