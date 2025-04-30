// pages/admin/index.tsx
import dynamic from 'next/dynamic'
import 'netlify-cms-app/dist/netlify-cms.css'
import '../../public/admin/cms'

const AdminPage = dynamic(() => import('netlify-cms-app').then((m) => {
    const CMS = m.default || m
    CMS.init()
    return () => <div id="nc-root" />
}), {
    ssr: false,
})

export default function Admin() {
    return <AdminPage />
}