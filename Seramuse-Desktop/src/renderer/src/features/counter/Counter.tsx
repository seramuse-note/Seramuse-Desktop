import { useAppDispatch, useAppSelector } from '@renderer/app/hooks';
import { Minus, Plus, Type } from 'lucide-react';
import { decrement, increment, incrementByAmount } from './counter.slice';

export const Counter = () => {
    const count = useAppSelector((state) => state.counter.value);
    const dispatch = useAppDispatch();

    return (
        <div className="flex flex-col items-center gap-4">
            <h1 className="text-3xl font-bold">Counter</h1>
            <div className="flex items-center gap-4 rounded-xl bg-white p-6 shadow">
                <Type className="h-5 w-5 text-gray-500" />
                <button
                    type="button"
                    onClick={() => dispatch(decrement())}
                    className="rounded bg-gray-200 p-2"
                >
                    <Minus className="h-5 w-5" />
                </button>
                <span className="text-2xl font-semibold">{count}</span>
                <button
                    type="button"
                    onClick={() => dispatch(increment())}
                    className="rounded bg-gray-200 p-2"
                >
                    <Plus className="h-5 w-5" />
                </button>
                <button
                    type="button"
                    onClick={() => dispatch(incrementByAmount(5))}
                    className="rounded bg-blue-500 p-2 text-white"
                >
                    +5
                </button>
            </div>
        </div>
    );
};