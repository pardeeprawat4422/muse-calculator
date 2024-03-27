
import Login from '../pages/auth/Login/Login';

export const ENUMFORSTATUS = {
  PENDING: "Pending",
  INPROGRESS: "Inprogress",
  COMPLETED: "Completed",
  INCOMPLETE: "Incomplete",
} as const;


export const ENUMFORSTONEMASTERTAB = {
  LOTSIZE: "LOTSIZE",
  ARTICLE: "ARTICLE",
  SIEVES: "SIEVES",
  LOT: "LOT",

}



export const ENUMFORROUTES = {

  DASHBOARD: "/dashboard",
  HOME: "/home",
  REPORTS: "/reports",
  LOGIN: "/login",
  ACCESS_DENIED: "/access-denied",
  USER_MANGEMNET: "/user-mangemnet",

}




export const ENUMFORACCOUNTTAB = {
  PERSONAL_DETAILS: "Personal Details",
  UPDATE_PASSWORD: "Update Password"

} as const;
export interface ResponseWrapperDTO {
  status: string;
  message: string;
  data: any;
  path?: string;
  error: boolean;
  access_token?: string;
  token_type?: string;
  expires_in?: number;
  account?: string;
}

export interface PageRequest {
  pageNo: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: string;
  searchText?: string;
  ids?: any;
}

export interface CommonProps {
  className: string | undefined;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  searchTxt: string | undefined;
  value: string | number | readonly string[] | undefined;
}

export interface ModalContextProps {
  modal: boolean;
  handleModal: (content?: any, value?: any, dismissModal?: boolean) => void;
  modalContent: any;
  modalValue: any;
}

export interface RoutesList {
  path: string; // the url
  icon: JSX.Element;
  name: string; // name that appear in Sidebar
  exact: boolean;
}

export interface PaginationProps {
  onPageChange: any;
  totalCount: number;
  siblingCount?: 1 | undefined;
  currentPage: number;
  pageSize: number;
  className: string;
  onPageSizeChange: any;
  otherHtml?: any;
}

export interface ButtonProps {
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  className?: string;
  type?: "button" | "submit" | "reset" | undefined;
  text?: any;
  disabled?: any;
  icon?: JSX.Element;
  children?: any;
}


export interface RouterProps {
  component?: any;
  path: string;
  caseSensitive?: boolean;
  accessType?: any;
  url?: any;
}


export interface DropdownListFormat {
  label: string;
  value: any;
  sub?: Array<DropdownListFormat>;
  other?: any;
}

export interface Page {
  pageUrl: string;
  id: number;
  pageCode: string;
  status: number;
  accessType: string;
}
export interface Notification {
  id: any;
  notificationType: string;
  isNotification: boolean;
}

export interface LoginData {
  userEmail: string;
  password: string;

}


export const ENUMFORTAB = {
  ABOUTUS: "ABOUTUS",
  INCOME: "INCOME",
  CREDIT: "CREDIT",
  DEDUCTION: "DEDUCTION",
  RESULTS: "RESULTS"
}

export const ENUMFORPAGESABOUTUS = {
  MARITAL_STATUS: "MARITAL_STATUS",
  HOUSEHOLD: "HOUSEHOLD",
  SPONSE: "SPONSE",
  AGE: "AGE",
  TOTAL_JOB: "TOTAL_AGE",
  PAID_YEARLY: "PAID_YEARLY",
  JOBDESC: "JOBDESC",
  LEAVE_JOB: "LEAVE_JOB",
  PRIOR_JOB: "PRIOR_JOB",
  SIMILAR_JOB: "SIMILAR_JOB",
  SPOUSE_JOB: "SPOUSE_JOB",
  SPOUSE_AGE: "SPOUSE_AGE"
}

export const ENUMFORPAGESINCOME = {
  ACCOUNTING_TYPE: "ACCOUNTING_TYPE",
  INTEREST: "INTEREST",
  DIVIDEND: "DIVIDEND",
  RETIREMENT: "RETIREMENT",
  SELF_EMPLOYEEMENT: "SELF_EMPLOYEEMENT",
  UNEMPLOYEMENT: "UNEMPLOYEMENT",
  NONEAPPLY: "NONEAPPLY",

}

export const ENUMFORPAGESCREDIT = {
  DEPENDENTS: "DEPENDENTS",
  DEPENDENT_INFO: "DEPENDENT_INFO",
  HOUSEHOLD: "HOUSEHOLD",
  OTHER_CREDIT: "OTHER_CREDIT",
}

export const ENUMFORPAGESDEDUCTION = {
  STANDERD_DEDUCTION: "STANDERD_DEDUCTION",
  DEDUCTION_TYPE: "DEDUCTION_TYPE",
  NON_APPLY: "NON_APPLY",
  HOME_MORTAGAGE: "HOME_MORTAGAGE",
  CHARITABLE: "CHARITABLE",
  LOCAL_TAX: "LOCAL_TAX",
  MEDICAL: "MEDICAL",
  STUDENT: "STUDENT",
  IRA: "IRA",
  OTHER: "OTHER"
}

export const ENUMFORPAGESRESULT = {
  FINISH: "FINISH"
}

export const MARITALSTATUS = {
  SINGLE: "FINISH",
  MERRIED: "MERRIED"
}

export const HOUSEHOLD = {
  TRUE: "TRUE",
  FALSE: "FALSE"
}

export const SPOUSE = {
  TRUE: "TRUE",
  FALSE: "FALSE"
}

export const LEAVEJOB = {
  TRUE: "TRUE",
  FALSE: "FALSE"
}

export const DEPENDENTS = {
  TRUE: "TRUE",
  FALSE: "FALSE"
}
export const STANDERD_DEDUCTION = {
  TRUE: "TRUE",
  FALSE: "FALSE"
}

export interface Questions {
  interest?: any,
  dividend?: any,
  retirement?: any;
  selfEmpNetProfit?: any;
  selfEmpQurtPayment?: any;
  unemployement?: any;
  dependentAge?: any;
  dependentStudent?: any;
  dependentDisable?: any;
  dependentLivesWithMe?: any;
  otherCredit?: any;
  homeMortagage?: any;
  charitable?: any;
  studentLoan?: any;
  IRA?: any;
  stateLocal?: any;
  medical?: any;
  other?: any;
  spouse_age?: any;
  priorJobCount?: any;
}