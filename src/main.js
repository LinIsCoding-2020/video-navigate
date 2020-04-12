const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.last");
const urlString = localStorage.getItem("urlString");
const urlObject = JSON.parse(urlString);

const hashMap = urlObject || [
  { logo: "A", url: "https://www.acfun.cn" },
  { logo: "B", url: "https://www.bilibili.com" },
  { logo: "Y", url: "https://youku.com/" },
];

const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""); // 删除 / 开头的内容
};

const render = () => {
  $siteList.find("li:not(.last)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
        <div class="site">
          <div class="siteIcon">${node.logo}</div>
          <div class="siteUrl">${simplifyUrl(node.url)}</div>
          <div class="close">
            <svg class="icon">
              <use xlink:href="#icon-close"></use>
            </svg>
          </div>
        </div>
      </li>`).insertBefore($lastLi);
    $li
      .find(".siteIcon")
      .css("color", "#" + Math.floor(Math.random() * (2 << 23)).toString(16));
    $li.on("click", () => {
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation(); // 阻止冒泡
      hashMap.splice(index, 1);
      render();
    });
  });
};

render();

$(".addIcon").on("click", () => {
  let url = window.prompt("请输入您想添加的网址");
  if (url.indexOf("http") !== 0) {
    url = "https://" + url;
  }
  console.log(url);
  let logo = simplifyUrl(url)[0].toUpperCase();
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url,
  });
  render();
});

window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  localStorage.setItem("urlString", string);
};
