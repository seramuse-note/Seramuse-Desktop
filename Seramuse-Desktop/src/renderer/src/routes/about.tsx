import { About } from '@renderer/features/about/About';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/about')({
    component: About,
});