import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Wallet, Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login — will be replaced with real auth
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md animate-fade-in">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-2xl gradient-primary mx-auto flex items-center justify-center mb-4 shadow-lg">
            <Wallet className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-heading font-bold text-foreground">Syarikat</h1>
          <p className="text-muted-foreground mt-1">Family Fund Management</p>
        </div>

        <Card className="shadow-card border-0">
          <CardContent className="p-6 sm:p-8">
            {/* Toggle */}
            <div className="flex rounded-xl bg-secondary p-1 mb-6">
              <button
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${isLogin ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'}`}
                onClick={() => setIsLogin(true)}
              >
                เข้าสู่ระบบ
              </button>
              <button
                className={`flex-1 py-2.5 text-sm font-medium rounded-lg transition-all ${!isLogin ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground'}`}
                onClick={() => setIsLogin(false)}
              >
                สมัครสมาชิก
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div>
                  <Label className="text-foreground">ชื่อ-นามสกุล</Label>
                  <Input placeholder="เช่น สมชาย รักครอบครัว" value={name} onChange={e => setName(e.target.value)} className="mt-1.5" />
                </div>
              )}
              <div>
                <Label className="text-foreground">อีเมล</Label>
                <div className="relative mt-1.5">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input type="email" placeholder="you@example.com" value={email} onChange={e => setEmail(e.target.value)} className="pl-10" />
                </div>
              </div>
              <div>
                <Label className="text-foreground">รหัสผ่าน</Label>
                <div className="relative mt-1.5">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <Button type="submit" className="w-full h-11 text-base mt-2">
                {isLogin ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
