import { Loan } from "./loan.model";
import { User } from "./user.model";

export interface LoanApplication {
    loanApplicationId?: number;
    userId?: number;
    loanId?: number;
    submissionDate: string;
    loanStatus: number;
    farmLocation: string,
    farmerAddress: string;
    farmSizeInAcres: number;
    farmPurpose: string;
    file: string;
    user:User;
    loan:Loan;
}
