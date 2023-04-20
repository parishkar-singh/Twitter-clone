import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import Layout from '@/components/Layout'
import React from "react";
import Model from "@/components/Model";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";

export default function App({Component, pageProps}: AppProps) {
    return (
        <>
            {/*<Model actionLabel='Submit' isOpen title='testModel'/>*/}
            {/*<LoginModal/>*/}
            <RegisterModal/>

            <Layout>
                <Component {...pageProps} />
            </Layout>
        </>
    )
}
