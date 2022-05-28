import { Typography } from '@mui/material'
import Head from 'next/head'


export default function Home() {
  return (
    <div>
      <Head>
        <title>Sanity Amazona</title>
        <meta name="description" content="Next and Sanity Ecommerce Web" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

    <Typography component="h1" variants="h1">Sanity Amazona</Typography>
    </div>
  )
}
