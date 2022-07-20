
export default {
    // ip
    ipReg: /^((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})(\.((2(5[0-5]|[0-4]\d))|[0-1]?\d{1,2})){3}$/,
    validIp(str) {
        return this.ipReg.test(str);
    },
    // 不支持中文名称的邮箱
    emailReg: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
    validEmail(str) {
        return this.emailReg.test(str);
    },
    // 手机号
    phoneReg: /^[1][3,4,5,6,7,8,9][0-9]{9}$/,
    validPhone(str) {
        return this.phoneReg.test(str);
    },
    /**
     * 密码校验
     * 根据系统配置 userPwdComplexity 类型 来判断密码设置要求
     * userPwdComplexity: 1 必须混合使用字母和数字
     * userPwdComplexity: 2 只需输入数字或字母或特殊字符就行
     * userPwdComplexity: 3 必须为字母、数字、特殊字符组合
     * userPwdComplexity: 4 必须为大写字母、小写字母、数字、特殊字符组合
     * @param {string} str
     * @returns {Object}
     */
    checkUserPwd(value, userPwdComplexity = 2) {
        const a = "[0-9]+";
        const b = "[A-Za-z]+";
        const c = "[0-9A-Za-z!@#$%^&*()_]{0,}";
        const RegExp1 = new RegExp(
            `(${a + b + c})|(${a + c + b})|(${b + a + c})|(${b + c + a})|(${c +
            a +
            b})|(${c + b + a})`
        );
        const RegExp2 = /^[\da-zA-Z~!@#$%^&*]+$/;
        const RegExp3 = /^(?=.*\d)(?=.*[a-zA-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*]+$/;
        const RegExp4 = /^(?=.*\d)(?=.*?[a-z])(?=.*?[A-Z])(?=.*[~!@#$%^&*])[\da-zA-Z~!@#$%^&*]+$/;
        const objTitleArr = [
            {
                value: "1",
                label: "必须混合使用字母和数字",
                RegExp: RegExp1
            },
            {
                value: "2",
                label: "只允许输入大小写字母、数字或特殊字符",
                RegExp: RegExp2
            },
            {
                value: "3",
                label: "必须为字母、数字、特殊字符组合",
                RegExp: RegExp3
            },
            {
                value: "4",
                label: "必须为大写字母、小写字母、数字、特殊字符组合",
                RegExp: RegExp4
            }
        ];
        const newUserPwdComplexity = String(userPwdComplexity);

        if (value) {
            //检查输入字符
            let checkInput = null;
            let fitlerArr = objTitleArr.filter(
                item => item.value === newUserPwdComplexity
            );

            if (fitlerArr.length > 0) {
                checkInput = fitlerArr[0].RegExp.test(value);
            }
            const result = {
                check: checkInput,
                tip: fitlerArr[0].label
            };
            return result;
        }
        return false;
    },
    /*
    用户名
    只允许输入字母或数字
    */
    userNameReg: /^[A-Za-z0-9]+$/,
    validUserName(str) {
        return this.userNameReg.test(str);
    },
};