"use client";
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DollarSign,
  TrendingUp,
  MoreVertical,
  FileText,
  ChevronRight,
  CreditCard,
  Wallet,
  Smartphone,
} from "lucide-react";

export default function FinancialDashboard() {
  const [invoices, setInvoices] = useState([
    {
      id: 420,
      name: "Brooklyn Simmons",
      status: "Paid",
      date: "Jun 5, 2024",
      amount: 4500,
      material: "Material 1",
    },
    {
      id: 421,
      name: "Jerome Bell",
      status: "Paid",
      date: "Jun 5, 2024",
      amount: 5000,
      material: "Material 2",
    },
    {
      id: 422,
      name: "Marvin McKinney",
      status: "Not Paid",
      date: "Jun 5, 2024",
      amount: 4500,
      material: "Material 3",
    },
    {
      id: 423,
      name: "Esther Howard",
      status: "Paid",
      date: "Jun 6, 2024",
      amount: 3800,
      material: "Material 4",
    },
    {
      id: 424,
      name: "Cameron Williamson",
      status: "Not Paid",
      date: "Jun 7, 2024",
      amount: 5200,
      material: "Material 5",
    },
  ]);

  const [paymentMethod, setPaymentMethod] = useState("mastercard");

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white">
          {" "}
          {/* Changed background to white */}
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <DollarSign className="text-gray-500" />
              <div className="flex items-center text-green-500">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>8.5%</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-500">
              Total Balance
            </h3>
            <p className="text-3xl font-bold">₹ 40,689.12</p>
          </CardContent>
        </Card>
        <Card className="bg-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <DollarSign className="text-gray-500" />
              <div className="flex items-center text-green-500">
                <TrendingUp className="w-4 h-4 mr-1" />
                <span>12.5%</span>
              </div>
            </div>
            <h3 className="text-lg font-semibold text-gray-500">Total Paid</h3>
            <p className="text-3xl font-bold">₹ 40,689.12</p>
          </CardContent>
        </Card>
        <Card className="bg-purple-50">
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold text-purple-700 mb-2">
              2 Due Payment
            </h3>
            <p className="text-3xl font-bold text-purple-900 mb-4">₹ 1230.45</p>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">
              Pay
            </Button>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-green-50">
        <CardContent className="p-6">
          <h3 className="text-sm font-semibold text-green-700 mb-2">
            4 Submissions
          </h3>
          <p className="text-3xl font-bold text-green-900 mb-4">₹ 4434.89</p>
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            Approve
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-12 h-8 bg-red-500 rounded-md mr-4"></div>
              <div>
                <p className="font-semibold">Mastercard</p>
                <p className="text-sm text-gray-500">Expiry Date: 12/2029</p>
              </div>
            </div>
            <div className="flex items-center ">
              <p className="mr-4">Number: 5344 **** **** 5755</p>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger className="w-[180px] bg-white">
                  {" "}
                  {/* Added bg-white here */}
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {" "}
                  {/* Added bg-white here */}
                  <SelectItem value="mastercard">
                    <div className="flex items-center ">
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Mastercard</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="wallet">
                    <div className="flex items-center">
                      <Wallet className="mr-2 h-4 w-4" />
                      <span>Digital Wallet</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="mobile">
                    <div className="flex items-center">
                      <Smartphone className="mr-2 h-4 w-4" />
                      <span>Mobile Payment</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-white">
        <CardContent className="p-6">
          <div className="overflow-x-auto">
            <div style={{ maxHeight: "400px", overflowY: "auto" }}>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px] sticky top-0 bg-background">
                      <Checkbox />
                    </TableHead>
                    <TableHead className="sticky top-0 bg-background">
                      Invoice
                    </TableHead>
                    <TableHead className="sticky top-0 bg-background">
                      Billing to
                    </TableHead>
                    <TableHead className="sticky top-0 bg-background">
                      Status
                    </TableHead>
                    <TableHead className="sticky top-0 bg-background">
                      Payment date
                    </TableHead>
                    <TableHead className="sticky top-0 bg-background">
                      Amount
                    </TableHead>
                    <TableHead className="sticky top-0 bg-background">
                      Payment for
                    </TableHead>
                    <TableHead className="sticky top-0 bg-background">
                      Actions
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell>
                        <Checkbox />
                      </TableCell>
                      <TableCell>In #{invoice.id}</TableCell>
                      <TableCell>{invoice.name}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            invoice.status === "Paid"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {invoice.status}
                        </span>
                      </TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.amount}</TableCell>
                      <TableCell>{invoice.material}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="icon">
                            <FileText className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
