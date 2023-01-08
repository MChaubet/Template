import * as fs from 'fs';

export const importImageAsBase64 = (filePath: string): string => {
  const bitmap = fs.readFileSync(filePath);
  return new Buffer(bitmap).toString('base64');
};
