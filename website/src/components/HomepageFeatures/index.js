import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';


const FeatureList = [
  {
      title: 'Rapid Deployment',
      description: (
          <div>
              Pre-built constructs allow for quick and efficient setup of generative AI environments, reducing development time.
          </div>
      ),
  },
  {
    title: 'Best Practices',
    description: (
      <div>
          Constructs are based on AWS Well-Architected Framework, ensuring reliable, secure, and efficient infrastructure.
      </div>
    ),
  },
  {
    title: 'Scalable Architectures',
    description: (
      <div>
          Designed for scalability, supporting growth from prototype to production without significant re-architecture.
      </div>
    ),
  },
    {
        title: 'Flexible Integration',
        description: (
            <div>
                Easy integration with existing AWS services and applications, providing a seamless development experience.
            </div>
        ),
    },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--3')}>
      <div className="text--left padding-horiz--md">
        <h2 style={{ fontWeight: 500}}>{title}</h2>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}


