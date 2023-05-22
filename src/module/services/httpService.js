import axios from "axios";

export default class HttpService {
    static _get(data) {
        let {path, params} = data;
        params = params || {};
        const url = `${path}`;

        const options = {
            params: params,
            method: "GET",
        }
        console.log(options);
        return axios.get(url, options);
    }

    static getCurrentWeather(path, params) {
        return HttpService._get({path, params});
    }

}