// Hiển thị bài hát trên thanh điều khiển
function loadSong(id) {
    const song = songs.find(x => x.id === id);
    const { name, singer, image, isFavorite } = song;
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
            </div>
        </div>
    `;
}

// Hiển thị thông tin bài hát (list nhạc)
function loadSongInfo(id) {
    const song = songs.find(x => x.id == id);
    const { name, image, singer } = song;
    cdThumbnail.src = image;
    playlistTitle.innerText = name;
    playlistSinger.innerText = singer;
}

// Hiển thị nhiều bài hát (list nhạc)
function loadSongs(index, array = songs, category = 'song') {
    const songList = document.querySelector('.song-list');
    const list = array.map((song, i) => {
        const { id, name, singer, image, cate, time, isFavorite } = song;
        return `
            <li id="${id}" class="${category}-item ${index === i ? 'song-active' : ''}" index="${i}">
                <div class="song-item-info col-3 col-2">
                    <img src="${image}" alt="" class="song-item-image">
                    <div class="song-item-text">
                        <h5 class="song-item-name ${index === i ? 'song-item-name-active' : ''}">${name}</h5>
                        <p class="song-item-singer">${singer}</p>
                    </div>
                </div>
                <div class="song-item-category col-3 col-2">${cate}</div>
                <div class="song-item-time col-3 col-2">${formatMinute(time)}</div>
                <div class="song-item-select">
                    <button class="song-item-favorite">
                        <i class="song-item-favorite-icon ${isFavorite ? 'bi bi-heart-fill' : 'bi bi-heart'}"></i>
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
                <div class="song-item-category col-3 col-2">${cate}</div>
                <div class="song-item-time col-3 col-2">${formatMinute(time)}</div>
                <div class="song-item-select">
                    <button class="song-item-favorite">
                        <i class="song-item-favorite-icon bi bi-heart-fill"></i>
                    </button>
                    <button class="song-item-options">
                        <i class="song-item-options-icon bi bi-three-dots-vertical"></i>
                        <div class="song-item-options-box">
                            <ul class="song-item-options-list">
                                <li class="song-item-options-remove" id="${id}">
                                    <i class="bi bi-trash3"></i>
                                    <span>Remove</span>
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
    let songIndex = id - 1;
    songs[songIndex].isFavorite = true;

    const favorite = document.querySelector('.song-favorite-icon');
    const favoriteItems = document.querySelectorAll('.song-item-favorite-icon');

    favorite.classList.replace('bi-heart', 'bi-heart-fill');
    playlistFavoriteIcon.classList.replace('bi-heart', 'bi-heart-fill');
    favoriteItems[songIndex].classList.replace('bi-heart', 'bi-heart-fill');
    favoriteSongs.push(songs[songIndex]);
}

// Xoá bài hát khỏi danh sách yêu thích
function removeFavoriteSong(id) {
    let songIndex = id - 1;
    songs[songIndex].isFavorite = false;
    
    const favorite = document.querySelector('.song-favorite-icon');

    favorite.classList.replace('bi-heart-fill', 'bi-heart');
    favoriteSongs.splice(favorIndex, 1);
    loadFavoriteSongs();
}

// Chuyển bài hát tiếp theo
function nextSong() {
    index++;
    songID++;
    if (index >= songs.length)
        index = 0;
    if (songID > songs.length)
        songID = 1;
    handleCategory(songID, index, songs, 'song');
}

// Chuyển bài hát trước đó
function previousSong() {
    index--;
    songID--;
    if (index < 0)
        index = songs.length - 1;
    if (songID < 1)
        songID = songs.length;
    handleCategory(songID, index, songs, 'song');
}

// Phát bài hát ngẫu nhiên
function randomSong() {
    let randomIndex;

    do {
        randomIndex = Math.floor(Math.random() * songs.length);
    } while (index === randomIndex);

    index = randomIndex;
    songID = randomIndex + 1;
    handleCategory(songID, index, songs, 'song');
}

// Chuyển bài hát tiếp theo ở danh sách yêu thích
function nextFavoriteSong() {
    favorIndex++;
    if (favorIndex >= favoriteSongs.length)
        favorIndex = 0;
    favorID = favoriteSongs[favorIndex].id;
    handleFavorite(favorID, favorIndex);
}

// Chuyển bài hát trước đó ở danh sách yêu thích
function previousFavoriteSong() {
    favorIndex--;
    if (favorIndex < 0)
        favorIndex = favoriteSongs.length - 1;
    favorID = favoriteSongs[favorIndex].id;
    handleFavorite(favorID, favorIndex);
}

// Phát bài hát ngẫu nhiên ở danh sách yêu thích
function randomFavoriteSong() {
    let randomIndex;

    do {
        randomIndex = Math.floor(Math.random() * favoriteSongs.length);
    } while (favorIndex === randomIndex);

    favorIndex = randomIndex;
    favorID = favoriteSongs[favorIndex].id;
    handleFavorite(favorID, favorIndex);
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

// Chọn thể loại nhạc
function selectCate(e) {
    const cate = e.target.innerText;
    const target = e.target;

    selectionItems.forEach(item => {
        if (item.classList.contains('selection-item-active')) {
            item.classList.remove('selection-item-active');
        }
    }); 

    switch (cate) {
        case 'All Music':
            target.classList.add('selection-item-active');
            isFavor = false;
            loadSongs();
            break;
        case 'Rap Music':
            target.classList.add('selection-item-active');
            raps = songs.filter(song => song.cate == cate);
            loadSongs('', raps, 'rap'); 
            break;
        case 'Indie Music':
            target.classList.add('selection-item-active');
            indies = songs.filter(song => song.cate == cate);
            loadSongs('', indies, 'indie');
            break;
        case 'Pop Music':
            target.classList.add('selection-item-active');
            pops = songs.filter(song => song.cate == cate);
            loadSongs('', pops, 'pop');
            break;
        case 'Favorite Music':
            target.classList.add('selection-item-active');
            isFavor = true;
            loadFavoriteSongs();
            break;
    }
}

// Xử lý khi người dùng thay đổi thể loại nhạc
function handleCategory(id, index, array = songs, cate = 'song') {
    audio.src = array[index].path;
    audio.play();
    loadSong(id);
    loadSongInfo(id);
    loadSongs(index, array, cate);
}

function handleFavorite(id, index) {
    audio.src = favoriteSongs[index].path;
    audio.play();
    loadSong(id);
    loadSongInfo(id);
    loadFavoriteSongs(id);
}

function scrollCenter() {
    setTimeout(() => {
        document.querySelector('.song-active').scrollIntoView({
            behavior: "smooth",
            block: "center"
        });
    }, 300);
}