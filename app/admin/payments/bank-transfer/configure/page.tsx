"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Building, Check, User, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

const availableBanks = [
  { id: "gtbank", name: "GTBank", code: "058", logo: "/gtbank-logo-abstract.png" },
  { id: "firstbank", name: "First Bank", code: "011", logo: "/abstract-geometric-logo.png" },
  { id: "access", name: "Access Bank", code: "044", logo: "/abstract-geometric-logo.png" },
  { id: "zenith", name: "Zenith Bank", code: "057", logo: "/abstract-geometric-logo.png" },
  { id: "uba", name: "UBA", code: "033", logo: "/abstract-geometric-logo.png" },
  { id: "wema", name: "Wema Bank", code: "035", logo: "/wema-bank-logo-abstract.png" },
  { id: "sterling", name: "Sterling Bank", code: "232", logo: "/sterling-bank-abstract.png" },
  { id: "fidelity", name: "Fidelity Bank", code: "070", logo: "/stylized-financial-institution-logo.png" },
  { id: "union", name: "Union Bank", code: "032", logo: "/abstract-geometric-logo.png" },
  { id: "fcmb", name: "FCMB", code: "214", logo: "/abstract-geometric-logo.png" },
  { id: "polaris", name: "Polaris Bank", code: "076", logo: "/abstract-geometric-logo.png" },
  { id: "stanbic", name: "Stanbic IBTC", code: "221", logo: "/abstract-geometric-logo.png" },
]

interface BankAccount {
  id: string
  bankId: string
  accountNumber: string
  accountName: string
  isVerified: boolean
}

