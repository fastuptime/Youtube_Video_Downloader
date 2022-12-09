const ytdl = require('ytdl-core');
const fs = require('fs');
const rl = require('readline-sync');

(async () => {
    let link = rl.question('Youtube video linki giriniz: ');

    let video = await ytdl.getInfo(link);
    let title = video.player_response.videoDetails.title + ' - ' + video.player_response.videoDetails.author;

    let mp = rl.question('mp3 mi mp4 mi: ');
    if (mp === 'mp3') {
        if (!fs.existsSync('./audios')) {
            fs.mkdirSync('./audios');
        }
        ytdl(link, {
            filter: 'audioonly'
        }).pipe(fs.createWriteStream('./audios/' + title + '.mp3'));
    } else if (mp === 'mp4') {
        if (!fs.existsSync('./videos')) {
            fs.mkdirSync('./videos');
        }
        ytdl(link, { quality: 'highest' }).pipe(fs.createWriteStream('./videos/' + title + '.mp4'));
    } else {
        console.log('Geçersiz cevap! mp3 veya mp4 yazmalısınız!');
        setTimeout(() => {
            process.exit();
        }, 6000);
    }
})();