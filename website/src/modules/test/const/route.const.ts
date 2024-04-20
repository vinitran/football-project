import { Test } from '../screen/test.screen';
import { Tab1 } from '../components/tab1.component';
import { Tab2 } from '../components/tab2.component';
import { Route } from '../../../interface/route.interface';

export const TestRoute: Route = {
  path: '/',
  Component: Test,
  navName: 'test',
  children: [
    {
      path: 'test1',
      Component: Tab1
    },
    {
      path: 'test2',
      Component: Tab2
    }
  ]
};
