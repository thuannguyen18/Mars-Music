// Lấy ra bài hát hiện tại
function getSong(index) {
    return songs[index];
}

// Lấy ra bài hát yêu thích 
function getFavoriteSong(index) {
    return favoriteSongs[index];
}

// Hiển thị 1 bài hát
function loadSong(id) {
    const song = songs.find(x => x.id === id);
    const { name, singer, image, isFavorite } = song;
    cdThumbnail.src = image;
    playlistTitle.innerText = name;
    playlistSinger.innerText = singer;
    return songInfo.innerHTML = `
        <div class="song">
            <div class="song-info-container">
                <img src="${image}" alt="music" class="song-img">
                <div class="song-info">
                    <h4 class="song-title">${name}</h4>
                    <p class="song-singer">${singer}</p>
                </div>
            </div>
            <div class="song-option">
                <button onclick="addToFavorite(${id})" class="song-favorite">
                    <i class="song-favorite-icon ${isFavorite ? 'bi bi-heart-fill' : 'bi bi-heart'}"></i>
                </button>
                <button class="song-menu">
                    <i class="song-menu-icon bi bi-three-dots"></i>
                </button>
            </div>
        </div>
    `;
}

// Hiển thị nhiều bài hát
function loadSongs(index, array = songs) {
    const songList = document.querySelector('.song-list');
    const list = array.map((song, i) => {
        const { id, name, singer, image, cate, time, isFavorite } = song;
        return `
            <li id="${id}" class="song-item ${index === i ? 'song-active' : ''}" index="${i}">
                <div class="song-item-info col-3 col-2">
                    <img src="${image}" alt="" class="song-item-image">
                    <div class="song-item-text">
                        <h5 class="song-item-name ${index === i ? 'song-item-name-active' : ''}">${name}</h5>
                        <p class="song-item-singer">${singer}</p>
                    </div>
                </div>
                <div class="song-item-category col-3">${cate}</div>
                <div class="song-item-time col-3 col-2">${formatMinute(time)}</div>
                <div class="song-item-select">
                    <button class="song-item-favorite">
                        <i onclick="addToFavorite2()" class="song-item-favorite-icon ${isFavorite ? 'bi bi-heart-fill' : 'bi bi-heart'}"></i>
                    </button>
                    <button class="song-item-options" id="${id}">
                        <i class="song-item-options-icon bi bi-three-dots-vertical"></i>
                        <div class="song-item-options-box">
                            <ul class="song-item-options-list">
                                <li class="song-item-options-item">
                                    <i class="bi bi-plus-circle"></i>
                                    <span>ADD TO FAVORITE LIST</span>
                                </li>
                                <li class="song-item-options-item">
                                    <i class="bi bi-trash3"></i>
                                    <span>REMOVE FROM FAVORITE LIST</span>
                                </li>
                            </ul>
                        </div>
                    </button>
                </div>
            </li>
        `
    }).join('');
    songList.innerHTML = list;
}

// Hiển thị các bài hát yêu thích
function loadFavoriteSongs(favorID) {
    const songList = document.querySelector('.song-list');
    const favorList = favoriteSongs.map((song, i) => {
        const { id, name, singer, image, cate, time } = song;
        return `
            <li id="${id}" class="favorite-item ${favorID === id ? 'song-active' : ''}" index="${i}">
                <div class="song-item-info col-3 col-2">
                    <img src="${image}" alt="" class="song-item-image">
                    <div class="song-item-text">
                        <h5 class="song-item-name ${favorID === id ? 'song-item-name-active' : ''}">${name}</h5>
                        <p class="song-item-singer">${singer}</p>
                    </div>
                </div>
                <div class="song-item-category col-3">${cate}</div>
                <div class="song-item-time col-3 col-2">${formatMinute(time)}</div>
                <div class="song-item-select">
                    <button class="song-item-favorite">
                        <i class="song-item-favorite-icon bi bi-heart-fill"></i>
                    </button>
                    <button class="song-item-options" id="${id}">
                        <i class="song-item-options-icon bi bi-three-dots-vertical"></i>
                        <div class="song-item-options-box">
                            <ul class="song-item-options-list">
                                <li class="song-item-options-item">
                                    <i class="bi bi-plus-circle"></i>
                                    <span>ADD TO FAVORITE LIST</span>
                                </li>
                                <li class="song-item-options-item">
                                    <i class="bi bi-trash3"></i>
                                    <span>REMOVE FROM FAVORITE LIST</span>
                                </li>
                            </ul>
                        </div>
                    </button>
                </div>
            </li>
        `
    }).join('');
    songList.innerHTML = favorList;
}

