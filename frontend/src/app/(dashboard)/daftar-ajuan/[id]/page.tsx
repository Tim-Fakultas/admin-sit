'use client';

import { useParams } from "next/navigation";
import { SuratDetailPage } from "@/components/surat/SuratDetailPage";

export default function SuratDetailPageRoute() {
  const params = useParams();
  const id = params.id as string;

  return <SuratDetailPage id={id} />;
}