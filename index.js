const player = {
  songs: [
    {
      id: 1,
      title: 'Vortex',
      album: 'Wallflowers',
      artist: 'Jinjer',
      duration: 242,
    },
    {
      id: 2,
      title: 'Vinda',
      album: 'Godtfolk',
      artist: 'Songleikr',
      duration: 160,
    },
    {
      id: 7,
      title: 'Shiroyama',
      album: 'The Last Stand',
      artist: 'Sabaton',
      duration: 213,
    },
    {
      id: 3,
      title: 'Thunderstruck',
      album: 'The Razors Edge',
      artist: 'AC/DC',
      duration: 292,
    },
    {
      id: 4,
      title: 'All is One',
      album: 'All is One',
      artist: 'Orphaned Land',
      duration: 270,
    },
    {
      id: 5,
      title: 'As a Stone',
      album: 'Show Us What You Got',
      artist: 'Full Trunk',
      duration: 259,
    },
  ],
  playlists: [
    { id: 1, name: 'Metal', songs: [1, 7, 4] },
    { id: 5, name: 'Israeli', songs: [4, 5] },
  ],
  playSong(song) {
    console.log(/* your code here */)
  },
}
function convertDur (num){   //helping function
  let mm = 0;
  let h = "00";
  while (num > 60){
    num -= 60;
    mm++;
  }
    if (mm < 10)
    mm = "0"+mm.toString();
    else
    mm.toString();
    if (num < 10)
    num = "0"+num.toString();
    else
    num.toString();
    return h + ":" + mm + ":" + num;
  
}
function convertToSec (dur){   //helping function
  dur = dur.split(":");
  dur[0] = Number(dur[0]);
  dur[1]= Number(dur[1]);
  return dur[0] * 60 + dur[1];
}
function searchId (id, objArr){         //helping function
  for(let i = 0; i < objArr.length; i++){
    if (objArr[i].id === id)
    return i
  }
  return -1;
}
function playSong(id) {
  // your code here
}

function removeSong(id) {
 if (searchId(id, player.songs) === -1) throw "id not valid";
  player.songs.splice(searchId(id, player.songs), 1);
  for (let i = 0; i < player.playlists.length; i++) {
   if (player.playlists[i].songs.indexOf(id) >= 0)
   player.playlists[i].songs.splice(player.playlists[i].songs.indexOf(id), 1)
  }
  // your code here
}

function addSong(title, album, artist, duration, id) {
  if (searchId(id, player.songs) >= 0) throw "id not valid";
  if (id === undefined){
    id = 0;
    while (searchId(id, player.songs) >= 0)
    {
      id++;
    }
  }
 player.songs.push({"id": id, "title": title, "album": album, "artist": artist, "duration": convertToSec(duration)});
  return id;// your code here
}

function removePlaylist(id) {
  let index = searchId(id, player.playlists);
    if (index === -1) throw "id not valid";
    else
    player.playlists.splice(index, 1);
  // your code here
}

function createPlaylist(name, id) {
  if(searchId(id, player.playlists) >= 0) throw "id not valid";
  if (id === undefined){
    id = 0;
    while (searchId(id, player.songs) >= 0)
    {
      id++;
    } 
  }
  player.playlists.push({id: id, name: name, songs:[]})
  return id;
  // your code here
}

function playPlaylist(id) {
  // your code here
}

function editPlaylist(playlistId, songId) {
  // your code here
}

function playlistDuration(id) {
  // your code here
}

function searchByQuery(query) {
  // your code here
}

function searchByDuration(duration) {
  // your code here
}

module.exports = {
  player,
  playSong,
  removeSong,
  addSong,
  removePlaylist,
  createPlaylist,
  playPlaylist,
  editPlaylist,
  playlistDuration,
  searchByQuery,
  searchByDuration,
}
