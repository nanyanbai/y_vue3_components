/**
 * @description: 驼峰转成横杠线连接
 * @param {string} value
 * @return {*}
 * */

export const camelToLine = (value: string) => {
  return value.replace(/([A-Z])g/, "-$1").toLocaleLowerCase();
};
