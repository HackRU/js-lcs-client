const axios = require("axios");

const errors = {
    login: {
        expired: "Login Expired",
        bad: "Bad Login",
        failed: "Login Failed"
    }
}


class LcsClient {
    constructor(LcsUrl) {
        this.token = null;
        this.email = null;
        this.validUntil = null;
        
        this.cached_profile = null;
        
        this.raw = axios.create({
            baseURL: LcsUrl
        });
        
        this.login = new Login(this);
        this.profile = new Profile(this);
    }
    
}

class LcsGroup {
    constructor(client) {
        this.client = client;
    }
    requireLogin() {
        return new Promise((resolve, reject) => {
            if (!this.client.login.isValid) {
                reject(erros.login.expired);
            } else {
                resolve(null);
            }
        })
    }
}

class Login extends LcsGroup {
    token(email, token) {
        return this.client.raw.post("/validate", {
            email, token
        })
    }
    
    password(email, password) {
        return this.client.raw.post("/authorize", {
            email, password
        }).then(res => {
            if (res.status === 200 && res.data.statusCode === 200) {
                return JSON.parse(res.data.body).auth;
            } else if (res.status === 403 || res.data.statusCode === 403) {
                throw new Error(errors.login.bad);
            } else {
                throw new Error(errors.login.failed);
            }
        }).then(auth => {
            this.client.token = auth.token;
            this.client.email = auth.email;
            this.client.validUntil = new Date(auth.valid_until);
            return auth;
        })
    }

    isValid() {
        if (this.client.validUntil === null) {
            return false;
        }
        return this.client.validUntil > Date.now()
    }
    
}

class Profile extends LcsGroup {
    get() {
        return this.requireLogin().then((_) => {
            const email = this.client.email;
            const token = this.client.token
            return this.client.raw.post("/read", {
                email,
                token,
                query: {email}
            })
        }).then(res => {
            const profile = res.data.body[0];
            this.client.cached_profile = profile;
            return profile;
        })
    }
}

module.exports = {
    LcsClient,
    errors
}
