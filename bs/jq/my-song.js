function playSong(link, name, singer) {
    $('#my-mp3').attr('src',link);
    $('#current-play-title').html('Current playing: ' + name + ' - ' + singer);
}
$.ajax({
    url: MY_SONG_API,
    type: 'GET',
    data: 'json',
    headers: { 'authorization': "Basic "+localStorage.getItem('my-token') },
    success: function (listSong, textStatus, jqXHR) {

        console.log('succes');
        var content = '';
        for (var i = 0; i < listSong.length; i++) {
            content += '<div class="song-item">';
            content += '<div class="song-index">' + (i + 1) + '</div>';
            content += '<div class="song-thumbnail">';
            content += '<img src="' + listSong[i].thumbnail + '" alt="">';
            content += '</div>';
            content += '<div class="song-infor">';
            content += '<div class="song-name">' + listSong[i].name + '</div>';
            content += '<div class="song-singer">' + listSong[i].singer + '</div>';
            content += '</div>';
            content += '<div class="song-control" onclick="playSong(\'' + listSong[i].link + '\', \'' + listSong[i].name + '\', \'' + listSong[i].singer + '\')">Play</div>';
            content += '<div class="song-control"><a href="song-detail.html?id=' + listSong[i].id + '">Detail</a></div>';
            content += '</div>';
        }
        document.getElementById('list-song').innerHTML = content;
    },
    error: function () {
    console.log('error');
    }
});