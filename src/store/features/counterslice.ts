import {
  ChatScreenProps,
  FileTypeDB,
  FileTypeR,
  FormTypesNav,
  InstitutionCourse,
  InstitutionGroup,
  InstitutionType,
  SideBar,
  Student,
  Unit,
  UnitTypeDB,
} from "@/types/prismatypes";
import { createSlice } from "@reduxjs/toolkit";

interface State {
  displayFull: boolean;
  pdf: string;

  toggleMenu: boolean;
  favoriteFiles: FileTypeDB[];
  indexFileNav: number | undefined;
  navSideBar: SideBar;
  navFormRegister: FormTypesNav;
  institution: InstitutionType;
  course: InstitutionCourse;
  group: InstitutionGroup;
  Student: Student;
  chatscreen: ChatScreenProps;
  Units: Unit[];
  DBUnits: UnitTypeDB[];
  openModal: boolean;
  file: FileTypeR;
  groupId: string;
  uniSelectionIndex: { index?: number; id: string };
  noNextAllow: boolean;
  uploadOption: "class-store" | "my-store";
}

const initialState: State = {
  chatscreen: {
    courseCode: "",
    institutionGroupId: "",
    studentId: "",
    studentname: "",
    yearGroup: "",
    picture: "",
  },
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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  course: {
    coursecode: "",
    coursename: "",
    institutionId: "",
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
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
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
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
    addDBUnits: (state, { payload }: { payload: UnitTypeDB[] }) => {
      state.DBUnits = payload;
    },
    addDBUnit: (state, { payload }: { payload: UnitTypeDB }) => {
      state.DBUnits.push(payload);
    },
    addDBFile: (state, { payload }: { payload: FileTypeDB }) => {
      const unit = state.DBUnits.find((unit) => unit.id === payload.unitId);
      if (unit) {
        unit.files.push(payload);
      }
    },
    removeDBFile: (
      state,
      { payload }: { payload: { unitId: string; fileId: string } }
    ) => {
      const unit = state.DBUnits.find((unit) => unit.id === payload.unitId);
      if (unit) {
        const updatedFiles = unit.files.filter(
          (file) => file.id !== payload.fileId
        );
        unit.files = updatedFiles;
      }
    },
    addFavFiles: (state, { payload }: { payload: FileTypeDB[] }) => {
      state.favoriteFiles = payload;
    },
    addFavFile: (state, { payload }: { payload: FileTypeDB }) => {
      state.favoriteFiles.push(payload);
    },
    removeFavFile: (state, { payload }: { payload: string }) => {
      state.favoriteFiles = state.favoriteFiles.filter(
        (fav) => fav.id !== payload
      );
    },
    setDisplayFull: (state, action) => {
      state.displayFull = action.payload;
    },
    navigateSideBar: (state, action) => {
      state.navSideBar = action.payload;
    },
    addChatScreenProps: (state, { payload }: { payload: ChatScreenProps }) => {
      state.chatscreen = payload;
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
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        (item) => item.id === payload.id
      );
      if (existingFav) {
        const files = state.favoriteFiles.filter(
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          (item) => item.id !== existingFav.id
        );
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        state.favoriteFiles = files;
      } else {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
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
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      state.Unit = payload;
    },
    addStudent: (state, { payload }: { payload: Student }) => {
      state.Student = payload;
    },
    addFile: (state, { payload }: { payload: File }) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
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
  addDBUnits,
  addDBUnit,
  addDBFile,
  removeDBFile,
  addFavFile,
  removeFavFile,
  addPDF,
  addFavFiles,
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
  addChatScreenProps,
  setUniSelectionIndex,
  setNoNextAllow,
  setUploadOption,
} = counterSlice.actions;
export default counterSlice.reducer;

export type uploadOptionType = State["uploadOption"];
