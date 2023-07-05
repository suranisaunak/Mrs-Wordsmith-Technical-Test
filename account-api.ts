import express, { Request, Response } from 'express';

interface Account {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
}

const accounts: Account[] = [];

const app = express();
app.use(express.json());

// Create a new account
app.post('/accounts', (req: Request, res: Response) => {
  const { name, address, phone, email } = req.body;

  const newAccount: Account = {
    id: Date.now().toString(),
    name,
    address,
    phone,
    email
  };

  accounts.push(newAccount);
  res.status(201).json(newAccount);
});

// Update an existing account
app.put('/accounts/:id', (req: Request, res: Response) => {
  const accountId = req.params.id;
  const { name, address, phone, email } = req.body;

  const account = accounts.find(acc => acc.id === accountId);
  if (!account) {
    return res.status(404).json({ message: 'Account not found' });
  }

  account.name = name || account.name;
  account.address = address || account.address;
  account.phone = phone || account.phone;
  account.email = email || account.email;

  res.json(account);
});

// Delete an account
app.delete('/accounts/:id', (req: Request, res: Response) => {
  const accountId = req.params.id;

  const accountIndex = accounts.findIndex(acc => acc.id === accountId);
  if (accountIndex === -1) {
    return res.status(404).json({ message: 'Account not found' });
  }

  const deletedAccount = accounts.splice(accountIndex, 1)[0];
  res.json(deletedAccount);
});

// Get account information
app.get('/accounts/:id', (req: Request, res: Response) => {
  const accountId = req.params.id;

  const account = accounts.find(acc => acc.id === accountId);
  if (!account) {
    return res.status(404).json({ message: 'Account not found' });
  }

  res.json(account);
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
