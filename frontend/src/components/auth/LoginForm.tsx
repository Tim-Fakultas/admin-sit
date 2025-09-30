'use client';

import { useState } from 'react';
import { useAuthContext } from '@/contexts/AuthContext';
import { useApiSubmit } from '@/hooks/useApi';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from '@/components/ui/checkbox';

export function LoginForm() {
    // Mengambil fungsi login dari context global
    const { login } = useAuthContext();
    const { submit, isLoading, error } = useApiSubmit();

    // State untuk menyimpan nilai input
    const [nimNip, setNimNip] = useState('');
    const [password, setPassword] = useState('');

    // Fungsi yang dijalankan saat tombol login ditekan
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        await submit(async () => {
            // Memanggil fungsi login dari AuthContext
            await login(nimNip, password);
        });
    };

    return (
        <Card className="w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-2xl bg-white">
            <div className="text-center mb-8">
                <Image
                    src="/UINdanBLU.png" // Pastikan logo ini ada di folder /public
                    alt="Logo SIMAK"
                    width={80}
                    height={80}
                    className="mx-auto"
                />
                <h1 className="text-3xl font-bold mt-4 text-gray-900">Selamat Datang, Silakan Masuk!</h1>
                <p className="text-gray-500 mt-2">Login dengan akun SIMAK anda</p>
            </div>

            <CardContent className="p-0">
                <form onSubmit={handleSubmit} className="grid gap-6">
                    <div className="grid gap-2">
                        <Label htmlFor="nim_nip" className="text-gray-700">Nama Pengguna</Label>
                        <Input
                            id="nim_nip"
                            type="text"
                            placeholder="Masukkan nama pengguna"
                            required
                            value={nimNip}
                            onChange={(e) => setNimNip(e.target.value)}
                            className="h-12"
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password" className="text-gray-700">Kata Sandi</Label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Masukkan kata sandi"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="h-12"
                        />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-2">
                            <Checkbox id="remember-me" />
                            <Label htmlFor="remember-me" className="font-normal text-gray-600">Ingat saya</Label>
                        </div>
                        <Link href="#" className="font-medium text-primary hover:underline">
                            Lupa kata sandi?
                        </Link>
                    </div>
                    {error && (
                        <div className="p-3 text-sm text-red-800 bg-red-100 border border-red-200 rounded-md text-center">
                            {error}
                        </div>
                    )}
                    <Button type="submit" className="w-full h-12 text-md" disabled={isLoading}>
                        {isLoading ? 'Loading...' : 'Masuk'}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}