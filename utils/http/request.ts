/**
 * HTTP 请求工具
 * 统一封装 fetch API
 */

/**
 * 请求方法类型
 */
export type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * 请求配置接口
 */
export interface RequestOptions {
  method?: RequestMethod;
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
  params?: Record<string, string | number>;
}

/**
 * 响应接口
 */
export interface Response<T = unknown> {
  code: number;
  message: string;
  data: T;
}

/**
 * 默认配置
 */
const DEFAULT_CONFIG: Required<Pick<RequestOptions, 'method' | 'timeout'>> = {
  method: 'GET',
  timeout: 30000, // 30 秒
};

/**
 * 构建完整 URL（带查询参数）
 * @param url - 基础 URL
 * @param params - 查询参数
 * @returns 完整 URL
 */
function buildURL(url: string, params?: Record<string, string | number>): string {
  if (!params) {
    return url;
  }

  const queryPairs = Object.entries(params).map(
    ([key, value]) => `${key}=${encodeURIComponent(String(value))}`
  );

  const queryString = queryPairs.join('&');
  const separator = url.includes('?') ? '&' : '?';

  return `${url}${separator}${queryString}`;
}

/**
 * 核心请求函数
 * @param url - 请求地址
 * @param options - 请求配置
 * @returns Promise<T>
 */
export async function request<T>(
  url: string,
  options: RequestOptions = {}
): Promise<T> {
  const { method = 'GET', headers, body, timeout = DEFAULT_CONFIG.timeout, params } = options;

  // 构建完整 URL
  const fullURL = buildURL(url, params);

  console.log(`[HTTP] ${method} ${fullURL}`, body);

  // 创建 AbortController 用于超时
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeout);

  try {
    const response = await fetch(fullURL, {
      method,
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json;charset=UTF-8',
        ...headers,
      },
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result as T;
  } catch (error) {
    clearTimeout(timeoutId);
    console.error(`[HTTP] ${method} ${fullURL} error:`, error);
    throw error;
  }
}

/**
 * GET 请求
 * @param url - 请求地址
 * @param params - 查询参数
 * @param options - 其他配置
 * @returns Promise<T>
 */
export function get<T>(
  url: string,
  params?: Record<string, string | number>,
  options?: Omit<RequestOptions, 'body' | 'method'>
): Promise<T> {
  return request<T>(url, { ...options, method: 'GET', params });
}

/**
 * POST 请求（JSON 格式）
 * @param url - 请求地址
 * @param data - 请求数据
 * @param options - 其他配置
 * @returns Promise<T>
 */
export function post<T>(
  url: string,
  data?: any,
  options?: Omit<RequestOptions, 'body' | 'method'>
): Promise<T> {
  return request<T>(url, {
    ...options,
    method: 'POST',
    body: data,
  });
}

/**
 * POST 请求（FormData 格式）
 * @param url - 请求地址
 * @param formData - FormData 对象
 * @param options - 其他配置
 * @returns Promise<T>
 */
export function postForm<T>(
  url: string,
  formData?: FormData,
  options?: Omit<RequestOptions, 'body' | 'method'>
): Promise<T> {
  return request<T>(url, {
    ...options,
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'multipart/form-data',
      ...options?.headers,
    },
  });
}

/**
 * PUT 请求
 * @param url - 请求地址
 * @param data - 请求数据
 * @param options - 其他配置
 * @returns Promise<T>
 */
export function put<T>(
  url: string,
  data?: any,
  options?: Omit<RequestOptions, 'body' | 'method'>
): Promise<T> {
  return request<T>(url, { ...options, method: 'PUT', body: data });
}

/**
 * DELETE 请求
 * @param url - 请求地址
 * @param options - 其他配置
 * @returns Promise<T>
 */
export function del<T>(
  url: string,
  options?: Omit<RequestOptions, 'body' | 'method'>
): Promise<T> {
  return request<T>(url, { ...options, method: 'DELETE' });
}

/**
 * 文件上传
 * @param url - 上传地址
 * @param files - 文件 URI 数组
 * @param params - 额外的表单参数
 * @param options - 其他配置
 * @returns Promise<T>
 */
export async function upload<T>(
  url: string,
  files: string[],
  params?: Record<string, string>,
  options?: Omit<RequestOptions, 'body' | 'method'>
): Promise<T> {
  const formData = new FormData();

  // 添加文件
  for (let i = 0; i < files.length; i++) {
    const uri = files[i];
    const date = new Date();
    const name = `${date.getTime()}_${i}.png`;

    const file: any = {
      uri,
      type: 'multipart/form-data',
      name,
    };

    formData.append('file', file);
  }

  // 添加额外参数
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
  }

  console.log(`[HTTP] Upload ${url}`, files, params);

  return request<T>(url, {
    ...options,
    method: 'POST',
    body: formData as any,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
      ...options?.headers,
    },
  });
}
