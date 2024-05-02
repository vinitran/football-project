import { highlightScreen } from '../../modules/highlight/const/route.const';
import { homeScreens } from '../../modules/home/const/route.const';
import { newsScreens } from '../../modules/news/const/route.const';

export const screens = {
  ...homeScreens,
  ...newsScreens,
  ...highlightScreen,
};
