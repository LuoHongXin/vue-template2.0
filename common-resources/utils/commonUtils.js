export default {
  /**
   * @description 数组扁平化
   * @author luohongxin
   * @date 2/05/2022
   * @param {*} {
   *  带child为引用对象类型数组，不带child为普通数组扁平化
   * }
   * @return {*}
   */
  flatArr(arr = [], child) {
    if (child) {
      return arr.reduce((t, v) => { t.push(v); if (Array.isArray(v[child])) { t = t.concat(this.flatArr(v[child], child)); } return t; }
        , []);
    } else {
      return arr.reduce((t, v) => t.concat(Array.isArray(v) ? this.flatArr(v) : v)
        , []);
    }
  },

  /**
   * @description 根据数组对象中的某个属性进行分类
   * @author luohongxin
   * @date 2021-11-15
   * @export
   * @param {*} [arr=[]]
   * @param {*} key
   * @return {*}
   */
  splitArrGroup(arr = [], key) {
    return key
      ? arr.reduce(
        (t, v) => (!t[v[key]] && (t[v[key]] = []), t[v[key]].push(v), t),
        {}
      )
      : {};
  },
  /**
 * @description 数组去重，有key数组内是引用数据类型，无key则为基础数据类型
 * @author luohongxin
 * @date 29/09/2021
 * @export
 * @param {*} [arr=[]]
 * @param {*} key
 * @return {*} Array
 */
  uniqArr(arr = [], key) {
    if (key) {
      return arr.reduce((t, v) => {
        return t.some(o => o[key] === v[key]) ? t : [...t, v];
      }, []);
    } else {
      return arr.reduce((t, v) => (t.includes(v) ? t : [...t, v]), []);
    }
  },
  /**
* @description 递归树并返回目标节点的经历节点
* @author luohongxin
* @date 27/05/2022
* @param treeData - Array,
* @param targetKey - 目标值,
* @return {*} Array
*/
  getTreeParentKeys(treeData, targetKey, key = "key", children = "children") {
    return treeData.reduce((t, v) => {
      if (t.includes(targetKey)) return t;
      if (v[key] === targetKey) { t.push(v[key]); return t; }
      if ((!v[children] || !v[children].length === 0) && v[key] !== targetKey) return [];
      t.push(v[key]);
      let childKeys = this.getTreeParentKeys(v[children], targetKey, key, children);
      if (childKeys.length > 0) return t.concat(childKeys);
      return [];
    }, []);
  },
  /**
   * @description 大文件下载
   * @author luohongxin
   * @date 01/06/2022
   * @param url
   * @param iframeId
   * @param params
   */
  bigDataToDownload(url, iframeId, params,method="post") {
    let iframe = document.getElementById(iframeId);
    let body = document.body;
    if (iframe) {
      body.removeChild(iframe);
    }
    let newIframe = document.createElement("iframe");
    newIframe.id = iframeId;
    newIframe.frameborder = 0;
    newIframe.style = "display:none";
    newIframe.src = "about:blank";

    body.appendChild(newIframe);
    var dateId = new Date().getTime();
    // 请求地址直接写在 form 元素上
    var html =
      '<form action="' +
      url +
      '" method="'+method+'" target="_self" id="' +
      dateId +
      '">';
    // 传参则是在 input 元素上，有时还需要 token 参数
    for (let param in params) {
      html =
        html +
        "<input id='" +
        param +
        "' name='" +
        param +
        "' type='hidden' value='" +
        params[param] +
        "'/>";
    }
    html = html + "</form>";
    newIframe.contentWindow.document.write(html);
    newIframe
      .contentWindow.document.getElementById(dateId)
      .submit();
  },
  /**
   *深度拷贝对象或数组
    * @author luohongxin
    * @date 09/06/2022
   */
  deepCopy(obj) {
    if (typeof obj !== "object") return;
    var newObj = obj instanceof Array ? [] : {};
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        newObj[key] =
          typeof obj[key] === "object" ? this.deepCopy(obj[key]) : obj[key];
      }
    }
    return newObj;
  },
  /**
   * @description 触发a标签下载
   * @author luohongxin
   * @date 01/06/2022
   * @param url
   * @param iframeId
   * @param params
   */
  triggerClickTagA(url, fileName) {
    // 如果是在网页中可以直接创建一个 a 标签直接下载
    let a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
  },
};

