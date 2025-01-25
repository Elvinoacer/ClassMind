export const dummyExample = {
  user: {
    id: "kp_37c14649453d4052b1267e2eea23f7ac",
    email: "omondielvin@gmail.com",
    family_name: "Omondi",
    given_name: "Elvin",
  },
};

export interface UserType {
  id: string;
  email: string | null;
  family_name: string | null;
  given_name: string | null;
}

// export function storeUserDetails(user: UserType) {
// const databaseData = {
//   id: user.id,
//   username: user.given_name,
//   email: user.email,
// };

// ///
///TODO MAKE JAVASCRIPT WORK WITH  NEXTJS
// const allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li a");

// allSideMenu.forEach((item) => {
//   const li = item.parentElement;

//   item.addEventListener("click", function () {
//     allSideMenu.forEach((i) => {
//       i.parentElement!.classList.remove("active");
//     });
//     li!.classList.add("active");
//   });
// });

// // TOGGLE SIDEBAR
// const menuBar = document.querySelector("#content nav .bx.bx-menu");
// const sidebar = document.getElementById("sidebar");

// menuBar!.addEventListener("click", function () {
//   sidebar!.classList.toggle("hide");
// });

// ///
// }
