// components/Header.tsx
'use client';

import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { FaArrowLeft } from 'react-icons/fa';

export function Header() {
    const router = useRouter();
    const pathname = usePathname();

    return (
        <header className="flex items-center justify-between mb-4">
            {pathname !== '/dashboard' && (
                <Button onClick={() => router.back()} className="flex items-center" variant="link">
                    <FaArrowLeft className="mr-2" />
                    Back
                </Button>
            )}
        </header>
    );
}