import { getSession } from 'next-auth/react';
import { getRecentlyPlayed } from "../../lib/spotify";

const handler = async(req, res) => {
    const {
        token: {accessToken},
    } = await getSession({req});
    const response = await getRecentlyPlayed(accessToken);
    const recently_played = await response.json();
    //console.log(recently_played.items[0].track.name);
    //console.log(recently_played.items[0].track.artists[0].name);
    return res.status(200).json(recently_played);
}

export default handler;
