"use client"

import { SWRConfig } from 'swr';

const cacheProvider = () => new Map();


export default function SWRProvider({ children }: any) {
    return (
        <SWRConfig value={{
            provider: cacheProvider,
            fetcher: async function fetcher(resource, init) {
                const response = await fetch(resource, init);
                const data = await response.json();
                return data;
            }
        }}>
            {children}
        </SWRConfig>
    );
}