import { PlayUrl } from '../interface/match.interface';

export const objectToQueryString = (obj: any, prefix?: any): any => {
  const str = [];

  for (const p in obj) {
    if (obj.hasOwnProperty(p)) {
      const k = prefix ? prefix + '[' + p + ']' : p;
      const v = obj[p];
      str.push(
        v !== null && typeof v === 'object'
          ? objectToQueryString(v, k)
          : encodeURIComponent(k) + '=' + encodeURIComponent(v)
      );
    }
  }
  return str.join('&');
};

export const getVideoUrl = (data: PlayUrl[]): string => {
  const fullHd = data.find((element) => element.name === 'FHD');
  if (fullHd !== undefined) {
    return fullHd.url;
  }
  const fullHd1 = data.find((element) => element.name === 'FullHD');
  if (fullHd1 !== undefined) {
    return fullHd1.url;
  }
  const hD = data.find((element) => element.name === 'HD');
  if (hD !== undefined) {
    return hD.url;
  }
  return data[0].url;
};

const avatars = {
  0: require('../assets/images/avataaars-0.png'),
  1: require('../assets/images/avataaars-1.png'),
  2: require('../assets/images/avataaars-2.png'),
  3: require('../assets/images/avataaars-3.png'),
  4: require('../assets/images/avataaars-4.png'),
  5: require('../assets/images/avataaars-5.png'),
  6: require('../assets/images/avataaars-6.png'),
  7: require('../assets/images/avataaars-7.png'),
  8: require('../assets/images/avataaars-8.png'),
  9: require('../assets/images/avataaars-9.png'),
};

export const getAvatarFromId = (id: string) => {
  let asciiSum = 0;
  // Iterate over each character in the input string
  for (let i = 0; i < id.length; i++) {
    // Convert the character to its ASCII value and add it to the sum
    asciiSum += id.charCodeAt(i);
  }

  // Calculate the result modulo 10
  let resultMod10 = asciiSum % 10;

  return avatars[resultMod10];
};
