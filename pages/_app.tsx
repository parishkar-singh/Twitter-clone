import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import Layout from '@/components/Layout'
import React from "react";
import Model from "@/components/Model";

export default function App({Component, pageProps}: AppProps) {
    return (
        <>
            <Model actionLabel='Submit' isOpen title='testModel'/>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    )
}
