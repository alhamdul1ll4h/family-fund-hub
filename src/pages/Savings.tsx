import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { PiggyBank, Plus, ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";
import StatCard from "@/components/StatCard";
import { Badge } from "@/components/ui/badge";

interface SavingTx {
  id: number;
  type: 'deposit' | 'withdrawal';
  amount: number;
  note: string;
  date: string;
}

const initialTransactions: SavingTx[] = [
  { id: 1, type: "deposit", amount: 500, note: "ฝากเงินเดือน", date: "1 มี.ค. 2026" },
  { id: 2, type: "deposit", amount: 1000, note: "โบนัสปีใหม่", date: "5 ม.ค. 2026" },
  { id: 3, type: "withdrawal", amount: 300, note: "ถอนค่าใช้จ่าย", date: "15 ก.พ. 2026" },
  { id: 4, type: "deposit", amount: 2000, note: "ฝากสะสม", date: "1 ก.พ. 2026" },
];

export default function Savings() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [txType, setTxType] = useState<'deposit' | 'withdrawal'>('deposit');
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const balance = transactions.reduce((sum, tx) => sum + (tx.type === 'deposit' ? tx.amount : -tx.amount), 0);
  const totalDeposits = transactions.filter(t => t.type === 'deposit').reduce((s, t) => s + t.amount, 0);

  const handleSubmit = () => {
    const amt = parseInt(amount);
    if (!amt || !note) return;
    setTransactions(prev => [{
      id: Date.now(),
      type: txType,
      amount: amt,
      note,
      date: new Date().toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric' }),
    }, ...prev]);
    setAmount("");
    setNote("");
    setDialogOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">เงินออมส่วนตัว</h1>
          <p className="text-muted-foreground mt-1">บัญชีเงินออมส่วนบุคคล แยกจากกองกลาง</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="w-4 h-4" /> ฝาก/ถอนเงิน</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-heading">ฝาก/ถอนเงินออม</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="flex gap-2">
                <Button variant={txType === 'deposit' ? 'default' : 'outline'} className="flex-1" onClick={() => setTxType('deposit')}>ฝากเงิน</Button>
                <Button variant={txType === 'withdrawal' ? 'default' : 'outline'} className="flex-1" onClick={() => setTxType('withdrawal')}>ถอนเงิน</Button>
              </div>
              <div>
                <Label>จำนวนเงิน (บาท)</Label>
                <Input type="number" placeholder="เช่น 500" value={amount} onChange={e => setAmount(e.target.value)} />
              </div>
              <div>
                <Label>หมายเหตุ</Label>
                <Input placeholder="เช่น ฝากเงินเดือน" value={note} onChange={e => setNote(e.target.value)} />
              </div>
              <Button onClick={handleSubmit} className="w-full">
                {txType === 'deposit' ? 'ฝากเงิน' : 'แจ้งถอนเงิน'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="ยอดคงเหลือ" value={`฿${balance.toLocaleString()}`} icon={PiggyBank} variant="primary" />
        <StatCard title="ฝากสะสมทั้งหมด" value={`฿${totalDeposits.toLocaleString()}`} icon={TrendingUp} variant="default" />
        <StatCard title="จำนวนรายการ" value={`${transactions.length} รายการ`} icon={ArrowUpRight} variant="default" />
      </div>

      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle className="font-heading text-lg">ประวัติการฝาก-ถอน</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {transactions.map(tx => (
            <div key={tx.id} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${tx.type === 'deposit' ? 'bg-success/10' : 'bg-destructive/10'}`}>
                  {tx.type === 'deposit' ? <ArrowUpRight className="w-4 h-4 text-success" /> : <ArrowDownRight className="w-4 h-4 text-destructive" />}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{tx.note}</p>
                  <p className="text-xs text-muted-foreground">{tx.date}</p>
                </div>
              </div>
              <Badge variant="outline" className={tx.type === 'deposit' ? 'bg-success/10 text-success border-success/20' : 'bg-destructive/10 text-destructive border-destructive/20'}>
                {tx.type === 'deposit' ? '+' : '-'}{tx.amount.toLocaleString()} ฿
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
