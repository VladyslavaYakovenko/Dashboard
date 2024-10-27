export interface visitorGraphData {
  name: string;
  value: number;
}

export interface weeklySalesAndExpenseGraphData {
  name: string;
  sales: number;
  expense: number;
}

export interface totalChargeAndProfitGraphData {
  name: string;
  charge: number;
  profit: number;
}

export interface CustomerRating {
  satisfied: number;
  awesome: number;
  average: number;
  poor: number;
}

export interface WebsiteTraffic {
  name: "registered" | "bounce" | "visitors";
  value: number;
}

export interface ProfileInfo {
  fullname: string;
  smallIntro: string;
  customers: string;
  products: string;
  followers: string;
  description: string;
}

export interface Account {
  fullname: string;
  location: string;
  online: boolean;
  messages: number;
}

export interface Data {
  totalSales: number;
  newQuote: number;
  orders: number;
  products: number;
  visitorsGraph: visitorGraphData[];
  weeklySalesAndExpense: weeklySalesAndExpenseGraphData[];
  totalChargeAndProfit: totalChargeAndProfitGraphData[];
  customerRatings: CustomerRating;
  votes: number;
  websiteTraffic: WebsiteTraffic[];
  pieText: string;
  profileInfo: ProfileInfo;
  account: Account;
}
