import { getSession } from 'next-auth/react';
import { getRecommendations, getTop } from "../../lib/spotify";

const handler = async(req, res) => {
    const {
        token: {accessToken},
    } = await getSession({req});
    const time = 'medium_term';
    const artistsResponse = await getTop(accessToken,'artists',time);
    const tracksResponse = await getTop(accessToken,'tracks',time);
    const { items: artistItems } = await artistsResponse.json();
    const topArtists = artistItems.slice(0, 2).map((artist) => ({
        id: artist.id,
    }));
    const { items: trackItems } = await tracksResponse.json();
    const topTracks = trackItems.slice(0, 3).map((track) => ({
        id: track.id,
    }));
    const response = await getRecommendations(accessToken,topArtists,topTracks);
    const { tracks: recommendedTracks } = await response.json();
    const tracks = recommendedTracks.slice(0, 10).map((track) => ({
      title: track.name,
      artist: track.artists.map((_artist) => _artist.name).join(', '),
      track_url: track.external_urls.spotify,
      artist_url: track.artists[0].external_urls.spotify,
      album_url: track.album.external_urls.spotify,
      image: track.album.images[2].url,
      album: track.album.name,
    }));
    return res.status(200).json(tracks);
}

export default handler;
