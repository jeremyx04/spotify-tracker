import { getSession } from 'next-auth/react';
import { getRecentlyPlayed } from "../../lib/spotify";

const parseDate = (date) => {
    if(!date) 
        return '';
    let year = date.substring(0,4);
    let month = date.substring(5,7);
    let day = date.substring(8,10);
    let hour = 0;
    try{
        hour = parseInt(date.substring(11,13));
    }
    catch(error){
        console.error(error);
    }
    let minute = date.substring(14,16);
    let time = 'AM';
    const d = new Date();
    const offset = d.getTimezoneOffset()/60;
    hour = (hour + 24 - offset) % 24;
    if(hour > 12){
        time = 'PM';
        hour -= 12;
    }
    if(hour === 0){
        hour = 12;
    }
    const res = {
        year: year,
        month: month,
        day: day,
        hour: hour,
        minute: minute,
        time, time,
    }
    return res;
}

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
        played_at: parseDate(recent.played_at),
      }));
    return res.status(200).json(recent);
}

export default handler;
