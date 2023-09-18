const fs = require('fs');
const archiver = require('archiver');

const plugin = (dirname) => {
  const makeZip = () => {
    try {
      const output = fs.createWriteStream(`${dirname}/dist/dist.zip`);
      const archive = archiver('zip', {
        zlib: { level: 9 }
      });
      output.on('close', () => {
        console.log(archive.pointer() + ' total bytes');
        console.log('压缩完成!');
      });
      archive.on('error', (err) => {
        throw err;
      });
      archive.pipe(output);
      archive.directory(`${dirname}/dist`, false);
      archive.finalize();
    } catch (error) {
      console.log(error);
    }
  };
  return {
    name: 'vite-plugin-compress',
    apply: 'build',
    closeBundle() {
      makeZip();
    }
  };
};

export default plugin;