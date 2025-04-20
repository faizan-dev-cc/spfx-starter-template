import * as React from 'react';

export default function CodeBox({ children }: any) {
    return <span className="mx-1 px-1 py-px bg-orange-400/30 text-orange-500 font-mono text-xs tracking-tight rounded-md">{children}</span>
}