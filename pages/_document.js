import React from 'react';
import Document, {Head, Html, Main, NextScript} from 'next/document';
import createEmotionServer from '@emotion/server/create-instance';
import createCache from '@emotion/cache';


export default class MyDocument extends Document {
    render() {
        return(
            <Html lang="en" ><Head>
                <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap" rel="stylesheet"></link>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
                </Html>
                
            
                

        );
    }

 } 
    MyDocument.getInitialProps = async (ctx) =>{
        const originalRenderPage = ctx.renderPage;
        const cache = createCache({key: 'css'});
        const {extractCriticalToChunks} = createEmotionServer(cache);
        ctx.renderPage = () =>
        originalRenderPage({
            // eslint-disable-next-line react/display-name
            enhanceApp: (App) => (props) => <App emotionCache={cache} {...props} />,
        });
        const InitialProps = await Document.getInitialProps(ctx);
        const emotionStyles = extractCriticalToChunks(InitialProps.html);
        const emotionStylesTags = emotionStyles.styles.map((style) => (
            <style
                data-emotion={`${style.key} ${style.ids.join(' ')}`}
                key={style.key}

                  dangerouslySetInnerHTML={{__html: style.css}}
            />
        ));
        return{
            ...InitialProps,
            styles: [
                ...React.Children.toArray(InitialProps.styles),
                ...emotionStylesTags,
            ],
        };
    };

