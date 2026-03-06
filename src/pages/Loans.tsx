import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { HandCoins, Plus, Clock, CheckCircle2, XCircle, CalendarDays } from "lucide-react";
import StatCard from "@/components/StatCard";

interface LoanItem {
  id: number;
  member: string;
  amount: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  monthlyPayment: number;
  totalMonths: number;
  paidMonths: number;
  date: string;
}

const initialLoans: LoanItem[] = [
  { id: 1, member: "สมศักดิ์", amount: 1000, reason: "ค่ารักษาพยาบาลฉุกเฉิน", status: "approved", monthlyPayment: 200, totalMonths: 5, paidMonths: 1, date: "28 ก.พ. 2026" },
  { id: 2, member: "สมหญิง", amount: 500, reason: "ค่าเทอมบุตร", status: "pending", monthlyPayment: 150, totalMonths: 4, paidMonths: 0, date: "5 มี.ค. 2026" },
  { id: 3, member: "สมใจ", amount: 800, reason: "ซ่อมรถจักรยานยนต์", status: "completed", monthlyPayment: 200, totalMonths: 4, paidMonths: 4, date: "1 ม.ค. 2026" },
];

const statusConfig = {
  pending: { label: "รออนุมัติ", icon: Clock, className: "bg-warning/10 text-warning border-warning/20" },
  approved: { label: "อนุมัติแล้ว", icon: CheckCircle2, className: "bg-success/10 text-success border-success/20" },
  rejected: { label: "ปฏิเสธ", icon: XCircle, className: "bg-destructive/10 text-destructive border-destructive/20" },
  completed: { label: "คืนครบแล้ว", icon: CheckCircle2, className: "bg-primary/10 text-primary border-primary/20" },
};

export default function Loans() {
  const [loans, setLoans] = useState(initialLoans);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newAmount, setNewAmount] = useState("");
  const [newReason, setNewReason] = useState("");
  const [newMonths, setNewMonths] = useState("5");

  const handleApprove = (id: number) => {
    setLoans(prev => prev.map(l => l.id === id ? { ...l, status: 'approved' as const } : l));
  };

  const handleReject = (id: number) => {
    setLoans(prev => prev.map(l => l.id === id ? { ...l, status: 'rejected' as const } : l));
  };

  const handleSubmit = () => {
    const amount = parseInt(newAmount);
    const months = parseInt(newMonths);
    if (!amount || !newReason || !months) return;
    setLoans(prev => [...prev, {
      id: Date.now(),
      member: "สมชาย",
      amount,
      reason: newReason,
      status: 'pending',
      monthlyPayment: Math.ceil(amount / months),
      totalMonths: months,
      paidMonths: 0,
      date: new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' }),
    }]);
    setNewAmount("");
    setNewReason("");
    setNewMonths("5");
    setDialogOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">ยืม-คืนเงิน</h1>
          <p className="text-muted-foreground mt-1">จัดการคำขอยืมเงินฉุกเฉินและติดตามการคืน</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="w-4 h-4" /> ขอยืมเงิน
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-heading">ขอยืมเงินฉุกเฉิน</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <Label>จำนวนเงิน (บาท)</Label>
                <Input type="number" placeholder="เช่น 1000" value={newAmount} onChange={e => setNewAmount(e.target.value)} />
              </div>
              <div>
                <Label>จำนวนงวดที่จะคืน</Label>
                <Input type="number" placeholder="เช่น 5" value={newMonths} onChange={e => setNewMonths(e.target.value)} />
              </div>
              {newAmount && newMonths && parseInt(newMonths) > 0 && (
                <div className="rounded-xl bg-secondary/50 p-3 text-sm text-muted-foreground">
                  คืนเดือนละ <span className="font-semibold text-foreground">{Math.ceil(parseInt(newAmount) / parseInt(newMonths)).toLocaleString()} ฿</span> เป็นเวลา {newMonths} เดือน
                </div>
              )}
              <div>
                <Label>เหตุผลความจำเป็น</Label>
                <Textarea placeholder="อธิบายเหตุผล..." value={newReason} onChange={e => setNewReason(e.target.value)} />
              </div>
              <Button onClick={handleSubmit} className="w-full">ส่งคำขอยืม</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="ยอดยืมทั้งหมด" value="฿2,300" icon={HandCoins} variant="default" />
        <StatCard title="รออนุมัติ" value="1 รายการ" icon={Clock} variant="accent" />
        <StatCard title="คืนครบแล้ว" value="1 รายการ" icon={CheckCircle2} variant="default" />
      </div>

      {/* Loan List */}
      <div className="space-y-4">
        {loans.map(loan => {
          const config = statusConfig[loan.status];
          const progress = loan.totalMonths > 0 ? (loan.paidMonths / loan.totalMonths) * 100 : 0;
          return (
            <Card key={loan.id} className="shadow-card border-0">
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <p className="font-heading font-semibold text-foreground text-lg">{loan.member}</p>
                      <Badge variant="outline" className={config.className}>
                        <config.icon className="w-3 h-3 mr-1" />
                        {config.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">{loan.reason}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1"><CalendarDays className="w-3.5 h-3.5" />{loan.date}</span>
                      <span>งวดละ {loan.monthlyPayment.toLocaleString()} ฿ × {loan.totalMonths} เดือน</span>
                    </div>
                    {loan.status === 'approved' && (
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="text-muted-foreground">ชำระแล้ว {loan.paidMonths}/{loan.totalMonths} งวด</span>
                          <span className="font-medium text-foreground">{Math.round(progress)}%</span>
                        </div>
                        <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-success rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <p className="text-2xl font-heading font-bold text-foreground">{loan.amount.toLocaleString()} ฿</p>
                    {loan.status === 'pending' && (
                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => handleApprove(loan.id)}>อนุมัติ</Button>
                        <Button size="sm" variant="outline" onClick={() => handleReject(loan.id)}>ปฏิเสธ</Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
