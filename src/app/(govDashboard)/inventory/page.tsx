'use client'

import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import { Bell, ChevronDown, Package, TrendingUp, Users } from 'lucide-react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Mock data for charts and tables
const inventoryData = [
  { name: 'Stamps', current: 5000, previous: 4000 },
  { name: 'Postcards', current: 3000, previous: 3500 },
  { name: 'First Day Covers', current: 2000, previous: 1800 },
  { name: 'Miniature Sheets', current: 1500, previous: 1200 },
]

const salesData = [
  { month: 'Jan', sales: 4000 },
  { month: 'Feb', sales: 3000 },
  { month: 'Mar', sales: 5000 },
  { month: 'Apr', sales: 4500 },
  { month: 'May', sales: 6000 },
  { month: 'Jun', sales: 5500 },
]

const detailedInventory = [
  { id: 1, name: 'Commemorative Stamp Set', stock: 1000, sold: 800, remaining: 200 },
  { id: 2, name: 'Vintage Postcard Collection', stock: 500, sold: 450, remaining: 50 },
  { id: 3, name: 'Limited Edition First Day Cover', stock: 200, sold: 180, remaining: 20 },
  { id: 4, name: 'Rare Miniature Sheet', stock: 100, sold: 95, remaining: 5 },
]

export default function PhilatelyDashboard() {
  const [depositAccounts, setDepositAccounts] = useState(1000)
  const [interestRate, setInterestRate] = useState(5)

  const calculateNextProduction = () => {
    const baseProduction = depositAccounts * 10 // Assuming each account represents 10 items
    const adjustedProduction = baseProduction * (1 + interestRate / 100)
    return Math.round(adjustedProduction)
  }

  return (
    <div className="min-h-screen bg-[#FFF8E8]">
      {/* <header className="bg-[#674636] text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Philately Inventory Dashboard</h1>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="@username" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">username</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    user@example.com
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header> */}

      <main className="container mx-auto p-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className='bg-secondary text-white'>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Inventory
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">11,500</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
          <Card className='bg-white'>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Sales This Month
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5,500</div>
              <p className="text-xs text-muted-foreground">
                +15% from last month
              </p>
            </CardContent>
          </Card>
          <Card className='bg-secondary text-white'>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Deposit Accounts
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{depositAccounts}</div>
              <p className="text-xs text-muted-foreground">
                +2.5% from last month
              </p>
            </CardContent>
          </Card>
          <Card className='bg-white'>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Next Production
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{calculateNextProduction()}</div>
              <p className="text-xs text-muted-foreground">
                Based on current data
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
          <Card className="col-span-4 bg-white">
            <CardHeader>
              <CardTitle>Inventory Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={inventoryData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="current" fill="#674636" name="Current Stock" />
                  <Bar dataKey="previous" fill="#8884d8" name="Previous Stock" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="col-span-3 bg-white">
            <CardHeader>
              <CardTitle>Monthly Sales Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#674636" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-4 bg-white">
          <CardHeader>
            <CardTitle>Production Forecast Calculator</CardTitle>
            <CardDescription>Adjust parameters to calculate the next production quantity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-4">
              <div className="flex-1">
                <label htmlFor="deposit-accounts" className="text-sm font-medium">
                  Deposit Accounts
                </label>
                <Input
                  id="deposit-accounts"
                  type="number"
                  value={depositAccounts}
                  onChange={(e) => setDepositAccounts(Number(e.target.value))}
                />
              </div>
              <div className="flex-1">
                <label htmlFor="interest-rate" className="text-sm font-medium">
                  Interest Rate (%)
                </label>
                <Input
                  id="interest-rate"
                  type="number"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                />
              </div>
              {/* <div className="flex-1 flex items-end">
                <Button onClick={() => calculateNextProduction()}>
                  Calculate Production
                </Button>
              </div> */}
            </div>
            <div className="mt-4">
              <p className="text-lg font-semibold">
                Recommended Next Production: {calculateNextProduction()} units
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-4 bg-white">
          <CardHeader>
            <CardTitle>Detailed Inventory</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Total Stock</TableHead>
                  <TableHead>Sold</TableHead>
                  <TableHead>Remaining</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {detailedInventory.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>{item.stock}</TableCell>
                    <TableCell>{item.sold}</TableCell>
                    <TableCell>{item.remaining}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}