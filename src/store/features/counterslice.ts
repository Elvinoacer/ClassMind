import {
  File,
  FormTypesNav,
  InstitutionCourse,
  InstitutionGroup,
  InstitutionType,
  SideBar,
  Student,
  StudentDetails,
  Unit,
} from "@/types/prismatypes";
import { createSlice } from "@reduxjs/toolkit";

interface State {
  displayFull: boolean;
  pdf: string;
  toggleMenu: boolean;
  favoriteFiles: [];
  indexFileNav: number | undefined;
  navSideBar: SideBar;
  navFormRegister: FormTypesNav;
  institution: InstitutionType;
  course: InstitutionCourse;
  group: InstitutionGroup;
  Student: Student;
  Units: Unit[];
  openModal: boolean;
  file: File;
  groupId: string;
  uniSelectionIndex: { index?: number; id: string };
  noNextAllow: boolean;
  uploadOption: "class-store" | "my-store";
}

const initialState: State = {
  displayFull: false,
  favoriteFiles: [],
  pdf: "",
  indexFileNav: undefined,
  navSideBar: SideBar.dashboard,
  navFormRegister: FormTypesNav.institution,
  toggleMenu: false,
  openModal: false,

  institution: {
    institutionName: "",
    logo: "",
    image: "",
    campus: "",
  },
  course: {
    coursecode: "",
    coursename: "",
    institutionId: "",
  },
  group: {
    institutionCourseId: "",
    yeargroup: "",
  },
  Units: [],

  Student: {
    email: "",
    institutionGroupId: "",
    firstname: "",
    files: [],
    id: "",
  },
  file: {
    filename: "",
    filesize: "",
    unitId: "",
    studentId: "",
  },
  uniSelectionIndex: {
    index: 0,
    id: "",
  },
  groupId: "",
  noNextAllow: false,
  uploadOption: "class-store",
};

const counterSlice = createSlice({
  initialState,
  name: "counter",
  reducers: {
    addPDF: (state, action) => {
      state.pdf = action.payload;
    },
    setIndexFileNav: (state, action: { payload: number | undefined }) => {
      state.indexFileNav = action.payload;
    },

    setDisplayFull: (state, action) => {
      state.displayFull = action.payload;
    },
    navigateSideBar: (state, action) => {
      state.navSideBar = action.payload;
    },
    navigateRegisterInstitution: (
      state,
      { payload }: { payload: FormTypesNav }
    ) => {
      state.navFormRegister = payload;
    },
    addUnits: (state, { payload }: { payload: Unit }) => {
      state.Units.push(payload);
    },
    addInstitution: (state, { payload }: { payload: InstitutionType }) => {
      state.institution = payload;
    },

    addFavoriteFile: (state, { payload }) => {
      const existingFav = state.favoriteFiles.find(
        (item) => item.id === payload.id
      );
      if (existingFav) {
        const files = state.favoriteFiles.filter(
          (item) => item.id !== existingFav.id
        );
        state.favoriteFiles = files;
      } else {
        state.favoriteFiles.push(payload);
      }
    },

    addCourse: (state, { payload }: { payload: InstitutionCourse }) => {
      state.course = payload;
    },
    toggleMenu: (state, { payload }: { payload: boolean }) => {
      state.toggleMenu = payload;
    },
    addGroup: (state, { payload }: { payload: InstitutionGroup }) => {
      state.group = payload;
    },
    openModal: (state, { payload }: { payload: boolean }) => {
      state.openModal = payload;
    },
    addGroupId: (state, { payload }: { payload: string }) => {
      state.groupId = payload;
    },
    addUnit: (state, { payload }: { payload: Unit }) => {
      state.Unit = payload;
    },
    addStudent: (state, { payload }: { payload: Student }) => {
      state.Student = payload;
    },
    addFile: (state, { payload }: { payload: File }) => {
      state.file = payload;
    },
    setUniSelectionIndex: (
      state,
      { payload }: { payload: State["uniSelectionIndex"] }
    ) => {
      state.uniSelectionIndex = { ...payload };
    },
    setNoNextAllow: (state, { payload }: { payload: boolean }) => {
      state.noNextAllow = payload;
    },
    setUploadOption: (
      state,
      { payload }: { payload: State["uploadOption"] }
    ) => {
      state.uploadOption = payload;
    },
  },
});

export const {
  addPDF,
  addFavoriteFile,

  setIndexFileNav,
  setDisplayFull,
  navigateSideBar,
  navigateRegisterInstitution,
  addCourse,
  toggleMenu,
  addGroupId,

  addGroup,
  addInstitution,
  addUnit,
  addUnits,
  addStudent,
  openModal,
  addFile,
  setUniSelectionIndex,
  setNoNextAllow,
  setUploadOption,
} = counterSlice.actions;
export default counterSlice.reducer;

export type uploadOptionType = State["uploadOption"];
