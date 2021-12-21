import { setting } from "@/config/default";
import { configUi } from "@/api/user";

const title = setting.systemName || "Vue Andt Admin";

export default function getPageTitle(pageTitle) {
  return new Promise((resolve, reject) => {
    configUi()
      .then(response => {
        let name = response.sdsName;
        resolve(`${pageTitle} - ${name}`);
      })
      .catch(error => {
        reject(`${pageTitle} - ${title}`);
      });
  });
}
