export const RandomColor = () => {
    const characters = '0123456789ABCDEF';
    let result = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return '#' + result;
}
export const RandomBgColor = () => {
    const characters = '0123456789ABCDEF';
    let result = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters[randomIndex];
    }
    return 'bg-[#' + result + ']';
  };
  