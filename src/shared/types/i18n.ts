// Internationalization types for Arabic/English support

export type Language = "en" | "ar";
export type Direction = "ltr" | "rtl";

export interface LocaleConfig {
  code: Language;
  name: string;
  nativeName: string;
  direction: Direction;
  flag: string;
}

export interface TranslationKeys {
  // Common
  "common.loading": string;
  "common.error": string;
  "common.success": string;
  "common.cancel": string;
  "common.save": string;
  "common.edit": string;
  "common.delete": string;
  "common.search": string;
  "common.filter": string;
  "common.apply": string;
  "common.reset": string;
  "common.ok": string;
  "common.confirm": string;
  "common.update": string;
  "common.create": string;
  "common.submit": string;
  "common.warning": string;
  "common.info": string;
  "common.close": string;
  "common.view": string;
  "common.back": string;
  "common.next": string;
  "common.previous": string;
  "common.home": string;
  "common.dashboard": string;
  "common.profile": string;
  "common.settings": string;
  "common.logout": string;
  "common.login": string;
  "common.register": string;

  // Auth
  "auth.login": string;
  "auth.register": string;
  "auth.logout": string;
  "auth.email": string;
  "auth.password": string;
  "auth.name": string;
  "auth.role": string;
  "auth.confirmPassword": string;
  "auth.employer": string;
  "auth.employee": string;
  "auth.admin": string;
  "auth.forgotPassword": string;
  "auth.rememberMe": string;
  "auth.loginTitle": string;
  "auth.loginSubtitle": string;
  "auth.registerTitle": string;
  "auth.registerSubtitle": string;
  "auth.alreadyHaveAccount": string;
  "auth.dontHaveAccount": string;
  "auth.signInHere": string;
  "auth.signUpHere": string;
  "auth.loginSuccess": string;
  "auth.logoutSuccess": string;
  "auth.registrationSuccess": string;
  "auth.invalidCredentials": string;
  "auth.emailRequired": string;
  "auth.passwordRequired": string;
  "auth.nameRequired": string;
  "auth.roleRequired": string;
  "auth.invalidEmail": string;
  "auth.passwordTooShort": string;
  "auth.passwordsDoNotMatch": string;
  "auth.accountExists": string;

  // Job
  "job.title": string;
  "job.location": string;
  "job.type": string;
  "job.experienceLevel": string;
  "job.minSalary": string;
  "job.maxSalary": string;
  "job.category": string;
  "job.deadline": string;
  "job.description": string;
  "job.requirements": string;
  "job.editJob": string;
  "job.updateJob": string;
  "job.saveAsDraft": string;
  "job.updateJobDetails": string;
  "job.enterJobTitle": string;
  "job.enterJobLocation": string;
  "job.selectJobType": string;
  "job.selectExperienceLevel": string;
  "job.selectDeadline": string;
  "job.describeRole": string;
  "job.listSkills": string;
  "job.categoryExample": string;
  "job.titleRequired": string;
  "job.titleMinLength": string;
  "job.titleMaxLength": string;
  "job.descriptionRequired": string;
  "job.descriptionMinLength": string;
  "job.descriptionMaxLength": string;
  "job.requirementsRequired": string;
  "job.requirementsMinLength": string;
  "job.requirementsMaxLength": string;
  "job.locationRequired": string;
  "job.locationMinLength": string;
  "job.locationMaxLength": string;
  "job.typeRequired": string;
  "job.invalidJobType": string;
  "job.categoryRequired": string;
  "job.categoryMinLength": string;
  "job.categoryMaxLength": string;
  "job.experienceLevelRequired": string;
  "job.invalidExperienceLevel": string;
  "job.salaryMinValidNumber": string;
  "job.salaryMaxValidNumber": string;
  "job.salaryMinGreaterThanZero": string;
  "job.salaryMaxGreaterThanZero": string;
  "job.salaryMaxGreaterThanMin": string;
  "job.deadlineFutureDate": string;
  "job.remoteWorkRequired": string;

  // Job Types
  "jobTypes.fullTime": string;
  "jobTypes.partTime": string;
  "jobTypes.contract": string;
  "jobTypes.internship": string;

  // Experience Levels
  "experienceLevels.entry": string;
  "experienceLevels.mid": string;
  "experienceLevels.senior": string;
  "experienceLevels.lead": string;

  // Messages
  "messages.jobUpdatedSuccessfully": string;
  "messages.jobSavedAsDraft": string;
  "messages.failedToUpdateJob": string;
  "messages.confirmDelete": string;
  "messages.operationSuccessful": string;
  "messages.operationFailed": string;

  // Navigation
  "navigation.home": string;
  "navigation.jobs": string;
  "navigation.companies": string;
  "navigation.about": string;
  "navigation.contact": string;
  "navigation.dashboard": string;
  "navigation.profile": string;
  "navigation.settings": string;
  "navigation.myJobs": string;
  "navigation.applications": string;
  "navigation.candidates": string;
  "navigation.analytics": string;
  "navigation.company": string;
  "navigation.createJob": string;
  "navigation.postJob": string;
  "navigation.savedJobs": string;
  "navigation.notifications": string;
  "navigation.messages": string;

  // Dashboard
  "dashboard.welcome": string;
  "dashboard.overview": string;
  "dashboard.statistics": string;
  "dashboard.recentActivity": string;
  "dashboard.quickActions": string;
  "dashboard.totalJobs": string;
  "dashboard.totalApplications": string;
  "dashboard.totalCandidates": string;
  "dashboard.totalCompanies": string;
  "dashboard.activeJobs": string;
  "dashboard.pendingApplications": string;
  "dashboard.newApplications": string;
  "dashboard.viewAll": string;
  "dashboard.noData": string;
  "dashboard.employerDashboard": string;
  "dashboard.employeeDashboard": string;
  "dashboard.adminDashboard": string;

  // Forms
  "forms.required": string;
  "forms.invalidEmail": string;
  "forms.invalidPhone": string;
  "forms.passwordTooShort": string;
  "forms.passwordsDoNotMatch": string;
  "forms.selectOption": string;
  "forms.enterText": string;
  "forms.selectDate": string;
  "forms.uploadFile": string;
  "forms.fileTooBig": string;
  "forms.invalidFileType": string;
  "forms.minLength": string;
  "forms.maxLength": string;
  "forms.minValue": string;
  "forms.maxValue": string;

  // Errors
  "errors.generic": string;
  "errors.networkError": string;
  "errors.serverError": string;
  "errors.unauthorized": string;
  "errors.forbidden": string;
  "errors.notFound": string;
  "errors.validationError": string;
  "errors.sessionExpired": string;

  // Legacy Jobs (for backward compatibility)
  "jobs.title": string;
  "jobs.search": string;
  "jobs.location": string;
  "jobs.type": string;
  "jobs.apply": string;
  "jobs.salary": string;
  "jobs.deadline": string;

  // Sidebar
  "sidebar.welcome": string;
  "sidebar.job_seeker": string;
  "sidebar.employer": string;
  "sidebar.sign_out": string;
  "sidebar.dashboard": string;
  "sidebar.messages": string;
  "sidebar.company_profile": string;
  "sidebar.all_applicants": string;
  "sidebar.job_listing": string;
  "sidebar.my_applications": string;
  "sidebar.saved_jobs": string;
  "sidebar.my_profile": string;
}

export type TranslationFunction = (
  key: keyof TranslationKeys,
  params?: Record<string, string | number>
) => string;
