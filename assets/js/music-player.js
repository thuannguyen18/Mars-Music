// Vị trị bài hát hiện tại
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

// Mảng chứa các bài hát cùng thể loại
let raps = [];
let indies = [];
let pops = [];

// Audio của bài hát (mặc định là bài hát đầu tiên)
audio.src = songs[index].path;

// Hiển thị bài hát trên player-control (mặc định hiển thị bài hát đầu tiên)
loadSong(songID);

// Hiển thị bài hát trên playlist 
loadSongInfo(songID);
loadSongs(index);

// CD xoay vòng tròn 
const cdAnimation = cd.animate([
    { transform: 'rotate(360deg)' }
],
    {
        duration: 10000,
        iterations: Infinity
    }
);
cdAnimation.pause();

// Xử lý các sự kiện
toggleBtn.addEventListener('click', togglePlay);
playlistBtn.addEventListener('click', togglePlay);
cd.addEventListener('click', togglePlay);

nextBtn.addEventListener('click', () => {
    if (isRandom && isFavor) {
        randomFavoriteSong();
    } else if (isRandom || isFavor) {
        if (isRandom) randomSong();
        if (isFavor) nextFavoriteSong();
    } else {
        nextSong();
    }
});

prevBtn.addEventListener('click', () => {
    if (isRandom && isFavor) {
        randomFavoriteSong();
    } else if (isRandom || isFavor) {
        if (isRandom) randomSong();
        if (isFavor) previousFavoriteSong();
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
    if (isRandom && isFavor) {
        randomFavoriteSong();
    } else if (isRandom || isFavor) {
        if (isRandom) randomSong();
        if (isFavor) nextFavoriteSong();
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
    const songItem = e.target.closest('.song-item:not(.song-active)');
    const songFavorite = e.target.closest('.song-item-favorite');
    const songOption = e.target.closest('.song-item-options');

    const favoriteItem = e.target.closest('.favorite-item:not(.song-active)');
    const rapItem = e.target.closest('.rap-item');
    const indieItem = e.target.closest('.indie-item');
    const popItem = e.target.closest('.pop-item');

    if (songItem || songFavorite) {
        if (songItem) {
            songID = Number(songItem.getAttribute('id'));
            index = Number(songItem.getAttribute('index'));
            handleCategory(songID, index, songs, 'song');
        }

        if (songFavorite) {
            e.stopPropagation();
            addToFavorite(songID);
        }
    }

    if (favoriteItem || songOption) {
        if (favoriteItem) {
            favorID = Number(favoriteItem.getAttribute('id'));
            favorIndex = Number(favoriteItem.getAttribute('index'));
            audio.src = favoriteSongs[favorIndex].path;
            audio.play();
            loadSong(favorID);
            loadSongInfo(favorID);
            loadFavoriteSongs(favorID);
        }

        if (songOption) {
            const options = document.querySelectorAll('.song-item-options-box');
            const removes = document.querySelectorAll('.song-item-options-remove');

            options[favorIndex].style.display = 'block';
            removes.forEach(remove => {
                remove.onclick = function () {
                    if (favorID === Number(remove.id)) {
                        removeFavoriteSong(favorID);
                    }
                }
            });
        }
    }

    if (rapItem) {
        songID = Number(rapItem.getAttribute('id'));
        index = Number(rapItem.getAttribute('index'));
        handleCategory(songID, index, raps, 'rap');
    }

    if (indieItem) {
        songID = Number(indieItem.getAttribute('id'));
        index = Number(indieItem.getAttribute('index'));
        handleCategory(songID, index, indies, 'indie');
    }

    if (popItem) {
        songID = Number(popItem.getAttribute('id'));
        index = Number(popItem.getAttribute('index'));
        handleCategory(songID, index, pops, 'pop');
    }
});

selectionList.addEventListener('click', selectCate);

playListFavoriteBtn.addEventListener('click', () => {
    addToFavorite(songID);
});

playListOptionBtn.addEventListener('click', () => {
    selection.style.display = 'block';
});

userAvatar.addEventListener('click', () => {
    userAvatarOption.classList.toggle('show');
    userAvatarOption.style.animation = 'FadeIn .2s linear';
});





