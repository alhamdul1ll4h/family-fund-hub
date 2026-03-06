import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Users, Shield, User, Plus, Trash2 } from "lucide-react";
import StatCard from "@/components/StatCard";
import { toast } from "@/hooks/use-toast";

interface MemberItem {
  id: number;
  name: string;
  email: string;
  role: string;
  savings: number;
  loans: number;
  status: string;
}

const initialMembers: MemberItem[] = [
  { id: 1, name: "สมชาย", email: "somchai@family.com", role: "admin", savings: 3200, loans: 0, status: "active" },
  { id: 2, name: "สมหญิง", email: "somying@family.com", role: "member", savings: 1500, loans: 500, status: "active" },
  { id: 3, name: "สมศักดิ์", email: "somsak@family.com", role: "member", savings: 800, loans: 800, status: "active" },
  { id: 4, name: "สมใจ", email: "somjai@family.com", role: "member", savings: 2000, loans: 0, status: "active" },
  { id: 5, name: "สมปอง", email: "sompong@family.com", role: "member", savings: 500, loans: 0, status: "active" },
];

export default function Members() {
  const [members, setMembers] = useState(initialMembers);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");

  const handleAddMember = () => {
    if (!newName || !newEmail) {
      toast({ title: "กรุณากรอกข้อมูลให้ครบ", variant: "destructive" });
      return;
    }
    setMembers(prev => [...prev, {
      id: Date.now(),
      name: newName,
      email: newEmail,
      role: "member",
      savings: 0,
      loans: 0,
      status: "active",
    }]);
    setNewName("");
    setNewEmail("");
    setDialogOpen(false);
    toast({ title: "เพิ่มสมาชิกสำเร็จ" });
  };

  const handleRemove = (id: number) => {
    setMembers(prev => prev.filter(m => m.id !== id));
    toast({ title: "ลบสมาชิกแล้ว" });
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground">สมาชิก</h1>
          <p className="text-muted-foreground mt-1">จัดการสมาชิกในครอบครัว Syarikat</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2"><Plus className="w-4 h-4" /> เพิ่มสมาชิก</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="font-heading">เพิ่มสมาชิกใหม่</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div>
                <Label>ชื่อ-นามสกุล</Label>
                <Input placeholder="เช่น สมศรี" value={newName} onChange={e => setNewName(e.target.value)} />
              </div>
              <div>
                <Label>อีเมล</Label>
                <Input type="email" placeholder="somsri@family.com" value={newEmail} onChange={e => setNewEmail(e.target.value)} />
              </div>
              <Button onClick={handleAddMember} className="w-full">เพิ่มสมาชิก</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard title="สมาชิกทั้งหมด" value={`${members.length} คน`} icon={Users} variant="primary" />
        <StatCard title="Admin" value={`${members.filter(m => m.role === 'admin').length} คน`} icon={Shield} variant="default" />
        <StatCard title="สมาชิกทั่วไป" value={`${members.filter(m => m.role === 'member').length} คน`} icon={User} variant="default" />
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
                <th className="text-center py-3 px-4 text-sm font-medium text-muted-foreground">จัดการ</th>
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
                  <td className="py-4 px-4 text-center">
                    {m.role !== 'admin' && (
                      <Button variant="ghost" size="icon" onClick={() => handleRemove(m.id)} className="text-muted-foreground hover:text-destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
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
