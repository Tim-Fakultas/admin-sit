// src/app/login/page.tsx
import { LoginForm } from "@/components/auth/LoginForm";

export default function LoginPage() {
    return (
        // Kita tambahkan background warna slate dan menengahkan kontennya
        <div className="flex items-center justify-center min-h-screen bg-slate-100 dark:bg-slate-900">
            <LoginForm />
        </div>
    );
}