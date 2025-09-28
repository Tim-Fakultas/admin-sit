// src/components/auth/LoginForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image'; // <-- Impor komponen Image
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from '@/components/ui/checkbox'; // <-- Impor Checkbox
import apiClient from '@/lib/api';

export function LoginForm() {
    const router = useRouter();

    const [nimNip, setNimNip] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const response = await apiClient.post('/login', {
                nim_nip: nimNip,
                password: password,
            });

            localStorage.setItem('auth_token', response.data.access_token);
            localStorage.setItem('user', JSON.stringify(response.data.user));

            router.push('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Terjadi kesalahan saat login.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Card className="w-full max-w-sm border-none shadow-lg">
            <CardHeader className="text-center">
                {/* Ganti '/logo.png' dengan path logo Anda di folder /public */}
                <Image src="/UINdanBLU.png" alt="Logo Fakultas" width={72} height={72} className="mx-auto" />
                <h1 className="text-2xl font-bold mt-4">Selamat Datang, Silakan Masuk!</h1>
                <p className="text-sm text-muted-foreground">
                    Login dengan akun SIMAK anda
                </p>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="grid gap-4">
                    <div className="grid gap-2">
                        {/* Kita ubah labelnya sesuai desain baru */}
                        <Label htmlFor="nim_nip">Nama Pengguna</Label>
                        <Input
                            id="nim_nip"
                            type="text"
                            placeholder="Masukkan nama pengguna"
                            required
                            value={nimNip}
                            onChange={(e) => setNimNip(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Kata Sandi</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Masukkan kata sandi"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="remember-me" />
                            <Label htmlFor="remember-me" className="text-sm font-normal">Ingat saya</Label>
                        </div>
                        <a href="#" className="text-sm text-blue-600 hover:underline">
                            Lupa kata sandi?
                        </a>
                    </div>
                    {error && <p className="text-sm text-red-500 text-center">{error}</p>}
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? 'Loading...' : 'Masuk'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}