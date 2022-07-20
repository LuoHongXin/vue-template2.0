// 根据语言批量导入应用翻译文件
let zh_CNFiles = require.context('./zh_CN', false, /\.es.js$/);
let en_USFiles = require.context('./en_US', false, /\.es.js$/);

// langFiles 的 key 为切换 i18n locale 语言的依据
const langFiles = {
    zh_CN: zh_CNFiles,
    en_US: en_USFiles,
};

// 导出给 i18n 的 messages 配置对象
const i18nMessages = {};
for (let lang in langFiles) {
    i18nMessages[lang] = {};
    langFiles[lang].keys().forEach(key => {
        i18nMessages[lang][key.replace(/.\/|.es.js/gi, '')] = langFiles[lang](key).default;
    });
}
export default i18nMessages;