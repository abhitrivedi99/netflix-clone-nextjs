import videoData from '../data/videos.json';

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

const getCommonVideos = async (url) => {
  try {
    const BASE_URL = 'https://youtube.googleapis.com/youtube/v3';

    const response = await fetch(`${BASE_URL}/${url}&key=${YOUTUBE_API_KEY}`);
    console.log(response);
    let data = await response.json();

    if (data?.error) {
      console.error('Something went wrong', data?.error.message);
      data = videoData;
    }

    return data?.items.map(({ id, snippet }) => {
      return {
        title: snippet.title,
        imgUrl: snippet.thumbnails.high.url,
        id: id?.videoId || id?.channelId || id,
      };
    });
  } catch (err) {
    console.error('Something went wrong', err.message);
  }
};

export const getVideos = (keyword) => {
  return getCommonVideos(`search?part=snippet&maxResults=25&order=relevance&q=${keyword}`);
};

export const getPopularVideos = () => {
  return getCommonVideos(`videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=IN`);
};
