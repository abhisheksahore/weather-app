import _ from "lodash";

export const convertKToC = (k) => {
    return Math.round((k - 273.15) * 10) / 10;
}

export const convertCToF = (c) => {
    return (c * 1.8) + 32;
}

export const convertFToC = (f) => {
    return ((5 / 9) * (f - 32));
}

export const changeTempUnit = (conversionMethod, data) => {
    console.log(data)
    if (typeof data === "object" && _.isNil(data.list) && !_.isNil(data)) {
        data.main.temp = conversionMethod(data.main.temp);
        data.main.temp_max = conversionMethod(data.main.temp_max);
        data.main.temp_min = conversionMethod(data.main.temp_min);
        data.main.feels_like = conversionMethod(data.main.feels_like);
    } else if (!_.isNil(data) && !_.isNil(data.list) && Array.isArray(data.list)) {
        data.list = data.list.map(e => {
            e.main.temp = conversionMethod(e.main.temp);
            e.main.temp_max = conversionMethod(e.main.temp_max);
            e.main.temp_min = conversionMethod(e.main.temp_min);
            e.main.feels_like = conversionMethod(e.main.feels_like);
            return e;
        })
        console.log(JSON.parse(JSON.stringify(data)));
    }
    return data;
}