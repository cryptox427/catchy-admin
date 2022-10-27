import axios from 'axios';
import {SERVER_DOMAIN} from './config';

export const requestOTP = () => {
    return new Promise(((resolve, reject) => {
        axios.get(`${SERVER_DOMAIN}/generateOTP`).then(res => {
            resolve(res.data);
        }).catch(err => {
            console.log(err)
            reject(err);
        })
    }))
}

export const verifyOTP = (otp) => {
    return new Promise(((resolve, reject) => {
        axios.post(`${SERVER_DOMAIN}/verifyOTP`, {otp}).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err);
        })
    }))
}

export const getDomains = () => {
    return new Promise(((resolve, reject) => {
        axios.get(`${SERVER_DOMAIN}/getDomains`).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err);
        })
    }))
}

export const addDomain = (data) => {
    return new Promise(((resolve, reject) => {
        axios.post(`${SERVER_DOMAIN}/createDomain`, data).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err);
        })
    }))
}

export const uploadLogo = (formData) => {
    return new Promise(((resolve, reject) => {
        axios.post(`${SERVER_DOMAIN}/uploadLogo`, formData).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err);
        })
    }))
}

export const getDomainById = (id) => {
    return new Promise(((resolve, reject) => {
        axios.get(`${SERVER_DOMAIN}/getDomainById/${id}`).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err);
        })
    }))
}

export const updateDomain = data => {
    return new Promise(((resolve, reject) => {
        axios.post(`${SERVER_DOMAIN}/updateDomain`, data).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err);
        })
    }))
}

export const deleteDomain = id => {
    return new Promise(((resolve, reject) => {
        axios.post(`${SERVER_DOMAIN}/deleteDomain`, {id}).then(res => {
            resolve(res.data);
        }).catch(err => {
            reject(err);
        })
    }))
}
