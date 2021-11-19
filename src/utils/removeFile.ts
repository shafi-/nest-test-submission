import * as fs from 'fs';

function removeFile(file: string): void {
  fs.unlink(file, (err) => {
    if (err)
      console.log(err);
    else
      console.log('File removed', file);
  });
}

export {
  removeFile
}
