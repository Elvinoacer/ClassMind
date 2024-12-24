// import { communities } from './DUMMYDATA';
export const communitiesData = [
  {
    id: "MUMAIN",
    campus: "main",
    institutionName: "Moi University",
    courses: ["Computer Science", "Actuarial Science", "Statistics"], //make sure you update everytime you add new group
    courseCodes: ["CS", "AST", "STA", "CS"], //make sure you update everytime you add new group
    groups: ["2024", "2025", "2023", "2022", "2021", "2020"], //make sure you update everytime you add new group
    //what if this group moves to the second year
    // we have to update
    // update annually

    courseGroup: {
      id: "MUMAIN-CS-2024",
      courseName: "Computer Science",
      courseCode: "CS-2024", //

      students: [
        { name: "Elvin", email: "omondielvin@gmail.com", files: "" },
        { name: "Daniel", email: "danielKariuki@gmail.com", files: "" },
      ],
      units: [
        {
          unit: "ECE121",
          files: [],
        },
      ],
    },
  },
];

///////

export function generateCourseCode(courseName: string) {
  return courseName
    .split(" ")
    .map((cname) => cname[0])
    .join("");
}

interface CourseType {
  courseName: string;
  couseCode: string;
  students: StudentType[];
  files?: string[];
}

interface StudentType {
  // id: string;
  firstName: string;
  email: string;
  files?: [];
}

interface UnitType {
  unitName: string;
  files?: string[];
}

//must have add files method
// must have validation logic
// must have add unit method
//must have remove unit
// must have a way to remove files
// must have a way to identify by course codes

//we will loop through the individual files for each student and add them to the group

// soon we will  have to integrate payments in this system

interface CommunityType {
  id: string;
  institutionName: string;
  courses: string[];
  campus: string;
  courseCodes: string[];
  groups: string[];
  group: {
    courseName: string;
    students: StudentType[];
    units: UnitType[];
  };
}

const communities: CommunityType[] = [];

export class Community implements CommunityType {
  id: string;
  institutionName: string;
  courses: string[];
  campus: string;
  courseCodes: string[];
  group: {
    students: StudentType[];
    units: UnitType[];
    courseName: string;
    files?: string[];
  };
  groups: string[];
  constructor(community: CommunityType) {
    this.institutionName = community.institutionName;
    this.courses = community.courses;
    this.groups = community.groups;
    this.courseCodes = community.courseCodes;
    this.group = community.group;
    this.campus = community.campus;
    this.id = community.id;
  }

  addCommunity(communityInfo: CommunityType) {
    // validation before adding
    const existingCommunity = communities.find(
      (community) => community.id === communityInfo.id
    );
    if (existingCommunity) {
      return existingCommunity;
    }
    communities.push(communityInfo);
    return communityInfo;
  }

  deleteCommunity(id: string) {
    const communityToDelete = communities.find(
      (community) => community.id === id
    );

    if (communityToDelete) {
      const communityIndex = communities.indexOf(communityToDelete);
      communities.splice(communityIndex, 1);
      return `${communityToDelete.institutionName} Deleted Successfully`;
    }
  }
  // how are we going to add course
  addCourse(course: CourseType, institutionId: string) {
    const institution = communities.find(
      (community) => community.id === institutionId
    );
    // const;
  }

  addUnit(unit: UnitType, courseCode: string) {}
}

//Hierachy
// University
// courses
// units
//students

// Level 2

// function generateInstitutionId(){

// }

const course = {
  courseName: "Computer science",
  courseCode: "CS",
  groups: [
    {
      yearGroup: "2024",
      students: [
        {
          name: "Elvin",
          email: "elvin@gmail.com",
          files: "something from the server",
        },
        {
          name: "Jackie",
          email: "jackie@gmail.com",
          files: "something from the server",
        },
      ],
      unit: [{ unitName: "ECE121", files: ["something from the server"] }],
    },
  ],
};

const institution1 = [
  {
    institutionName: "Moi University",
    campus: "Main",
    institutionId: "somthingrandom",
    courses: [course],
  },
];

//define models

interface InstitutionType {
  institutionName: string;
  campus: string;
  institutionId: string;
  courses: InstitutionCourseType[];
}

interface InstitutionCourseType {
  courseName: string;
  courseCode: string;
  groups: InstitutionGroup[];
}

interface InstitutionGroup {
  yearGroup: string;
  students: StudentType[];
  units: UnitType2[];
}

interface UnitType2 {
  unitName: string;
  files?: string[];
}

class NewInstitution {
  institutions: InstitutionType[] = [];
  institution: NewInstitution;

