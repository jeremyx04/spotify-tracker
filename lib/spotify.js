const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;

const getAccessToken = async(refresh_token) => {
  const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
          Authorization: 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64')),
          'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({
          grant_type: 'refresh_token',
          refresh_token,
      }),
  });
  return response.json();
};

export const getRecentlyPlayed = async(refresh_token) => {
  const { access_token } = await getAccessToken(refresh_token);
  return fetch('https://api.spotify.com/v1/me/player/recently-played?limit=50', {
    headers: {
      Authorization: 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    }, 
  });
};

export const getTop = async(refresh_token,top_type,time) => {
  const { access_token } = await getAccessToken(refresh_token);
  return fetch(`https://api.spotify.com/v1/me/top/${top_type}?limit=50&time_range=${time}`, {
    headers: {
      Authorization: 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    }, 
  });
}

export const getRecommendations = async(refresh_token,seed_artists,seed_tracks) => {
  const { access_token } = await getAccessToken(refresh_token);
  let artists = ""
  seed_artists.forEach((artist) => { artists = artists + "," + artist.id})
  let tracks = ""
  seed_tracks.forEach((track) => {tracks = tracks + "," + track.id}) 
  return fetch(`https://api.spotify.com/v1/recommendations?seed_artists=${artists.substring(1)}&seed_tracks=${tracks.substring(1)}`, {
    headers: {
      Authorization: 'Bearer ' + access_token,
      'Content-Type': 'application/json',
    }, 
  });
}