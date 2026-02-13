/**
 * 通用数据模型类型定义
 */

import { FooterState } from '@/components/common-footer';
import { ViewState } from '@/components/common-view-state';

/**
 * 通用分页数据模型
 */
export interface CommonDataModelType {
  loadingFirst: boolean;
  loadingNext: boolean;
  loadFlag: boolean;
  viewState: ViewState;
  footerState: FooterState;
  data: any[];
  page: number;
  pageSize: number;
}

/**
 * 简化版数据模型
 */
export interface CommonDataModelType1 {
  viewState: ViewState;
  data: any[];
}
