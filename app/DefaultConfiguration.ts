import IConfiguration from "./models/IConfiguration";

const config: IConfiguration = {
  filters: {
    department: null,
    fieldOfStudy: null,
    degree: null,
    mode: null,
    semester: null,
    group: null,
    academicYear: null,
  },
  notifyAboutUpdates: true,
  allowQuickGroupChange: true,
  timetable: null,
};

export default config;
