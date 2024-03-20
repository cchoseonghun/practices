const urls = [
  'https://www.google.com/',
  'https://linktr.ee/',
  'https://www.bexco.co.kr/',
  'https://m1033.my.eventmail01.com/',
  'https://specialtycoffee.my.site.com/',
  'https://sca.coffee/',
  'https://www.worldofcoffee.org/',
  'https://naver.com/',
  'https://www.bing.com/',
  'https://m.search.naver.com/',
  'https://asia.worldofcoffee.org/',
  'https://weixin110.qq.com/',
  'https://l.instagram.com/',
  'https://m.blog.naver.com/',
  'https://asia.worldofcoffee.org/attend',
  'http://instagram.com/',
  'https://stibee.com/',
  'https://asia.worldofcoffee.org/contact-us',
  'https://asia.worldofcoffee.org/reservation',
  'https://asia.worldofcoffee.org/wbc-2024',
  'https://asia.worldofcoffee.org/exhibitor-list',
  'https://korean.visitkorea.or.kr/detail/fes_detail.do?cotid=1736619e-3569-4bd3-9f29-bec061e0dfae',
  'https://www.worldofcoffee.co.kr/',
  'android-app://com.google.android.gm/',
  'https://busanwoc.imweb.me/',
  'https://asia.worldofcoffee.org/exhibitor-resources',
  'https://asia.worldofcoffee.org/floor-plan',
  'https://www.google.com.hk/',
  'https://www.ncausa.org/',
  'https://m.search.naver.com/search.naver?query=%EB%B6%80%EC%82%B0%EC%B9%B4%ED%8E%98%EC%87%BC&os=32833543&pkid=110'
];

const regex = /^(?!https?:\/\/).*/;
const data = regex.exec(urls);

console.log(data);