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
export interface StudentDbType {
  id?: string;
  institutionGroupId: string;
  picture: string;
  email: string;
  firstname: string;
}

export interface Student {
  email: string;
  files?: File[];
  firstname: string;
  id: string;
  picture?: string;
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

export interface InstitutionGroup {
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

export interface InstitutionCourse {
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

export interface KindeUser {
  id: string;
  email: string;
  family_name: string;
  given_name: string;
  picture?: string; //https://lh3.googleusercontent.com/a/ACg8ocLSWXqW0828q_IzxK6bQbVI-u9HZ3qblqe86csT5mIDI78bNS6a=s96-c --configure this in nextjs
  username?: string;
  phone_number?: string;
}

export interface MessageType {
  content: string;
  type: "text" | "server";
  own: boolean;
  picture?: string;
  studentId?: string;
  user: { name: string; id: string };
}

export interface ChatScreenProps {
  institutionGroupId: string;
  yearGroup: string;
  studentId: string;
  courseCode: string;
  picture?: string;
  studentname: string;
}

export interface UnitTypeDB {
  id?: string;
  institutionGroupId: string;
  unitname: string;
  files: FileTypeDB[];
}

export interface FileTypeDB {
  Student?: StudentDbType;
  actualFileSize: number;
  createdAt: string;
  favoritedBy: FavoritedBy[];
  filename: string;
  filesize: string;
  id?: string;
  groupId?: string;
  studentId: string;
  unitId: string;
  url: string;
}

export interface FavoritedBy {
  email: string;
  firstname: string;
  id?: string;
  institutionGroupId: string;
  picture?: string;
}
