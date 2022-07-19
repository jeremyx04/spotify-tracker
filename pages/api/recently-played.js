import { getSession } from 'next-auth/react';
import { getRecentlyPlayed } from "../../lib/spotify";

const handler = async(req, res) => {
    const {
        token: {accessToken},
    } = await getSession({req});
    const response = await getRecentlyPlayed(accessToken);
    const { items } = await response.json();
    const recent = items.slice(0,50).map((recent) => ({
        title: recent.track.name,
        artist: recent.track.artists.map((_artist) => _artist.name).join(', '),
        url: recent.track.external_urls.spotify,
        image: recent.track.album.images[1].url,
      }));
    return res.status(200).json(recent);
}

export default handler;
