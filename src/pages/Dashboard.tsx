import { Wallet, PiggyBank, HandCoins, CalendarClock, TrendingUp, ArrowUpRight, ArrowDownRight } from "lucide-react";
import StatCard from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const recentTransactions = [
  { id: 1, name: "สมชาย", type: "deposit", amount: 100, date: "1 มี.ค. 2026", desc: "เงินรายเดือน" },
  { id: 2, name: "สมหญิง", type: "deposit", amount: 100, date: "1 มี.ค. 2026", desc: "เงินรายเดือน" },
  { id: 3, name: "สมศักดิ์", type: "loan", amount: -1000, date: "28 ก.พ. 2026", desc: "ยืมฉุกเฉิน" },
  { id: 4, name: "สมศักดิ์", type: "repayment", amount: 200, date: "1 มี.ค. 2026", desc: "คืนเงินงวด 1" },
];

const upcomingDues = [
  { name: "สมศักดิ์", amount: 200, dueDate: "1 เม.ย. 2026", remaining: 4 },
  { name: "สมหญิง", amount: 150, dueDate: "15 เม.ย. 2026", remaining: 2 },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">แดชบอร์ด</h1>
        <p className="text-muted-foreground mt-1">ภาพรวมกองทุนครอบครัว Syarikat</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="ยอดกองกลาง"
          value="฿12,500"
          subtitle="เพิ่มขึ้น ฿400 เดือนนี้"
          icon={Wallet}
          variant="primary"
        />
        <StatCard
          title="เงินออมส่วนตัว"
          value="฿3,200"
          subtitle="ยอดสะสมรวมของคุณ"
          icon={PiggyBank}
          variant="default"
        />
        <StatCard
          title="หนี้คงค้าง"
          value="฿800"
          subtitle="เหลืออีก 4 งวด"
          icon={HandCoins}
          variant="warning"
        />
        <StatCard
          title="ถึงกำหนดชำระ"
          value="฿200"
          subtitle="ภายใน 1 เม.ย. 2026"
          icon={CalendarClock}
          variant="accent"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <Card className="shadow-card border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-heading text-lg">รายการล่าสุด</CardTitle>
            <TrendingUp className="w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-3">
            {recentTransactions.map(tx => (
              <div key={tx.id} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${tx.amount > 0 ? 'bg-success/10' : 'bg-destructive/10'}`}>
                    {tx.amount > 0 ? <ArrowUpRight className="w-4 h-4 text-success" /> : <ArrowDownRight className="w-4 h-4 text-destructive" />}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{tx.name}</p>
                    <p className="text-xs text-muted-foreground">{tx.desc}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-semibold ${tx.amount > 0 ? 'text-success' : 'text-destructive'}`}>
                    {tx.amount > 0 ? '+' : ''}{tx.amount.toLocaleString()} ฿
                  </p>
                  <p className="text-xs text-muted-foreground">{tx.date}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Upcoming Dues */}
        <Card className="shadow-card border-0">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="font-heading text-lg">กำหนดชำระที่จะถึง</CardTitle>
            <CalendarClock className="w-5 h-5 text-muted-foreground" />
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingDues.map((due, i) => (
              <div key={i} className="rounded-xl bg-secondary/50 p-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium text-foreground">{due.name}</p>
                  <Badge variant="outline" className="text-warning border-warning/30 bg-warning/5">
                    เหลือ {due.remaining} งวด
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-muted-foreground">ครบกำหนด: {due.dueDate}</p>
                  <p className="text-lg font-heading font-bold text-foreground">{due.amount.toLocaleString()} ฿</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
