import { getSession } from 'next-auth/react';
import { getTop } from "../../lib/spotify";

const handler = async(req, res) => {
    const {
        token: {accessToken},
    } = await getSession({req});
    const response = await getTop(accessToken,'tracks');
    const { items } = await response.json();
    const tracks = items.slice(0, 50).map((track) => ({
        title: track.name,
        artist: track.artists.map((_artist) => _artist.name).join(', '),
        track_url: track.external_urls.spotify,
        artist_url: track.artists[0].external_urls.spotify,
        album_url: track.album.external_urls.spotify,
        image: track.album.images[2].url,
        album: track.album.name,
      }));

    return res.status(200).json({tracks});
}

export default handler;
