<template>
  <section v-if="dataThere">
    <section v-if="empD == 0">
      <div
        v-if="changeD.length == 0"
        class="w-full flex items-center justify-center flex-col"
      >
        <img class="w-20" src="../../../assets/data-loss.png" alt="no data" />
        <p class="text-xl font-semibold text-center mt-2">
          No Data has been filled by the user.
        </p>
      </div>
      <div v-else class="grid grid-cols-3 gap-3">
        <div class="form-control">
          <label class="label">
            <span
              class="label-text font-bold tracking-tight leading-tight text-white"
              >Name</span
            >
          </label>
          <div class="flex items-center">
            <input
              type="text"
              class="input input-bordered w-full border-theme-green focusring input-sm"
              :value="changeD[0].Candidate_name"
              readonly
            />
          </div>
        </div>
        <div class="form-control">
          <label class="label">
            <span
              class="label-text font-bold tracking-tight leading-tight text-white"
              >Father's / Husband Name</span
            >
          </label>
          <div class="flex items-center">
            <input
              type="text"
              class="input input-bordered w-full border-theme-green focusring input-sm"
              :value="changeD[0].Father_Husband_Name"
              readonly
            />
          </div>
        </div>
        <div class="form-control row-span-2">
          <label class="label">
            <span
              class="label-text font-bold tracking-tight leading-tight text-white"
              >Address</span
            >
          </label>
          <div class="flex items-center">
            <textarea
              type="text"
              class="textarea w-full h-32 textarea-bordered border-theme-green focusring"
              :value="
                changeD[0].Present_Address1 +
                '\n' +
                changeD[0].Present_Address2 +
                '\n' +
                changeD[0].Present_Address3
              "
              readonly
            ></textarea>
          </div>
        </div>
        <!-- <div class="form-control">
          <label class="label">
            <span
              class="
                label-text
                font-bold
                tracking-tight
                leading-tight
                text-white
              "
              >Mail ID</span
            >
          </label>
          <div class="flex items-center">
            <input
              type="email"
              class="
                input input-bordered
                w-full
                border-theme-green
                focusring
                input-sm
              "
              readonly
            />
          </div>
        </div> -->
        <div class="form-control">
          <label class="label">
            <span
              class="label-text font-bold tracking-tight leading-tight text-white"
              >Mobile Number</span
            >
          </label>
          <div class="flex items-center">
            <input
              type="number"
              class="input input-bordered w-full border-theme-green focusring input-sm"
              :value="changeD[0].Candidate_mobileno"
              readonly
            />
          </div>
        </div>
        <div class="form-control">
          <label class="label">
            <span
              class="label-text font-bold tracking-tight leading-tight text-white"
              >Marital Status</span
            >
          </label>
          <div class="flex items-center">
            <input
              type="text"
              class="input input-bordered w-full border-theme-green focusring input-sm"
              :value="changeD[0].Marital_status"
            />
          </div>
        </div>
      </div>
    </section>
    <section v-else-if="empD == 1">
      <div
        v-if="changeD.length == 0"
        class="w-full flex items-center justify-center flex-col"
      >
        <img class="w-20" src="../../../assets/data-loss.png" alt="no data" />
        <p class="text-xl font-semibold text-center mt-2">
          No Data has been filled by the user.
        </p>
      </div>
      <table v-else class="table w-full table-compact table-zebra">
        <thead>
          <tr class="bg-gray-300 text-gray-700 font-extrabold">
            <th>Id</th>
            <th>From</th>
            <th>To</th>
            <th>Institution</th>
            <th>Degree / Diplomo</th>
            <th>Major</th>
            <th>Percentage</th>
            <th>Grade</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="d in changeD" :key="d.Reg_id">
            <th>{{ d.Reg_id }}</th>
            <td>{{ d.From }}</td>
            <td>{{ d.To }}</td>
            <td>{{ d.Institution }}</td>
            <td>{{ d.Degree_Diplomo }}</td>
            <td>{{ d.Major }}</td>
            <td>{{ d.percentage }}</td>
            <td>{{ d.Grade }}</td>
          </tr>
        </tbody>
      </table>
    </section>
    <section v-else-if="empD == 2" class="">
      <div
        v-if="changeD.length == 0"
        class="w-full flex items-center justify-center flex-col"
      >
        <img class="w-20" src="../../../assets/data-loss.png" alt="no data" />
        <p class="text-xl font-semibold text-center mt-2">
          No Data has been filled by the user.
        </p>
      </div>
      <table v-else class="table w-full table-compact table-zebra">
        <thead>
          <tr class="bg-gray-300 text-gray-700 font-extrabold">
            <th>Id</th>
            <th>From</th>
            <th>To</th>
            <th>Organization</th>
            <th>Designation</th>
            <th>Nature of Duties</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="d in changeD" :key="d.Reg_id">
            <th>{{ d.Reg_id }}</th>
            <td>{{ d.From }}</td>
            <td>{{ d.To }}</td>
            <td>{{ d.Organization }}</td>
            <td>{{ d.Designation }}</td>
            <td>{{ d.Nature_of_Duties }}</td>
          </tr>
        </tbody>
      </table>
    </section>
    <section v-else-if="empD == 3">
      <div
        v-if="changeD.length == 0"
        class="w-full flex items-center justify-center flex-col"
      >
        <img class="w-20" src="../../../assets/data-loss.png" alt="no data" />
        <p class="text-xl font-semibold text-center mt-2">
          No Data has been filled by the user.
        </p>
      </div>
      <table v-else class="table w-full table-compact table-zebra">
        <thead>
          <tr class="bg-gray-300 text-gray-700 font-extrabold">
            <th>Id</th>
            <th>Language</th>
            <th>Read</th>
            <th>Speak</th>
            <th>Write</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="d in changeD" :key="d.Reg_id">
            <th>{{ d.Reg_id }}</th>
            <td>{{ d.Language }}</td>
            <td>{{ d.Read }}</td>
            <td>{{ d.Speak }}</td>
            <td>{{ d.Write }}</td>
          </tr>
        </tbody>
      </table>
    </section>
    <section v-else-if="empD == 4">
      <div
        v-if="changeD.length == 0"
        class="w-full flex items-center justify-center flex-col"
      >
        <img class="w-20" src="../../../assets/data-loss.png" alt="no data" />
        <p class="text-xl font-semibold text-center mt-2">
          No Data has been filled by the user.
        </p>
      </div>
      <div v-else class="grid grid-cols-3 gap-3">
        <div class="form-control">
          <label class="label">
            <span
              class="label-text font-bold tracking-tight leading-tight text-white"
              >Present Salary</span
            >
          </label>
          <div class="flex items-center">
            <input
              type="text"
              class="input input-bordered w-full border-theme-green focusring input-sm"
              readonly
              :value="changeD[0].Present_salary"
            />
          </div>
        </div>
        <div class="form-control">
          <label class="label">
            <span
              class="label-text font-bold tracking-tight leading-tight text-white"
              >Expected Salary</span
            >
          </label>
          <div class="flex items-center">
            <input
              type="text"
              class="input input-bordered w-full border-theme-green focusring input-sm"
              readonly
              :value="changeD[0].Expected_Salary"
            />
          </div>
        </div>
        <div class="form-control row-span-2">
          <label class="label">
            <span
              class="label-text font-bold tracking-tight leading-tight text-white"
              >Height</span
            >
          </label>
          <div class="flex items-center">
            <input
              type="text"
              class="input input-bordered w-full border-theme-green focusring input-sm"
              readonly
              :value="changeD[0].Height"
            />
          </div>
        </div>
        <div class="form-control">
          <label class="label">
            <span
              class="label-text font-bold tracking-tight leading-tight text-white"
              >Weight</span
            >
          </label>
          <div class="flex items-center">
            <input
              type="text"
              class="input input-bordered w-full border-theme-green focusring input-sm"
              readonly
              :value="changeD[0].Weight"
            />
          </div>
        </div>
        <div class="form-control">
          <label class="label">
            <span
              class="label-text font-bold tracking-tight leading-tight text-white"
              >Disability or Physical Defects</span
            >
          </label>
          <div class="flex items-center">
            <input
              type="text"
              class="input input-bordered w-full border-theme-green focusring input-sm"
              readonly
              :value="changeD[0].Other"
            />
          </div>
        </div>
      </div>
    </section>
  </section>
  <section v-else>Loading</section>
</template>

<script>
// import { onMounted } from "@vue/runtime-core";
import useEmp from "../../../composable/Emp/useEmp";

export default {
  name: "UserDetails",
  setup() {
    const { empD, changeD, dataThere } = useEmp();
    // onMounted(() => {
    //   if (dataThere.value) {
    //     console.log("mounted");
    //   }
    // });
    // console.log(dataThere.value);
    return {
      empD,
      changeD,
      dataThere,
    };
  },
};
</script>


<style scoped>
.table {
  border-collapse: separate;
}
</style>