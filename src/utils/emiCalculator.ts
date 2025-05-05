/**
 * Calculate EMI based on loan principal, interest rate, and loan term
 * @param principal Loan amount
 * @param interestRate Annual interest rate (%)
 * @param loanTerm Loan duration in years
 * @returns Monthly EMI amount
 */
export const calculateEMI = (
  principal: number,
  interestRate: number,
  loanTerm: number
): number => {
  // Convert annual interest rate to monthly rate (and from percentage to decimal)
  const monthlyRate = interestRate / 12 / 100;
  
  // Convert loan term from years to months
  const totalMonths = loanTerm * 12;
  
  // Apply EMI formula: EMI = P * r * (1+r)^n / ((1+r)^n - 1)
  const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths) / 
              (Math.pow(1 + monthlyRate, totalMonths) - 1);
  
  return emi;
};

/**
 * Generate amortization schedule
 * @param principal Loan amount
 * @param interestRate Annual interest rate (%)
 * @param loanTerm Loan duration in years
 * @returns Array of payment details for each month
 */
export const generateAmortizationSchedule = (
  principal: number,
  interestRate: number,
  loanTerm: number
) => {
  const emi = calculateEMI(principal, interestRate, loanTerm);
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = loanTerm * 12;
  
  const schedule = [];
  let balance = principal;
  
  for (let month = 1; month <= totalMonths; month++) {
    const interestForMonth = balance * monthlyRate;
    const principalForMonth = emi - interestForMonth;
    balance -= principalForMonth;
    
    schedule.push({
      month,
      payment: emi,
      principalPaid: principalForMonth,
      interestPaid: interestForMonth,
      remainingBalance: Math.max(0, balance)
    });
    
    if (balance <= 0) break;
  }
  
  return schedule;
};

/**
 * Calculate total payment and interest over the loan term
 * @param principal Loan amount
 * @param interestRate Annual interest rate (%)
 * @param loanTerm Loan duration in years
 * @returns Object containing totalPayment and totalInterest
 */
export const calculateTotals = (
  principal: number,
  interestRate: number,
  loanTerm: number
) => {
  const emi = calculateEMI(principal, interestRate, loanTerm);
  const totalMonths = loanTerm * 12;
  const totalPayment = emi * totalMonths;
  const totalInterest = totalPayment - principal;
  
  return { totalPayment, totalInterest };
};