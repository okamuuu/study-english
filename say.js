const _ = require('lodash')
const CronJob = require('cron').CronJob
const exec = require('child_process').exec
const notifier = require('node-notifier')

const words = [
  {
    en: "We should think another task 30 minutes later",
    ja: "30分経って分からなかったら、別の問題を考えよう"
  }
];

const sayWord = () => {
  const word = _.sample(words)
  notifier.notify({
    title: word.en,
    message: word.ja
  });

  const command = `say -v alex -r 120 ${word.en}`;
  require('child_process').exec(command, (err, stdout, stderr) => {
    if (err) console.log(err);
  });
};

job = new CronJob({
  cronTime: '*/10 * * * * *',
  onTick: sayWord,
  start: true,
  timeZone: "Asia/Tokyo",
});

job.start();
