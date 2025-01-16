require('dotenv').config({ path: process.argv[2] });

const { exec } = require('child_process');

exec('npm run dev', (err, stdout, stderr) => {
  if (err) {
    console.error(`Error: ${err}`);
    return;
  }
  console.log(stdout);
  console.error(stderr);
});