---
layout: default
nav: Examples
title: "Examples"
description: "Frequently asked questions."
nav_order: 7
permalink: /docs/examples
---

# Examples
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---

## Show nights in tooltip

<div>
  <input id="input-eg-show-nights" class="form-control" style="width: 300px;margin: 15px 0" readonly/>
</div>
<div class="demo-wrapper" data-cfg="egShowNights"></div>  

```js
new Litepicker({
  element: document.getElementById('datepicker'),
  singleMode: false,
  tooltipText: {
    one: 'night',
    other: 'nights'
  },
  tooltipNumber: (totalDays) => {
    return totalDays - 1;
  }
})
```

## Allowed days instead of lock days

<div>
  <input id="input-eg-lock-days-filter" class="form-control" style="width: 300px;margin: 15px 0" readonly/>
</div>
<div class="demo-wrapper" data-cfg="egLockDaysFilter"></div>  

```js
const allowedDates = [
  '2021-02-01', '2021-02-05', '2021-02-08', 
  '2021-02-12', '2021-02-15', '2021-02-19',
];
new Litepicker({
  element: document.getElementById('datepicker'),
  singleMode: false,
  lockDaysFilter: (date1, date2, pickedDates) => {
    return !allowedDates.includes(date1.format('YYYY-MM-DD'));
  }
})
```

## Show previous month instead of current month

<div>
  <input id="input-eg-show-previous-month" class="form-control" style="width: 300px;margin: 15px 0" readonly/>
</div>
<div class="demo-wrapper" data-cfg="egShowPrevious"></div>  

```js
new Litepicker({
  element: document.getElementById('datepicker'),
  startDate: new Date(),
  setup: (picker) => {

    picker.on('show', () => {
      let date = picker.getDate();
      if (date) {
        date.setMonth(date.getMonth() - 1);
        picker.gotoDate(date);
      }
    });

  }
})
```

## Add Litepicker to NuxtJS project

- Download Litepicker from CDN: `https://cdn.jsdelivr.net/npm/litepicker/dist/litepicker.js`
- Place in `plugins` folder of your NuxtJS project.
- Update `nuxt.config.js`
```js
// nuxt.config.js
  plugins: [
    { src: '~/plugins/litepicker.js', mode: 'client' }
  ],
```
- Initialize Litepicker
```ts
// index.vue
export default {
    mounted: function () {
      new Litepicker({
        element: document.getElementById("datepicker"),
      });
    },
};
```