'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useApiSubmit } from '@/hooks/useApi';
import { User } from '@/types';
import { UserProfile as ProfileType } from '@/types/profile';
import apiClient from '@/lib/api';

interface ProfileFormProps {
    user?: User;
    profile?: ProfileType;
    onUpdate: () => void;
}

export function ProfileForm({ user, profile, onUpdate }: ProfileFormProps) {
    const [formData, setFormData] = useState<Partial<ProfileType>>(profile || {});
    const { submit, isLoading, error } = useApiSubmit();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        await submit(async () => {
            const response = await apiClient.put('/profile', formData);
            onUpdate();
        });
    };

    const handleChange = (field: keyof ProfileType, value: string | number) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {/* Data Akademik */}
            <Card>
                <CardHeader>
                    <CardTitle>Data Akademik</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                    <div>
                        <Label htmlFor="semester">Semester Saat Ini</Label>
                        <Input
                            id="semester"
                            value={formData.semester_saat_ini || ''}
                            onChange={(e) => handleChange('semester_saat_ini', e.target.value)}
                            placeholder="Semester 5"
                        />
                    </div>
                    <div>
                        <Label htmlFor="ipk">IPK</Label>
                        <Input
                            id="ipk"
                            type="number"
                            step="0.01"
                            min="0"
                            max="4"
                            value={formData.ipk || ''}
                            onChange={(e) => handleChange('ipk', parseFloat(e.target.value))}
                            placeholder="3.50"
                        />
                    </div>
                    <div>
                        <Label htmlFor="sks">SKS yang Telah Lulus</Label>
                        <Input
                            id="sks"
                            type="number"
                            value={formData.sks_lulus || ''}
                            onChange={(e) => handleChange('sks_lulus', parseInt(e.target.value))}
                            placeholder="120"
                        />
                    </div>
                    <div>
                        <Label htmlFor="status">Status Mahasiswa</Label>
                        <select
                            id="status"
                            value={formData.status_mahasiswa || 'aktif'}
                            onChange={(e) => handleChange('status_mahasiswa', e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="aktif">Aktif</option>
                            <option value="cuti">Cuti</option>
                            <option value="lulus">Lulus</option>
                            <option value="do">Drop Out</option>
                        </select>
                    </div>
                </CardContent>
            </Card>

            {/* Data Pribadi */}
            <Card>
                <CardHeader>
                    <CardTitle>Data Pribadi</CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 md:grid-cols-2">
                    <div>
                        <Label htmlFor="tempat_lahir">Tempat Lahir</Label>
                        <Input
                            id="tempat_lahir"
                            value={formData.tempat_lahir || ''}
                            onChange={(e) => handleChange('tempat_lahir', e.target.value)}
                            placeholder="Jakarta"
                        />
                    </div>
                    <div>
                        <Label htmlFor="jenis_kelamin">Jenis Kelamin</Label>
                        <select
                            id="jenis_kelamin"
                            value={formData.jenis_kelamin || ''}
                            onChange={(e) => handleChange('jenis_kelamin', e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="">Pilih jenis kelamin</option>
                            <option value="L">Laki-laki</option>
                            <option value="P">Perempuan</option>
                        </select>
                    </div>
                    <div>
                        <Label htmlFor="agama">Agama</Label>
                        <select
                            id="agama"
                            value={formData.agama || ''}
                            onChange={(e) => handleChange('agama', e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            <option value="">Pilih agama</option>
                            <option value="Islam">Islam</option>
                            <option value="Kristen">Kristen</option>
                            <option value="Katolik">Katolik</option>
                            <option value="Hindu">Hindu</option>
                            <option value="Buddha">Buddha</option>
                            <option value="Konghucu">Konghucu</option>
                        </select>
                    </div>
                </CardContent>
            </Card>

            {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                    <p className="text-red-800">{error}</p>
                </div>
            )}

            <div className="flex justify-end">
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Menyimpan...' : 'Simpan Profil'}
                </Button>
            </div>
        </form>
    );
}