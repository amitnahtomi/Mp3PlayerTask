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
    console.log("Playing "+song.title+" from " +song.album+" by "+song.artist+" | "+convertDur(song.duration)+".");
  },
}
function compare(a, b){    //helping function
  let x = a.title.toUpperCase();
    let y = b.title.toUpperCase();
    if (x<y)
    return -1;
    if(x>y)
    return 1;
    return 0;
}
function convertDur (num){   //helping function
  let ss = num;
  let mm = 0;
  while (ss > 60){
    ss -= 60;
    mm++;
  }
    if (mm < 10){
    mm = "0"+mm;
    }
    if (ss < 10){
    ss = "0"+ss;
    }
    return mm + ":" + ss;
  
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
  let index = searchId(id, player.songs)
  if (index === -1) throw "id not valid";
  player.playSong(player.songs[index]);
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
    while (searchId(id, player.playlists) >= 0)
    {
      id++;
    } 
  }
  player.playlists.push({id: id, name: name, songs:[]})
  return id;
  // your code here
}

function playPlaylist(id) {
  let index = searchId(id, player.playlists);
  if (index === -1) throw "id not valid";
  let arrS = player.playlists[index].songs;
  for (let i = 0; i<arrS.length; i++){
    playSong(arrS[i]);
  }
  // your code here
}

function editPlaylist(playlistId, songId) {
  if (searchId(songId, player.songs) === -1) throw "id not valid";
  let songArr = player.playlists[searchId(playlistId, player.playlists)].songs;
  let index = songArr.indexOf(songId);
  if (index >= 0){
     songArr.splice(index, 1);
     if (songArr[0] === undefined){
     player.playlists.splice(searchId(playlistId, player.playlists), 1)
     }
  }
  else 
  songArr.push(songId);
  // your code here
}

function playlistDuration(id) {
  let counter = 0;
  let index = searchId(id, player.playlists);
  let indexS;
  let arrS = player.playlists[index].songs;
  for (let i = 0; i < arrS.length; i++){
    indexS = searchId(arrS[i], player.songs);
    counter = counter + player.songs[indexS].duration;
  }
  return counter;
  // your code here
}

function searchByQuery(query) {
  let queryResult ={
    songs: [],
    playlists: []
  }
  for (let i = 0; i<player.songs.length; i++){
    if(((player.songs[i].title + player.songs[i].album + player.songs[i].artist).toUpperCase()).includes(query.toUpperCase()))
    queryResult.songs.push(player.songs[i])
  }
  for(let j = 0; j<player.playlists.length; j++){
    if((player.playlists[j].name.toUpperCase()).includes(query.toUpperCase()))
    queryResult.playlists.push(player.playlists[j])
  }
  queryResult.songs.sort(compare);
  queryResult.playlists.sort(compare);
  return queryResult;
  // your code here
}

function searchByDuration(duration) {
  let secDur = convertToSec(duration);
  let minDur = 100000000000;
  let minObj;
  for (let i = 0; i < player.songs.length; i++){
      if(Math.abs(player.songs[i].duration - secDur) < minDur){
        minDur = Math.abs(player.songs[i].duration - secDur);
        minObj = player.songs[i];
      }
  }
  for (let i = 0; i < player.playlists.length; i++){
    if(Math.abs(playlistDuration(player.playlists[i].id) - secDur) < minDur){
      minDur = Math.abs(playlistDuration(player.playlists[i].id) - secDur);
      minObj = player.playlists[i];
    }
}
return minObj;
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
