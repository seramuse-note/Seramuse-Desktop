import { environment } from '@renderer/shared/lib/environment';
import { Link } from '@tanstack/react-router';
import { BookOpen } from 'lucide-react';

export const Home = () => {
    return (
        <div className="flex flex-col items-center gap-4 text-center">
            <BookOpen className="h-16 w-16 text-blue-600" />
            <h1 className="text-4xl font-bold">
                {environment.mode === 'production' ? 'Knowledge Lib' : 'Knowledge Lib (dev)'}
            </h1>
            <p className="max-w-md text-gray-600">
                Trang chủ của ứng dụng Knowledge Library. Khởi động với TanStack Router + Vite + React +
                TypeScript.
            </p>
            <Link
                to="/counter"
                className="mt-2 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
            >
                Đi tới Counter
            </Link>
        </div>
    );
};