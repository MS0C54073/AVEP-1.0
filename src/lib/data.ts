export type User = {
  id: string;
  name: string;
  email: string;
};

export type Account = {
  id: string;
  userId: string;
  type: "Checking" | "Savings" | "Investment" | "Corporate";
  bankName: string;
  accountNumber: string;
  balance: number;
  currency: string;
};

export type Transaction = {
  id: string;
  accountId: string;
  date: string;
  description: string;
  amount: number;
  category: string;
};

export type ManualAsset = {
    id: string;
    userId: string;
    category: "Vehicle" | "Electronics" | "Real Estate" | "Jewelry" | "Other";
    name: string;
    value: number;
    verificationStatus: "Pending" | "In Progress" | "Verified" | "Failed";
    verificationProgress: number;
}

export type Client = {
    id: string;
    name: string;
    contact: string;
    type: "Organization" | "Individual";
    status: "Active" | "Inactive";
    avatar: string;
}

export const user: User = {
  id: "user_1",
  name: "Alex Doe",
  email: "alex.doe@example.com",
};

export const accounts: Account[] = [
  {
    id: "acc_1",
    userId: "user_1",
    type: "Checking",
    bankName: "Capital One",
    accountNumber: "xxxx-xxxx-xxxx-1234",
    balance: 5420.55,
    currency: "USD",
  },
  {
    id: "acc_2",
    userId: "user_1",
    type: "Savings",
    bankName: "Chase Bank",
    accountNumber: "xxxx-xxxx-xxxx-5678",
    balance: 25000.0,
    currency: "USD",
  },
  {
    id: "acc_3",
    userId: "user_1",
    type: "Investment",
    bankName: "Fidelity",
    accountNumber: "xxxx-xxxx-xxxx-9012",
    balance: 125000.78,
    currency: "USD",
  },
    {
    id: "acc_4",
    userId: "user_1",
    type: "Corporate",
    bankName: "Bank of America",
    accountNumber: "xxxx-xxxx-xxxx-3456",
    balance: 750000.00,
    currency: "USD",
  },
];

export const transactions: Transaction[] = [
    { id: "tx_1", accountId: "acc_1", date: "2024-07-26", description: "Salary Deposit", amount: 4500.00, category: "Income" },
    { id: "tx_2", accountId: "acc_1", date: "2024-07-25", description: "Grocery Store", amount: -150.25, category: "Food" },
    { id: "tx_3", accountId: "acc_1", date: "2024-07-24", description: "Utility Bill", amount: -85.50, category: "Bills" },
    { id: "tx_4", accountId: "acc_2", date: "2024-07-23", description: "Transfer from Checking", amount: 1000.00, category: "Transfer" },
    { id: "tx_5", accountId: "acc_3", date: "2024-07-22", description: "Stock Purchase - AAPL", amount: -5000.00, category: "Investment" },
    { id: "tx_6", accountId: "acc_4", date: "2024-07-21", description: "Client Payment", amount: 25000.00, category: "Income" },
    { id: "tx_7", accountId: "acc_1", date: "2024-07-20", description: "Restaurant", amount: -75.00, category: "Food" },
    { id: "tx_8", accountId: "acc_4", date: "2024-07-19", description: "Software Subscription", amount: -250.00, category: "Business" },
];

export const manualAssets: ManualAsset[] = [
    { id: "mass_1", userId: "user_1", category: "Vehicle", name: "Honda Civic 2022", value: 22000, verificationStatus: "Verified", verificationProgress: 100 },
    { id: "mass_2", userId: "user_1", category: "Electronics", name: "MacBook Pro 16\"", value: 2500, verificationStatus: "In Progress", verificationProgress: 45 },
    { id: "mass_3", userId: "user_1", category: "Real Estate", name: "Downtown Apartment", value: 350000, verificationStatus: "Pending", verificationProgress: 10 },
];

export const clients: Client[] = [
    {
        id: "client-1",
        name: "Innovate Inc.",
        contact: "contact@innovate.com",
        type: "Organization",
        status: "Active",
        avatar: "https://picsum.photos/seed/client1/40/40"
    },
    {
        id: "client-2",
        name: "Jane Smith",
        contact: "jane.smith@email.com",
        type: "Individual",
        status: "Active",
        avatar: "https://picsum.photos/seed/client2/40/40"
    },
    {
        id: "client-3",
        name: "Tech Solutions Ltd.",
        contact: "support@techsolutions.com",
        type: "Organization",
        status: "Inactive",
        avatar: "https://picsum.photos/seed/client3/40/40"
    }
];


export const getAssetDataForAI = () => {
    let content = `User: ${user.name}, Email: ${user.email}\n\n`;
    content += "--- ACCOUNTS ---\n";
    accounts.forEach(acc => {
        content += `Bank: ${acc.bankName}, Type: ${acc.type}, Account No: ...${acc.accountNumber.slice(-4)}, Balance: ${acc.currency} ${acc.balance.toLocaleString()}\n`;
    });
    content += "\n--- RECENT TRANSACTIONS ---\n";
    transactions.slice(0, 5).forEach(tx => {
        const acc = accounts.find(a => a.id === tx.accountId);
        content += `Date: ${tx.date}, Desc: ${tx.description}, Amount: ${tx.amount.toLocaleString()}, Account: ${acc?.bankName} ...${acc?.accountNumber.slice(-4)}\n`;
    });

    return content;
}
