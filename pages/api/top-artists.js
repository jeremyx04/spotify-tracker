import { getSession } from 'next-auth/react';
import { getTop } from "../../lib/spotify";

const handler = async(req, res) => {
    const {
        token: {accessToken},
    } = await getSession({req});
    let time = req.query.time;
    if(!time)
        time = 'medium_term';
    const response = await getTop(accessToken,'artists',time);
    const { items } = await response.json();
    const artists = items.slice(0, 50).map((artist) => ({
        name: artist.name,
        url: artist.external_urls.spotify,
        image: (artist.images[2] ? artist.images[2].url : null),
    }));
    return res.status(200).json(artists);
}

export default handler;
