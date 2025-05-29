import Resizer from 'react-image-file-resizer';
import { base64StringToBlob } from 'blob-util';

export const fileResize = async (
  base64: string,
  width: number,
  height: number,
  ext = 'JPG',
  type = 'base64'
) => {
  const blob = base64StringToBlob(base64.split(',')[1]);
  return new Promise(resolve => {
    Resizer.imageFileResizer(
      blob,
      width,
      height,
      ext,
      92,
      0,
      uri => {
        resolve(uri);
      },
      type,
      width,
      height
    );
  });
};
