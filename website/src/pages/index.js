import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import styles from './index.module.css';


function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
        <div className="container" style={{textAlign: 'center'}}>
            <div className="row">
                <div className="col col--12">
                    <h1 className={styles.headingText}>
                        AWS Generative AI CDK Constructs
                    </h1>
                    <img id="logo" className='navLogo' src="img/image.png" alt="Header image"/>
                </div>
            </div>
            <p className='hero__subtitle'>{siteConfig.tagline}</p>
            <div className={styles.buttons}>
                <Link
                    className="button button--lg button-3d"
                    style={{padding: '0.8rem 1.8rem', fontSize: '1.3rem'}}
                    to="/docs/quick-start">
                    GET STARTED
                </Link>
            </div>
        </div>
    </header>
  );
}

export default function Home() {
    const {siteConfig} = useDocusaurusContext();
    return (
        <Layout
            title={`${siteConfig.title}`}
            description="Everything businesses need to deliver generative AI fueled innovation">
            <HomepageHeader/>
            <main>
                <HomepageFeatures/>
            </main>
        </Layout>
    );
}
