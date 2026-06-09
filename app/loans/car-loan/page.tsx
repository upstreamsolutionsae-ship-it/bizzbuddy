import { redirect } from "next/navigation";

// Car Loan has been replaced by the Working Capital Loans page.
// This redirect preserves any existing links/bookmarks to /loans/car-loan.
export default function CarLoanPage() {
  redirect("/loans/working-capital");
}