// Xử lý khi người dùng nhấn vào hình trái tim
function addToFavorite(id) {
    let favorIndex = id - 1;
    const favorite = document.querySelector('.song-favorite-icon');
    const favoriteItems = document.querySelectorAll('.song-item-favorite-icon');

    if (songs[favorIndex].isFavorite) {
        songs[favorIndex].isFavorite = false;
        favorite.classList.replace('bi-heart-fill', 'bi-heart');
        favoriteItems[favorIndex].classList.replace('bi-heart-fill', 'bi-heart');
    } else {
        songs[favorIndex].isFavorite = true;
        favorite.classList.replace('bi-heart', 'bi-heart-fill');
        favoriteItems[favorIndex].classList.replace('bi-heart', 'bi-heart-fill');
        favoriteSongs.push(songs[favorIndex]);
    }
}

// bugs
function addToFavorite2() {

}

// Chuyển bài hát tiếp theo
function nextSong() {
    index++;
    songID++;
    if (index >= songs.length)
        index = 0;
    if (songID > songs.length)
        songID = 1;
    audio.src = getSong(index).path;
    audio.play();
    loadSong(songID);
    loadSongs(index);
}

// Chuyển bài hát tiếp theo ở danh sách yêu thích
function nextFavoriteSong() {
    favorIndex++;
    if (favorIndex >= favoriteSongs.length)
        favorIndex = 0;
    favorID = getFavoriteSong(favorIndex).id;
    audio.src = getFavoriteSong(favorIndex).path;
    audio.play();
    loadSong(favorID);
    loadFavoriteSongs(favorID); 
}

// Chuyển bài hát trước đó
function previousSong() {
    index--;
    songID--;
    if (index < 0)
        index = songs.length - 1;
    if (songID < 1)
        songID = songs.length;
    audio.src = getSong(index).path;
    audio.play();
    loadSong(songID);
    loadSongs(index);
}

// Chuyển bài hát trước đó ở danh sách yêu thích
function previousFavoriteSong() {
    favorIndex--;
    if (favorIndex < 0)
        favorIndex = favoriteSongs.length - 1;
    favorID = getFavoriteSong(favorIndex).id;
    audio.src = getFavoriteSong(favorIndex).path;
    audio.play();
    loadSong(favorID);
    loadFavoriteSongs(favorID); 
}

// Phát bài hát ngẫu nhiên
function randomSong() {
    let randomIndex;

    do {
        randomIndex = Math.floor(Math.random() * songs.length);
    } while (index === randomIndex);

    index = randomIndex;
    songID = randomIndex + 1;
    audio.src = getSong(index).path;
    audio.play();
    loadSong(songID);
    loadSongs(index);
}

// Phát bài hát ngẫu nhiên ở danh sách yêu thích
function randomFavoriteSong() {
    let randomIndex;

    do {
        randomIndex = Math.floor(Math.random() * favoriteSongs.length);
    } while (favorIndex === randomIndex);

    favorIndex = randomIndex;
    favorID = getFavoriteSong(favorIndex).id;
    audio.src = getFavoriteSong(favorIndex).path;
    audio.play();
    loadSong(favorID);
    loadFavoriteSongs(favorID)
}

// Lặp lại bài hát
function repeatSong() {
    audio.loop = true;
    audio.play();
}

// Tắt âm lượng
function mute(active) {
    return active ? audio.muted = 'muted' : audio.muted = '';
}

// Tuỳ chỉnh âm lượng
function adjustVolume(value) {
    audio.volume = value;
}

// Số giây hiện tại của bài hát
function formatSecond(sec) {
    return new Date(sec * 1000).toISOString().substring(14, 19); // 00m:00s 
}

// Thời gian của bài hát (phút)
function formatMinute(time) {
    const sec = Math.floor(time % 60);
    const min = Math.floor(time / 60);
    if (min < 10 && sec < 10) {
        return `0${min}:0${sec}`;
    } else if (min < 10) {
        return `0${min}:${sec}`;
    } else if (min > 10 && sec < 10) {
        return `${min}:0${sec}`;
    } else {
        return `${min}:${sec}`;
    }
}

// Xử lý khi người dùng nhấn nút phát/tắt nhạc
function togglePlay() {
    return isPlay ? audio.pause() : audio.play();
}

// Chọn thể loại
function selectCate(e) {
    const item = e.target.innerText;

    selectionItems.forEach(item => {
        if (item.classList.contains('selection-item-active')) {
            item.classList.remove('selection-item-active');
        }
    });

    switch (item) {
        case 'All Music':
            isFavor = false;
            e.target.classList.add('selection-item-active');
            loadSong(songID);
            loadSongs(index);
            break;
        case 'Rap Music':
            e.target.classList.add('selection-item-active');
            const raps = songs.filter(song => song.cate == item);
            loadSongs(index, raps);
            break;
        case 'Indie Music':
            e.target.classList.add('selection-item-active');
            const indies = songs.filter(song => song.cate == item);
            loadSongs(index, indies);
            break;
        case 'Pop Music':
            e.target.classList.add('selection-item-active');
            const pops = songs.filter(song => song.cate == item);
            loadSongs(index, pops);
            break;
        case 'Bolero':
            console.log('bolero')
            break;
        case 'Favorite Music':
            e.target.classList.add('selection-item-active');
            loadFavoriteSongs();
            isFavor = true;
            break;
    }
}