  constructor(institution: InstitutionType) {
    this.institution = new NewInstitution(institution);
  }
}
export interface DummyUsersTye {
  unitName: string;
  files: {
    fileName: string;
    uploadedBy: string;
    uploadedWhen: string;
    fileSize: string;
  }[];
}
export const dummyUsers = [
  {
    unitName: "ECE121",
    files: [
      {
        fileName: "File1",
        uploadedBy: "Erick",
        uploadedWhen: "2023-12-23",
        fileSize: "23kb",
      },
      {
        fileName: "File2",
        uploadedBy: "Njuguna",
        uploadedWhen: "2023-02-23",
        fileSize: "2mb",
      },
      {
        fileName: "File3",
        uploadedBy: "Wariko",
        uploadedWhen: "2023-02-24",
        fileSize: "450kb",
      },
      {
        fileName: "File4",
        uploadedBy: "Julian",
        uploadedWhen: "2023-05-23",
        fileSize: "10mb",
      },
      {
        fileName: "File5",
        uploadedBy: "Paul",
        uploadedWhen: "2023-02-27",
        fileSize: "130kb",
      },
      {
        fileName: "File6",
        uploadedBy: "Kang'ethe",
        uploadedWhen: "2023-02-24",
        fileSize: "652kb",
      },
      {
        fileName: "File7",
        uploadedBy: "Brandon",
        uploadedWhen: "2023-08-23",
        fileSize: "130kb",
      },
      {
        fileName: "File8",
        uploadedBy: "Wangui",
        uploadedWhen: "2023-04-23",
        fileSize: "201kb",
      },
      {
        fileName: "File9",
        uploadedBy: "Julias",
        uploadedWhen: "2023-05-23",
        fileSize: "20mb",
      },
      {
        fileName: "File10",
        uploadedBy: "Kamau",
        uploadedWhen: "2023-01-23",
        fileSize: "12mb",
      },
      {
        fileName: "File11",
        uploadedBy: "Devid",
        uploadedWhen: "2023-02-25",
        fileSize: "65kb",
      },
    ],
  },
  //SECOND
  {
    unitName: "STA122",
    files: [
      {
        fileName: "File1",
        uploadedBy: "Erick",
        uploadedWhen: "2023-12-23",
        fileSize: "23kb",
      },
      {
        fileName: "File2",
        uploadedBy: "Njuguna",
        uploadedWhen: "2023-02-23",
        fileSize: "2mb",
      },
      {
        fileName: "File3",
        uploadedBy: "Wariko",
        uploadedWhen: "2023-02-24",
        fileSize: "450kb",
      },
      {
        fileName: "File4",
        uploadedBy: "Julian",
        uploadedWhen: "2023-05-23",
        fileSize: "10mb",
      },
      {
        fileName: "File5",
        uploadedBy: "Paul",
        uploadedWhen: "2023-02-27",
        fileSize: "130kb",
      },
      {
        fileName: "File6",
        uploadedBy: "Kang'ethe",
        uploadedWhen: "2023-02-24",
        fileSize: "652kb",
      },
      {
        fileName: "File7",
        uploadedBy: "Brandon",
        uploadedWhen: "2023-08-23",
        fileSize: "130kb",
      },
      {
        fileName: "File8",
        uploadedBy: "Wangui",
        uploadedWhen: "2023-04-23",
        fileSize: "201kb",
      },
      {
        fileName: "File9",
        uploadedBy: "Julias",
        uploadedWhen: "2023-05-23",
        fileSize: "20mb",
      },
      {
        fileName: "File10",
        uploadedBy: "Kamau",
        uploadedWhen: "2023-01-23",
        fileSize: "12mb",
      },
      {
        fileName: "File11",
        uploadedBy: "Devid",
        uploadedWhen: "2023-02-25",
        fileSize: "65kb",
      },
    ],
  },
  //THIRD
  {
    unitName: "ECE122",
    files: [
      {
        fileName: "File1",
        uploadedBy: "Erick",
        uploadedWhen: "2023-12-23",
        fileSize: "23kb",
      },
      {
        fileName: "File2",
        uploadedBy: "Njuguna",
        uploadedWhen: "2023-02-23",
        fileSize: "2mb",
      },
      {
        fileName: "File3",
        uploadedBy: "Wariko",
        uploadedWhen: "2023-02-24",
        fileSize: "450kb",
      },
      {
        fileName: "File4",
        uploadedBy: "Julian",
        uploadedWhen: "2023-05-23",
        fileSize: "10mb",
      },
      {
        fileName: "File5",
        uploadedBy: "Paul",
        uploadedWhen: "2023-02-27",
        fileSize: "130kb",
      },
      {
        fileName: "File6",
        uploadedBy: "Kang'ethe",
        uploadedWhen: "2023-02-24",
        fileSize: "652kb",
      },
      {
        fileName: "File7",
        uploadedBy: "Brandon",
        uploadedWhen: "2023-08-23",
        fileSize: "130kb",
      },
      {
        fileName: "File8",
        uploadedBy: "Wangui",
        uploadedWhen: "2023-04-23",
        fileSize: "201kb",
      },
      {
        fileName: "File9",
        uploadedBy: "Julias",
        uploadedWhen: "2023-05-23",
        fileSize: "20mb",
      },
      {
        fileName: "File10",
        uploadedBy: "Kamau",
        uploadedWhen: "2023-01-23",
        fileSize: "12mb",
      },
      {
        fileName: "File11",
        uploadedBy: "Devid",
        uploadedWhen: "2023-02-25",
        fileSize: "65kb",
      },
    ],
  },
  //FOURTH
  {
    unitName: "MATH101",
    files: [
      {
        fileName: "File1",
        uploadedBy: "Erick",
        uploadedWhen: "2023-12-23",
        fileSize: "23kb",
      },
      {
        fileName: "File2",
        uploadedBy: "Njuguna",
        uploadedWhen: "2023-02-23",
        fileSize: "2mb",
      },
      {
        fileName: "File3",
        uploadedBy: "Wariko",
        uploadedWhen: "2023-02-24",
        fileSize: "450kb",
      },
      {
        fileName: "File4",
        uploadedBy: "Julian",
        uploadedWhen: "2023-05-23",
        fileSize: "10mb",
      },
      {
        fileName: "File5",
        uploadedBy: "Paul",
        uploadedWhen: "2023-02-27",
        fileSize: "130kb",
      },
      {
        fileName: "File6",
        uploadedBy: "Kang'ethe",
        uploadedWhen: "2023-02-24",
        fileSize: "652kb",
      },
      {
        fileName: "File7",
        uploadedBy: "Brandon",
        uploadedWhen: "2023-08-23",
        fileSize: "130kb",
      },
      {
        fileName: "File8",
        uploadedBy: "Wangui",
        uploadedWhen: "2023-04-23",
        fileSize: "201kb",
      },
      {
        fileName: "File9",
        uploadedBy: "Julias",
        uploadedWhen: "2023-05-23",
        fileSize: "20mb",
      },
      {
        fileName: "File10",
        uploadedBy: "Kamau",
        uploadedWhen: "2023-01-23",
        fileSize: "12mb",
      },
      {
        fileName: "File11",
        uploadedBy: "Devid",
        uploadedWhen: "2023-02-25",
        fileSize: "65kb",
      },
    ],
  },
  //FIFTH
  {
    unitName: "CALC122",
    files: [
      {
        fileName: "File1",
        uploadedBy: "Erick",
        uploadedWhen: "2023-12-23",
        fileSize: "23kb",
      },
      {
        fileName: "File2",
        uploadedBy: "Njuguna",
        uploadedWhen: "2023-02-23",
        fileSize: "2mb",
      },
      {
        fileName: "File3",
        uploadedBy: "Wariko",
        uploadedWhen: "2023-02-24",
        fileSize: "450kb",
      },
      {
        fileName: "File4",
        uploadedBy: "Julian",
        uploadedWhen: "2023-05-23",
        fileSize: "10mb",
      },
      {
        fileName: "File5",
        uploadedBy: "Paul",
        uploadedWhen: "2023-02-27",
        fileSize: "130kb",
      },
      {
        fileName: "File6",
        uploadedBy: "Kang'ethe",
        uploadedWhen: "2023-02-24",
        fileSize: "652kb",
      },
      {
        fileName: "File7",
        uploadedBy: "Brandon",
        uploadedWhen: "2023-08-23",
        fileSize: "130kb",
      },
      {
        fileName: "File8",
        uploadedBy: "Wangui",
        uploadedWhen: "2023-04-23",
        fileSize: "201kb",
      },
      {
        fileName: "File9",
        uploadedBy: "Julias",
        uploadedWhen: "2023-05-23",
        fileSize: "20mb",
      },
      {
        fileName: "File10",
        uploadedBy: "Kamau",
        uploadedWhen: "2023-01-23",
        fileSize: "12mb",
      },
      {
        fileName: "File11",
        uploadedBy: "Devid",
        uploadedWhen: "2023-02-25",
        fileSize: "65kb",
      },
    ],
  },
  //SIXTH
  {
    unitName: "BIO256",
    files: [
      {
        fileName: "File1",
        uploadedBy: "Erick",
        uploadedWhen: "2023-12-23",
        fileSize: "23kb",
      },
      {
        fileName: "File2",
        uploadedBy: "Njuguna",
        uploadedWhen: "2023-02-23",
        fileSize: "2mb",
      },
      {
        fileName: "File3",
        uploadedBy: "Wariko",
        uploadedWhen: "2023-02-24",
        fileSize: "450kb",
      },
      {
        fileName: "File4",
        uploadedBy: "Julian",
        uploadedWhen: "2023-05-23",
        fileSize: "10mb",
      },
      {
        fileName: "File5",
        uploadedBy: "Paul",
        uploadedWhen: "2023-02-27",
        fileSize: "130kb",
      },
      {
        fileName: "File6",
        uploadedBy: "Kang'ethe",
        uploadedWhen: "2023-02-24",
        fileSize: "652kb",
      },
      {
        fileName: "File7",
        uploadedBy: "Brandon",
        uploadedWhen: "2023-08-23",
        fileSize: "130kb",
      },
      {
        fileName: "File8",
        uploadedBy: "Wangui",
        uploadedWhen: "2023-04-23",
        fileSize: "201kb",
      },
      {
        fileName: "File9",
        uploadedBy: "Julias",
        uploadedWhen: "2023-05-23",
        fileSize: "20mb",
      },
      {
        fileName: "File10",
        uploadedBy: "Kamau",
        uploadedWhen: "2023-01-23",
        fileSize: "12mb",
      },
      {
        fileName: "File11",
        uploadedBy: "Devid",
        uploadedWhen: "2023-02-25",
        fileSize: "65kb",
      },
    ],
  },
  //SEVENTH
  {
    unitName: "CHEM452",
    files: [
      {
        fileName: "File1",
        uploadedBy: "Erick",
        uploadedWhen: "2023-12-23",
        fileSize: "23kb",
      },
      {
        fileName: "File2",
        uploadedBy: "Njuguna",
        uploadedWhen: "2023-02-23",
        fileSize: "2mb",
      },
      {
        fileName: "File3",
        uploadedBy: "Wariko",
        uploadedWhen: "2023-02-24",
        fileSize: "450kb",
      },
      {
        fileName: "File4",
        uploadedBy: "Julian",
        uploadedWhen: "2023-05-23",
        fileSize: "10mb",
      },
      {
        fileName: "File5",
        uploadedBy: "Paul",
        uploadedWhen: "2023-02-27",
        fileSize: "130kb",
      },
      {
        fileName: "File6",
        uploadedBy: "Kang'ethe",
        uploadedWhen: "2023-02-24",
        fileSize: "652kb",
      },
      {
        fileName: "File7",
        uploadedBy: "Brandon",
        uploadedWhen: "2023-08-23",
        fileSize: "130kb",
      },
      {
        fileName: "File8",
        uploadedBy: "Wangui",
        uploadedWhen: "2023-04-23",
        fileSize: "201kb",
      },
      {
        fileName: "File9",
        uploadedBy: "Julias",
        uploadedWhen: "2023-05-23",
        fileSize: "20mb",
      },
      {
        fileName: "File10",
        uploadedBy: "Kamau",
        uploadedWhen: "2023-01-23",
        fileSize: "12mb",
      },
      {
        fileName: "File11",
        uploadedBy: "Devid",
        uploadedWhen: "2023-02-25",
        fileSize: "65kb",
      },
    ],
  },
  //EIGHTH
  {
    unitName: "PHYC202",
    files: [
      {
        fileName: "File1",
        uploadedBy: "Erick",
        uploadedWhen: "2023-12-23",
        fileSize: "23kb",
      },
      {
        fileName: "File2",
        uploadedBy: "Njuguna",
        uploadedWhen: "2023-02-23",
        fileSize: "2mb",
      },
      {
        fileName: "File3",
        uploadedBy: "Wariko",
        uploadedWhen: "2023-02-24",
        fileSize: "450kb",
      },
      {
        fileName: "File4",
        uploadedBy: "Julian",
        uploadedWhen: "2023-05-23",
        fileSize: "10mb",
      },
      {
        fileName: "File5",
        uploadedBy: "Paul",
        uploadedWhen: "2023-02-27",
        fileSize: "130kb",
      },
      {
        fileName: "File6",
        uploadedBy: "Kang'ethe",
        uploadedWhen: "2023-02-24",
        fileSize: "652kb",
      },
      {
        fileName: "File7",
        uploadedBy: "Brandon",
        uploadedWhen: "2023-08-23",
        fileSize: "130kb",
      },
      {
        fileName: "File8",
        uploadedBy: "Wangui",
        uploadedWhen: "2023-04-23",
        fileSize: "201kb",
      },
      {
        fileName: "File9",
        uploadedBy: "Julias",
        uploadedWhen: "2023-05-23",
        fileSize: "20mb",
      },
      {
        fileName: "File10",
        uploadedBy: "Kamau",
        uploadedWhen: "2023-01-23",
        fileSize: "12mb",
      },
      {
        fileName: "File11",
        uploadedBy: "Devid",
        uploadedWhen: "2023-02-25",
        fileSize: "65kb",
      },
    ],
  },
];
