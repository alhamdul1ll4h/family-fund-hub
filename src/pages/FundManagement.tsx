import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, X, Wallet, Save } from "lucide-react";
import StatCard from "@/components/StatCard";
import { toast } from "@/hooks/use-toast";

const members = ["สมชาย", "สมหญิง", "สมศักดิ์", "สมใจ", "สมปอง"];
const months = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย."];

const initialPayments: Record<string, Record<string, boolean>> = {
  "สมชาย": { "ม.ค.": true, "ก.พ.": true, "มี.ค.": true },
  "สมหญิง": { "ม.ค.": true, "ก.พ.": true, "มี.ค.": true },
  "สมศักดิ์": { "ม.ค.": true, "ก.พ.": true, "มี.ค.": false },
  "สมใจ": { "ม.ค.": true, "ก.พ.": false, "มี.ค.": false },
  "สมปอง": { "ม.ค.": true, "ก.พ.": true, "มี.ค.": true },
};

const history = [
  { date: "1 มี.ค. 2026", desc: "สมชาย นำส่งเงินรายเดือน", amount: 100, type: "in" },
  { date: "1 มี.ค. 2026", desc: "สมหญิง นำส่งเงินรายเดือน", amount: 100, type: "in" },
  { date: "28 ก.พ. 2026", desc: "อนุมัติเงินยืม สมศักดิ์", amount: -1000, type: "out" },
  { date: "1 มี.ค. 2026", desc: "สมศักดิ์ คืนเงินงวด 1", amount: 200, type: "in" },
  { date: "1 มี.ค. 2026", desc: "สมปอง นำส่งเงินรายเดือน", amount: 100, type: "in" },
];

export default function FundManagement() {
  const [payments, setPayments] = useState(initialPayments);
  const [savedPayments, setSavedPayments] = useState(initialPayments);
  const [hasChanges, setHasChanges] = useState(false);

  const togglePayment = (member: string, month: string) => {
    setPayments(prev => {
      const updated = {
        ...prev,
        [member]: { ...prev[member], [month]: !prev[member]?.[month] },
      };
      setHasChanges(JSON.stringify(updated) !== JSON.stringify(savedPayments));
      return updated;
    });
  };

  const handleSave = () => {
    setSavedPayments({ ...payments });
    setHasChanges(false);
    toast({ title: "บันทึกสำเร็จ", description: "บันทึกข้อมูลการนำส่งเงินเรียบร้อยแล้ว" });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">กองทุนส่วนรวม</h1>
        <p className="text-muted-foreground mt-1">จัดการเงินกองกลางและบันทึกการนำส่ง</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="ยอดกองกลางรวม" value="฿12,500" icon={Wallet} variant="primary" />
        <StatCard title="นำส่งแล้วเดือนนี้" value="3/5 คน" icon={Check} variant="default" />
        <StatCard title="ค้างชำระ" value="2 คน" icon={X} variant="warning" />
      </div>

      {/* Monthly checklist */}
      <Card className="shadow-card border-0">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="font-heading text-lg">ตารางนำส่งเงินรายเดือน (100 ฿/คน)</CardTitle>
          <Button onClick={handleSave} disabled={!hasChanges} className="gap-2">
            <Save className="w-4 h-4" /> บันทึก
          </Button>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[500px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">สมาชิก</th>
                {months.map(m => (
                  <th key={m} className="text-center py-3 px-3 text-sm font-medium text-muted-foreground">{m}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {members.map(member => (
                <tr key={member} className="border-b border-border/50 last:border-0">
                  <td className="py-3 px-4 text-sm font-medium text-foreground">{member}</td>
                  {months.map(month => {
                    const paid = payments[member]?.[month];
                    return (
                      <td key={month} className="text-center py-3 px-3">
                        <button
                          onClick={() => togglePayment(member, month)}
                          className={`w-9 h-9 rounded-lg flex items-center justify-center mx-auto transition-all duration-200 ${
                            paid
                              ? 'bg-success text-success-foreground shadow-sm'
                              : 'bg-muted text-muted-foreground hover:bg-muted/80'
                          }`}
                        >
                          {paid ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

      {/* Transaction history */}
      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle className="font-heading text-lg">ประวัติการเคลื่อนไหว</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {history.map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-border/50 last:border-0">
              <div>
                <p className="text-sm font-medium text-foreground">{item.desc}</p>
                <p className="text-xs text-muted-foreground">{item.date}</p>
              </div>
              <Badge variant={item.type === 'in' ? 'default' : 'destructive'} className={item.type === 'in' ? 'bg-success/10 text-success border-0' : ''}>
                {item.type === 'in' ? '+' : ''}{item.amount.toLocaleString()} ฿
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
