<template>
  <div class="flex flex-col w-full gap-2 items-center justify-center">
    <div class="card border-2 border-green-500 flex flex-row w-full">
      <div class="card-body p-0 text-center">
        <div v-if="data">loading</div>
        <div v-else class="stat inline-block">
          <div class="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-8 h-8 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              ></path>
            </svg>
          </div>
          <div class="stat-title text-sm">Application</div>
          <div class="stat-value text-xl">
            {{ empStats[0].totalAppl }} Application
          </div>
          <!-- <div class="stat-desc text-success">↗︎ 400 (22%)</div> -->
        </div>
      </div>
      <div class="card-body p-0 text-center">
        <div v-if="data">loading</div>
        <div v-else class="stat inline-block">
          <div class="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-8 h-8 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              ></path>
            </svg>
          </div>
          <div class="stat-title text-sm">Qualification</div>
          <div class="stat-value text-xl">
            {{ empStats[0].totalQual }} Qualification
          </div>
          <!-- <div class="stat-desc text-success">↗︎ 400 (22%)</div> -->
        </div>
      </div>
    </div>

    <div class="card border-2 border-green-500 w-full flex flex-row">
      <div class="card-body p-0 text-center">
        <div v-if="data">loading</div>
        <div v-else class="stat inline-block">
          <div class="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-8 h-8 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              ></path>
            </svg>
          </div>
          <div class="stat-title text-sm">Language</div>
          <div class="stat-value text-xl">
            {{ empStats[0].totalLang }} Language
          </div>
          <!-- <div class="stat-desc text-success">↗︎ 400 (22%)</div> -->
        </div>
      </div>
      <div class="card-body p-0 text-center">
        <div v-if="data">loading</div>
        <div v-else class="stat inline-block">
          <div class="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-8 h-8 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              ></path>
            </svg>
          </div>
          <div class="stat-title text-sm">Others</div>
          <div class="stat-value text-xl">
            {{ empStats[0].totalOther }} Others
          </div>
          <!-- <div class="stat-desc text-success">↗︎ 400 (22%)</div> -->
        </div>
      </div>
      <div class="card-body p-0 text-center">
        <div v-if="data">loading</div>
        <div v-else class="stat inline-block">
          <div class="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              class="inline-block w-8 h-8 stroke-current"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
              ></path>
            </svg>
          </div>
          <div class="stat-title text-sm">Experience</div>
          <div class="stat-value text-xl">
            {{ empStats[0].totalExp }} Experience
          </div>
          <!-- <div class="stat-desc text-success">↗︎ 400 (22%)</div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import useStats from "../../composable/Emp/useEmpStats";
export default {
  setup() {
    const { empStats, data } = useStats();
    return {
      empStats,
      data,
    };
  },
};
</script>

<style>
</style>