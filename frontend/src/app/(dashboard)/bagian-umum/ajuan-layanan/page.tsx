"use client";
import DaftarAjuanTable from "@/components/bagian-umum/DaftarAjuanTable";

export default function BagianUmumAjuanLayananPage() {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-xl font-bold mb-4">Ajuan Layanan</h2>
      <DaftarAjuanTable status="diajukan" />
    </div>
  );
}
