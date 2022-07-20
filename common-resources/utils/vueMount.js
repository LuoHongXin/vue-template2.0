// 挂载在vue下的方法
import moment from "moment";
export default {
    // 过滤空数据
    filterEmpty(str) {
        if (!str && str !== 0) return "-";
        return str;
    },
    // 格式化时间
    formatTime(time, regular = "YYYY-MM-DD HH:mm:ss") {
        if (typeof time === 'string' || typeof time === 'number' ) {
            return moment(time).format(regular);
        }
        return "-";
    }
}; 