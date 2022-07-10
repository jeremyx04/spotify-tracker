import { getSession } from 'next-auth/react';
import { getTop } from "../../lib/spotify";

const handler = async(req, res) => {
    const {
        token: {accessToken},
    } = await getSession({req});
    const response = await getTop(accessToken,'tracks');
    const top_tracks = await response.json();
    //console.log(top_tracks.items[0].album.artists[0].name);
    return res.status(200).json(top_tracks);
}

export default handler;
