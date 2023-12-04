import moment from "moment";

export const formatToMMSS = (duration) => {
    //  180second * 1000ml_second = 180 000 ml second
    return moment.utc(duration * 1000).format("mm:ss")
}