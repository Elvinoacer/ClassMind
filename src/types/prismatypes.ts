export interface InstitutionType {
  id?: string;
  institutionName: string;
  logo: string;
  image: string;
  campus?: string;
  courses?: InstitutionCourse[];
}

export enum SideBar {
  dashboard = "dashboard",
  mystore = "mystore",
  classstore = "classstore",
  communities = "communities",
  pdfChat = "pdfChat",
}

export enum FormTypesNav {
  institution = "institution",
  course = "course",
  group = "group",
  unit = "unit",
}

export interface Student {
  email: string;
  files?: File[];
  firstname: string;
  id: string;
  InstitutionGroup?: InstitutionGroup;
  institutionGroupId?: string;
}

// export interface FileType {
//   createdAt: string;
//   filename: string;
//   filesize: string;
//   id: string;
//   studentId: string;
//   unitId: string;
//   url: string;
// }

export interface FileType {
  actualFileSize: number;
  createdAt: string; // ISO 8601 date-time string
  filename: string;
  filesize: string; // Likely a human-readable file size string
  id: string; // Likely a UUID string
  studentId: string; // Likely a UUID string
  unitId: string; // Likely a UUID string
  url: string;
}

export interface FavoriteFile extends FileType {
  actualFileSize: number;
  createdAt: string; // ISO 8601 date-time string
  filename: string;
  filesize: string; // Likely a human-readable file size string
  id: string; // Likely a UUID string
  studentId: string; // Likely a UUID string
  unitId: string; // Likely a UUID string
  url: string;
  favoritedBy: Student[];
  Student: Student;
}
// const imh={actualFileSize
// :
// 0,
// createdAt
// :
// "2024-12-22T15:33:43.930Z",
// filename
// :
// "M-PESA Business Admin Form 2023 V2 (1)",
// filesize
// :
// "277.694 KB",
// id
// :
// "00d4199c-3374-4f29-a0c0-30b4db844967",
// studentId
// :
// "6b719f9d-b24d-4d01-a105-0f50fe9eedda",
// unitId
// :
// "ea011b96-f664-4a26-897f-3963b135f2f6",
// url
// :
// "https://classmind-images.s3.amazonaws.com/elvinTrial/M-PESA Business Admin Form 2023 V2 (1).pdf"}
interface InstitutionGroup {
  id: string;
  InstitutionCourse: InstitutionCourse;
  institutionCourseId: string;
  units: Unit[];
  yeargroup: string;
}

export interface Unit {
  id?: string;
  institutionGroupId: string;
  unitname: string;
  files?: FileType[];
}

interface InstitutionCourse {
  campusId: null | string;
  coursecode: string;
  coursename: string;
  groups?: InstitutionGroup[];
  id: string;
  Institution: Institution;
  institutionId: string;
}

interface Institution {
  id: string;
  institutionName: string;
  logo: string;
  image: string;
}

export interface StudentDetails {
  id: string;
  institutionGroupId: string;
  email: string;
  firstname: string;
  InstitutionGroup: InstitutionGroup;
  files: FileType[];
}

export interface DBdataType {
  id: string;
  studentId: string;
  unitId: string;
  url: string;
  filename: string;
  createdAt: string;
  filesize: string;
}

export interface FileContent {
  Student: Student;
  actualFileSize: number;

  createdAt: string;
  filename: string;
  filesize: string;
  id: string;
  studentId: string;
  unitId: string;
  url: string;
}

// IncomingUnitType
export interface UnitType {
  files: FileTypeR[];
  unitname: string;
  institutionGroupId: string;
  id: string;
}

export interface FileTypeR {
  Student: Student;
  actualFileSize: number;
  createdAt: string;
  favoritedBy: Student[];
  filename: string;
  filesize: string;
  id: string;
  studentId: string;
  unitId: string;
  url: string;
}
