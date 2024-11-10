import axios from 'axios'
export const HPImageArchiveApi=async (req, res) => {
    try {
        const response = await axios.get('https://cn.bing.com/HPImageArchive.aspx', {
            params: {
                format: 'js',
                idx: 0,
                n: 1,
                nc: 1586183781119,
                pid: 'hp',
                uhd: 1,
                uhdwidth: 2880,
                uhdheight: 1620
            }
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
}