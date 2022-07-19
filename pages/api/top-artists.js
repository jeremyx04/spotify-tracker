import { getSession } from 'next-auth/react';
import { getTop } from "../../lib/spotify";

const handler = async(req, res) => {
    const {
        token: {accessToken},
    } = await getSession({req});
    const response = await getTop(accessToken,'artists');
    const { items } = await response.json();
    console.log(items[0]);
    const artists = items.slice(0, 50).map((artist) => ({
        name: artist.name,
        url: artist.external_urls.spotify,
        image: artist.images[2].url,
    }));
    return res.status(200).json(artists);
}

export default handler;
