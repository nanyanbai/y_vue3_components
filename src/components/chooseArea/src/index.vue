<template>
  <div class="choose-area">
    <el-select v-model="province" placeholder="请选择省份" clearable>
      <el-option
        v-for="item in areas"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      />
    </el-select>

    <el-select
      v-model="city"
      placeholder="请选择城市"
      clearable
      :disabled="!province"
    >
      <el-option
        v-for="item in selectCity"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      ></el-option>
    </el-select>

    <el-select
      v-model="area"
      placeholder="请选择地区"
      clearable
      :disabled="!province || !city"
    >
      <el-option
        v-for="item in selectArea"
        :key="item.code"
        :value="item.code"
        :label="item.name"
      ></el-option>
    </el-select>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

import allAreas from "../lib/pca-code.json";

export interface AreaItem {
  code: string;
  name: string;
  children?: AreaItem[];
}

export interface Data {
  name: string;
  code: string;
}

const province = ref<string>("");
const city = ref<string>("");
const area = ref<string>("");

const areas = ref<any>(allAreas);

const selectCity = ref<AreaItem[]>([]);

const selectArea = ref<AreaItem[]>([]);

const emits = defineEmits(["change"]);

watch(
  () => province.value,
  (val) => {
    if (val) {
      selectCity.value = areas.value.find(
        (item: any) => item.code === province.value
      )!.children;
    }
    city.value = "";
    area.value = "";
  }
);

watch(
  () => city.value,
  (val) => {
    if (val) {
      selectArea.value = selectCity.value.find(
        (item: any) => item.code === city.value
      )!.children!;
    }
    area.value = "";
  }
);

watch(
  () => area.value,
  (val) => {
    if (val) {
      let provinceData: Data = {
        code: province.value,
        name:
          province.value &&
          allAreas.find((item) => item.code === province.value)!.name,
      };
      let cityData: Data = {
        code: city.value,
        name:
          city.value &&
          selectCity.value.find((item) => item.code === city.value)!.name,
      };
      let areaData: Data = {
        code: val,
        name: val && selectArea.value.find((item) => item.code === val)!.name,
      };
      emits("change", {
        province: provinceData,
        city: cityData,
        area: areaData,
      });
    }
  }
);
</script>

<style scoped>
.choose-area {
  display: flex;
  gap: 10px;
}
select {
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
}
</style>