export default function BankTransferConfigurePage() {
  const router = useRouter()
  const [accounts, setAccounts] = useState<BankAccount[]>([
    {
      id: "1",
      bankId: "gtbank",
      accountNumber: "0123456789",
      accountName: "Business Main Account",
      isVerified: true,
    },
  ])
  const [isEnabled, setIsEnabled] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newAccount, setNewAccount] = useState({
    bankId: "",
    accountNumber: "",
    accountName: "",
    isVerifying: false,
  })

  const handleAddAccount = () => {
    setShowAddForm(true)
  }

  const handleAccountNumberChange = async (value: string) => {
    setNewAccount((prev) => ({ ...prev, accountNumber: value, accountName: "", isVerifying: false }))

    if (value.length === 10 && newAccount.bankId) {
      setNewAccount((prev) => ({ ...prev, isVerifying: true }))
      // Simulate API call to verify account
      setTimeout(() => {
        setNewAccount((prev) => ({
          ...prev,
          accountName: "Verified Business Account",
          isVerifying: false,
        }))
      }, 1500)
    }
  }

  const handleSaveAccount = () => {
    if (newAccount.accountName && newAccount.accountNumber && newAccount.bankId) {
      const account: BankAccount = {
        id: Date.now().toString(),
        bankId: newAccount.bankId,
        accountNumber: newAccount.accountNumber,
        accountName: newAccount.accountName,
        isVerified: true,
      }
      setAccounts((prev) => [...prev, account])
      setNewAccount({ bankId: "", accountNumber: "", accountName: "", isVerifying: false })
      setShowAddForm(false)
    }
  }

  const handleRemoveAccount = (accountId: string) => {
    setAccounts((prev) => prev.filter((acc) => acc.id !== accountId))
  }

  const handleSave = () => {
    router.push("/admin/payments")
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Configure Bank Transfer</h2>
          <p className="text-muted-foreground">Set up your bank accounts to receive transfer payments</p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Current Accounts */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Bank Accounts
                  </CardTitle>
                  <CardDescription>Manage accounts where you want to receive transfer payments</CardDescription>
                </div>
                <Button onClick={handleAddAccount} size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Account
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {accounts.map((account) => {
                  const bank = availableBanks.find((b) => b.id === account.bankId)
                  return (
                    <div key={account.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <img src={bank?.logo || "/placeholder.svg"} alt={bank?.name} className="w-10 h-10 rounded" />
                        <div>
                          <div className="font-medium">{account.accountName}</div>
                          <div className="text-sm text-muted-foreground">
                            {bank?.name} • {account.accountNumber}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {account.isVerified && (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            <Check className="h-3 w-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveAccount(account.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )
                })}

                {accounts.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Building className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No bank accounts configured yet</p>
                    <p className="text-sm">Add your first account to start receiving transfer payments</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Add New Account Form */}
          {showAddForm && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Add New Bank Account
                </CardTitle>
                <CardDescription>Enter your bank account details to add a new payment destination</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Select Bank</Label>
                  <div className="grid gap-2 md:grid-cols-2 max-h-48 overflow-y-auto">
                    {availableBanks.map((bank) => (
                      <div
                        key={bank.id}
                        className={`border rounded-lg p-3 cursor-pointer transition-all ${
                          newAccount.bankId === bank.id ? "border-[#8B5CF6] bg-purple-50" : "hover:border-gray-300"
                        }`}
                        onClick={() => setNewAccount((prev) => ({ ...prev, bankId: bank.id }))}
                      >
                        <div className="flex items-center gap-2">
                          <img src={bank.logo || "/placeholder.svg"} alt={bank.name} className="w-6 h-6 rounded" />
                          <div>
                            <div className="text-sm font-medium">{bank.name}</div>
                            <div className="text-xs text-muted-foreground">{bank.code}</div>
                          </div>
                          {newAccount.bankId === bank.id && <Check className="h-4 w-4 text-[#8B5CF6] ml-auto" />}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {newAccount.bankId && (
                  <div className="space-y-2">
                    <Label htmlFor="newAccountNumber">Account Number</Label>
                    <Input
                      id="newAccountNumber"
                      placeholder="Enter your 10-digit account number"
                      value={newAccount.accountNumber}
                      onChange={(e) => handleAccountNumberChange(e.target.value)}
                      maxLength={10}
                      disabled={newAccount.isVerifying}
                    />
                    {newAccount.isVerifying && <p className="text-sm text-blue-600">Verifying account details...</p>}
                  </div>
                )}

                {newAccount.accountName && (
                  <div className="space-y-2">
                    <Label>Account Name</Label>
                    <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <User className="h-4 w-4 text-green-600" />
                      <span className="font-medium text-green-800">{newAccount.accountName}</span>
                      <Check className="h-4 w-4 text-green-600 ml-auto" />
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowAddForm(false)
                      setNewAccount({ bankId: "", accountNumber: "", accountName: "", isVerifying: false })
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveAccount}
                    disabled={!newAccount.accountName}
                    className="bg-[#8B5CF6] hover:bg-[#7C3AED]"
                  >
                    Add Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Transfer Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Transfer Settings</CardTitle>
              <CardDescription>Configure how bank transfers work for your customers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Enable Bank Transfer Payments</Label>
                  <p className="text-sm text-muted-foreground">Allow customers to pay via bank transfer</p>
                </div>
                <Switch checked={isEnabled} onCheckedChange={setIsEnabled} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Auto-confirm Transfers</Label>
                  <p className="text-sm text-muted-foreground">Automatically confirm payments when received</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium">Send Transfer Instructions</Label>
                  <p className="text-sm text-muted-foreground">Email transfer details to customers</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="h-5 w-5" />
                Preview
              </CardTitle>
              <CardDescription>How customers will see the transfer payment option</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-gray-50">
                  <div className="text-center mb-4">
                    <Building className="h-8 w-8 mx-auto text-indigo-600 mb-2" />
                    <p className="text-sm font-medium">Bank Transfer Payment</p>
                    <p className="text-xs text-muted-foreground">₦2,500.00</p>
                  </div>

                  <div className="space-y-2 text-xs">
                    <p className="font-medium">Transfer to any of these accounts:</p>
                    {accounts.slice(0, 2).map((account) => {
                      const bank = availableBanks.find((b) => b.id === account.bankId)
                      return (
                        <div key={account.id} className="p-2 bg-white rounded border">
                          <div className="flex items-center gap-2">
                            <img src={bank?.logo || "/placeholder.svg"} alt={bank?.name} className="w-4 h-4 rounded" />
                            <span className="font-medium">{bank?.name}</span>
                          </div>
                          <p className="text-muted-foreground">{account.accountNumber}</p>
                          <p className="text-muted-foreground">{account.accountName}</p>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Available Accounts:</p>
                  <div className="flex flex-wrap gap-1">
                    {accounts.map((account) => {
                      const bank = availableBanks.find((b) => b.id === account.bankId)
                      return (
                        <Badge key={account.id} variant="secondary" className="text-xs">
                          {bank?.name}
                        </Badge>
                      )
                    })}
                  </div>
                </div>

                <div className="text-xs text-muted-foreground space-y-1">
                  <p>
                    • {accounts.length} account{accounts.length !== 1 ? "s" : ""} configured
                  </p>
                  <p>• Auto-confirmation enabled</p>
                  <p>• Email instructions sent</p>
                  <p>• {isEnabled ? "Currently enabled" : "Currently disabled"}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {accounts.length > 0 && (
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-1 bg-green-100 rounded-full">
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-green-900 mb-1">Ready to Accept Transfers!</h4>
                    <p className="text-sm text-green-800">
                      Your bank transfer payment system is configured with {accounts.length} verified account
                      {accounts.length !== 1 ? "s" : ""}.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-4 pt-6 border-t">
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
        <Button className="bg-[#8B5CF6] hover:bg-[#7C3AED]" onClick={handleSave} disabled={accounts.length === 0}>
          Save Configuration
        </Button>
      </div>
    </div>
  )
}
