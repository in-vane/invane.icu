import Axios from 'axios';

const api = {};

/* 创建 axios 实例 */
let axios = Axios.create({
	baseURL: 'http://localhost:7001',
	timeout: 30000,
});

/* 请求拦截器 */
axios.interceptors.request.use(
	async (config) => {
		return {
			...config,
		};
	},
	(error) => {
		return Promise.reject(error);
	}
);

/* 响应拦截器 */
axios.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export { axios };
