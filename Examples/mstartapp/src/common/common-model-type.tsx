import {ViewState} from '~/components/common-view-state';
import {FooterState} from '~/components/common-footer';

type CommonDataModelType = {
  loadingFirst: boolean;
  loadingNext: boolean;
  loadFlag: boolean;
  viewState: ViewState;
  footerState: FooterState;
  data: Array<any>;
  page: number;
  pageSize: number;
};

type CommonDataModelType1 = {
  viewState: ViewState;
  data: Array<any>;
};

export type {CommonDataModelType, CommonDataModelType1};
