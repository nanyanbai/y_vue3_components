<template>
  <div class="container">
    <div class="flex">
      <div style="width: 300px">
        <p>普通菜单</p>
        <y-menu :data="data1" defaultActive="1" />
      </div>

      <div style="width: 300px">
        <p>无限菜单</p>
        <y-infinite-menu :data="data2" defaultActive="2" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const data1 = [
  {
    name: "导航1",
    index: "1",
    icon: "document",
  },
  {
    name: "导航2",
    index: "2",
    icon: "document",
  },
  {
    name: "导航3",
    index: "3",
    icon: "document",
    children: [
      {
        name: "导航3-1",
        index: "3-1",
        icon: "document",
      },
    ],
  },
];

const data2 = [
  {
    name: "导航1",
    index: "1",
    icon: "Document",
  },
  {
    name: "导航2",
    index: "2",
    icon: "Document",
  },
  {
    name: "导航3",
    index: "3",
    icon: "Document",
    children: [
      {
        name: "导航3-1",
        index: "3-1",
        icon: "Document",
        children: [
          {
            name: "导航3-1-1",
            index: "3-1-1",
            icon: "Document",
            children: [
              {
                name: "导航3-1-1-1",
                index: "3-1-1-1",
                icon: "Document",
                children: [
                  {
                    name: "导航3-1-1-1-1",
                    index: "3-1-1-1-1",
                    icon: "Document",
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
}
</style>
