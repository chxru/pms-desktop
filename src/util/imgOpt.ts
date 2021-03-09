/* eslint-disable import/prefer-default-export */
import Jimp from 'jimp/es';

export const OptimizeProfilePicture = async (base64: string) => {
  /*
  here base64 param is a base64 string, obviously.
  JIMP does not take base64 as a input

  https://github.com/oliver-moran/jimp/issues/231
  */

  const [, input] = base64.split(',');
  const img = await Jimp.read(Buffer.from(input, 'base64'));

  img.resize(200, 200);
  img.quality(80);

  const output = await img.getBufferAsync(Jimp.MIME_JPEG);
  return output.toString('base64');
};
