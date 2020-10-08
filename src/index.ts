import Axios from 'axios';

import {ProfileResponse} from './types';

enum LcsErrorCode {
    LoginFailed = 'Login failed.',

    Unauthorized = 'Unauthorized.',
    Forbidden = 'Forbidden.',
    BadRequest = 'Bad request.',
    Unknown = 'Unknown server error.',
}

class LcsClient {
    auth:
        | {
              token: string;
              email: string;
          }
        | undefined;

    private axios: any;

    constructor(url: string) {
        this.axios = Axios.create({
            baseURL: url,
        });
    }

    async request(url: string, body: {[key: string]: any}) {
        // Add the token to the body if we're authenticated
        if (this.auth) body.token = this.auth.token;

        let res;
        try {
            res = (await this.axios.post(url, body)).data;
        } catch (err) {
            // Catch any actual HTTP errors. LCS always returns a 200 with
            // a statusCode in the body, so these shouldn't happen.
            throw {
                code: LcsErrorCode.Unknown,
                status: err.response && err.response.status,
                message: err.response && err.response.data,
            };
        }

        // Catch any bad request responses
        if (res.statusCode === 400)
            throw {code: LcsErrorCode.BadRequest, message: res.body};

        return {
            status: res.statusCode,
            body: res.body,
        };
    }

    async login(email: string, password: string) {
        const res = await this.request('/authorize', {
            email,
            password,
        });

        if (res.status === 200) {
            this.auth = {
                email,
                token: res.body.token,
            };
        } else if (res.status === 403) {
            throw {code: LcsErrorCode.LoginFailed, message: res.body};
        } else {
            throw {
                code: LcsErrorCode.Unknown,
                status: res.status,
                message: res.body,
            };
        }
    }

    async profile(): Promise<ProfileResponse> {
        if (!this.auth) throw {code: LcsErrorCode.Unauthorized};

        return (await this.read({email: this.auth.email}))[0];
    }

    async read(query: {[key: string]: string}, aggregate: boolean = false) {
        if (!this.auth) throw {code: LcsErrorCode.Unauthorized};

        const res = await this.request('/read', {query, aggregate});

        if (res.status === 200) {
            return res.body;
        } else {
            throw {
                code: LcsErrorCode.Unknown,
                status: res.status,
                message: res.body,
            };
        }
    }
}

export {LcsClient, LcsErrorCode};
