import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const apiClient = axios.create({
    baseURL: `${apiUrl}/api`,
    headers: {
        'Content-Type': 'application/json',
    },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach(prom => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    
    failedQueue = [];
};

// 요청 인터셉터
apiClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.warn('No access token found for request');
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// 응답 인터셉터
apiClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                })
                .then((token) => {
                    originalRequest.headers['Authorization'] = 'Bearer ' + token;
                    return axios(originalRequest);
                })
                .catch((err) => {
                    return Promise.reject(err);
                });
            }

            originalRequest._retry = true;
            isRefreshing = true;

            try {
                const refreshToken = localStorage.getItem('refreshToken');
                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }

                console.log('Refreshing token with refreshToken:', refreshToken); // 갱신 요청 로그 추가

                // 리프레시 토큰 요청
                const { data } = await apiClient.post('/refresh-token', null, {
                    headers: {
                        'Authorization': `Bearer ${refreshToken}`
                    }
                });

                const { accessToken } = data;

                if (!accessToken) {
                    throw new Error('No access token received after refresh');
                }

                // 새로운 accessToken을 localStorage에 저장하고 기본 헤더 업데이트
                localStorage.setItem('accessToken', accessToken);
                apiClient.defaults.headers['Authorization'] = 'Bearer ' + accessToken;

                // 대기 중인 요청에 갱신된 토큰 반영
                processQueue(null, accessToken);

                // 재시도 원래 요청
                originalRequest.headers['Authorization'] = 'Bearer ' + accessToken;
                return axios(originalRequest);
            } catch (err) {
                // 갱신 실패 시 처리
                processQueue(err, null);
                localStorage.removeItem('accessToken');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default apiClient;
