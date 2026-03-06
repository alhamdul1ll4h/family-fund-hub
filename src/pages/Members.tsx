import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Shield, User } from "lucide-react";
import StatCard from "@/components/StatCard";

const members = [
  { id: 1, name: "สมชาย", email: "somchai@family.com", role: "admin", savings: 3200, loans: 0, status: "active" },
  { id: 2, name: "สมหญิง", email: "somying@family.com", role: "member", savings: 1500, loans: 500, status: "active" },
  { id: 3, name: "สมศักดิ์", email: "somsak@family.com", role: "member", savings: 800, loans: 800, status: "active" },
  { id: 4, name: "สมใจ", email: "somjai@family.com", role: "member", savings: 2000, loans: 0, status: "active" },
  { id: 5, name: "สมปอง", email: "sompong@family.com", role: "member", savings: 500, loans: 0, status: "active" },
];

export default function Members() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">สมาชิก</h1>
        <p className="text-muted-foreground mt-1">จัดการสมาชิกในครอบครัว Syarikat</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="สมาชิกทั้งหมด" value="5 คน" icon={Users} variant="primary" />
        <StatCard title="Admin" value="1 คน" icon={Shield} variant="default" />
        <StatCard title="สมาชิกทั่วไป" value="4 คน" icon={User} variant="default" />
      </div>

      <Card className="shadow-card border-0">
        <CardHeader>
          <CardTitle className="font-heading text-lg">รายชื่อสมาชิก</CardTitle>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">ชื่อ</th>
                <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">อีเมล</th>
                <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">สิทธิ์</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">เงินออม</th>
                <th className="text-right py-3 px-4 text-sm font-medium text-muted-foreground">หนี้คงค้าง</th>
              </tr>
            </thead>
            <tbody>
              {members.map(m => (
                <tr key={m.id} className="border-b border-border/50 last:border-0 hover:bg-muted/30 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-sm font-bold text-primary-foreground">
                        {m.name.charAt(0)}
                      </div>
                      <span className="font-medium text-foreground">{m.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-muted-foreground">{m.email}</td>
                  <td className="py-4 px-4 text-center">
                    <Badge variant="outline" className={m.role === 'admin' ? 'bg-accent/10 text-accent border-accent/30' : 'bg-secondary text-secondary-foreground'}>
                      {m.role === 'admin' ? 'Admin' : 'Member'}
                    </Badge>
                  </td>
                  <td className="py-4 px-4 text-right text-sm font-medium text-foreground">{m.savings.toLocaleString()} ฿</td>
                  <td className="py-4 px-4 text-right text-sm font-medium">
                    {m.loans > 0 ? (
                      <span className="text-destructive">{m.loans.toLocaleString()} ฿</span>
                    ) : (
                      <span className="text-success">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );
}
